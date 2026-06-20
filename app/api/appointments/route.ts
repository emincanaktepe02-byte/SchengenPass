import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const dynamic = "force-dynamic";

// ── KV + rate limit setup ─────────────────────────────────────────────────────
// Gerekli env değerleri:
//   KV_REST_API_URL   → Upstash Redis REST URL
//   KV_REST_API_TOKEN → Upstash Redis REST token
//   TURNSTILE_SECRET_KEY → Cloudflare Turnstile gizli anahtar
//
// Yoksa GET boş liste, POST 503 döner — build kesinlikle kırılmaz.

const KV_KEY   = "sp:community_apts";         // sorted set; score = epoch ms
const REPORT_PREFIX = "sp:reports:";           // string counter per appointment id
const REPORT_THRESHOLD = 3;                    // bu kadar bildirimde gizle/sil
const EXPIRY_MS = 14 * 24 * 60 * 60 * 1000;   // 14 gün sonra otomatik temizle

const VALID_COUNTRY_CODES = new Set([
  "DE","AT","BE","CZ","DK","EE","FI","FR","NL","IS",
  "ES","SE","CH","IT","LI","LT","LV","LU","HU","MT",
  "NO","PL","PT","SK","SI","GR",
]);

function getRedis() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  return new Redis({
    url:   process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

function getRatelimit(redis: Redis) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"), // saatte 5 paylaşım per IP
    prefix:  "sp:rl",
  });
}

// ── Turnstile doğrulama ───────────────────────────────────────────────────────

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // dev modda geçilsin (secret yoksa)

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

// ── GET — listeyi döndür ──────────────────────────────────────────────────────

export async function GET() {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ appointments: [] });

  try {
    const cutoff = Date.now() - EXPIRY_MS;

    // 14 günden eski kayıtları temizle
    await redis.zremrangebyscore(KV_KEY, 0, cutoff);

    // Kalanları yeniden eskiye sırala (son 50)
    const raw = (await redis.zrange(KV_KEY, 0, -1, { rev: true })) as string[];

    const appointments = raw
      .map(r => {
        try { return JSON.parse(r); } catch { return null; }
      })
      .filter(Boolean)
      .slice(0, 50);

    return NextResponse.json({ appointments });
  } catch {
    return NextResponse.json({ appointments: [] });
  }
}

// ── POST — yeni paylaşım ekle ─────────────────────────────────────────────────

export interface CommunityAppointment {
  id:          string;
  flag:        string;
  country:     string;
  countryCode: string;
  center:      string;
  cities:      string[];
  dates:       string[];
  submittedAt: string;
}

export async function POST(req: NextRequest) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "kv_unavailable" }, { status: 503 });
  }

  let body: {
    countryCode: string;
    flag: string;
    country: string;
    center: string;
    cities: string[];
    dates: string[];
    turnstileToken: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { countryCode, flag, country, center, cities, dates, turnstileToken } = body;

  // ── Yapısal doğrulama ────────────────────────────────────────────────────
  if (!VALID_COUNTRY_CODES.has(countryCode)) {
    return NextResponse.json({ error: "invalid_country" }, { status: 400 });
  }
  if (!Array.isArray(cities) || cities.length === 0 || cities.length > 10) {
    return NextResponse.json({ error: "invalid_cities" }, { status: 400 });
  }
  if (!Array.isArray(dates) || dates.length === 0 || dates.length > 31) {
    return NextResponse.json({ error: "invalid_dates" }, { status: 400 });
  }
  const today = new Date().toISOString().slice(0, 10);
  for (const d of dates) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < today) {
      return NextResponse.json({ error: "invalid_date_value" }, { status: 400 });
    }
  }
  // Serbest metin girişi yok — string uzunlukları sınırla
  if (typeof country !== "string" || country.length > 60) {
    return NextResponse.json({ error: "invalid_country_name" }, { status: 400 });
  }

  // ── IP ───────────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  // ── Turnstile ────────────────────────────────────────────────────────────
  if (!turnstileToken) {
    return NextResponse.json({ error: "captcha_missing" }, { status: 400 });
  }
  const captchaOk = await verifyTurnstile(turnstileToken, ip);
  if (!captchaOk) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }

  // ── Hız sınırı ───────────────────────────────────────────────────────────
  const ratelimit = getRatelimit(redis);
  const { success: allowed } = await ratelimit.limit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  // ── KV'ye yaz ────────────────────────────────────────────────────────────
  const now = Date.now();
  const apt: CommunityAppointment = {
    id:          `${now}-${Math.random().toString(36).slice(2, 7)}`,
    flag,
    country,
    countryCode,
    center,
    cities:      cities.slice(0, 10).map(c => String(c).slice(0, 60)),
    dates:       [...dates].sort(),
    submittedAt: new Date(now).toISOString(),
  };

  await redis.zadd(KV_KEY, { score: now, member: JSON.stringify(apt) });

  return NextResponse.json({ ok: true, appointment: apt }, { status: 201 });
}
