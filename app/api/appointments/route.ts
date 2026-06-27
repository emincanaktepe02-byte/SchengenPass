import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// ── KV + rate limit setup ─────────────────────────────────────────────────────
const KV_KEY        = "sp:community_apts";
const REPORT_PREFIX = "sp:reports:";
const REPORT_THRESHOLD = 3;
const EXPIRY_MS     = 10 * 24 * 60 * 60 * 1000;  // 10 gün
const JSON_FILE_PATH = path.join(process.cwd(), "content/appointments.json");

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

// ── Redis veya JSON fallback'ten oku ─────────────────────────────────────────

async function getAppointments(): Promise<CommunityAppointment[]> {
  const redis  = getRedis();
  const cutoff = Date.now() - EXPIRY_MS;

  if (redis) {
    console.log("[GET] Redis'ten okunuyor...");
    await redis.zremrangebyscore(KV_KEY, 0, cutoff);
    const raw = (await redis.zrange(KV_KEY, 0, -1, { rev: true })) as string[];
    const list = raw
      .map(r => { try { return JSON.parse(r) as CommunityAppointment; } catch { return null; } })
      .filter((x): x is CommunityAppointment => x !== null)
      .slice(0, 15);
    console.log(`[GET] Redis: ${list.length} kayıt döndürüldü.`);
    return list;
  }

  // Redis yoksa JSON dosyasından oku (lokal dev)
  console.log("[GET] Redis yok, JSON dosyasından okunuyor:", JSON_FILE_PATH);
  try {
    const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
    let list   = JSON.parse(data) as CommunityAppointment[];
    list = list.filter(item => new Date(item.submittedAt).getTime() > cutoff);
    list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    return list.slice(0, 15);
  } catch (err) {
    console.error("[GET] JSON okuma hatası:", err);
    return [];
  }
}

function getRatelimit(redis: Redis) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix:  "sp:rl",
  });
}

// ── Cloudflare Turnstile doğrulama ────────────────────────────────────────────

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[Turnstile] TURNSTILE_SECRET_KEY tanımlı değil — doğrulama atlandı.");
    return true;
  }
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const res  = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    console.log("[Turnstile] Sonuç:", data.success, "| Hatalar:", data["error-codes"] ?? []);
    return data.success === true;
  } catch (err) {
    console.error("[Turnstile] Ağ hatası:", err);
    return false;
  }
}

// ── GET ───────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  try {
    const appointments = await getAppointments();
    return NextResponse.json({ appointments });
  } catch (err) {
    console.error("[GET] Beklenmedik hata:", err);
    return NextResponse.json({ appointments: [] });
  }
}

// ── POST ──────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const redis = getRedis();
  console.log("[POST] İstek alındı. Redis bağlı:", !!redis);

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
    console.log("[POST] Body parse edildi:", { countryCode: body.countryCode, country: body.country, cities: body.cities?.length, dates: body.dates?.length });
  } catch (err) {
    console.error("[POST] Body parse hatası:", err);
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { countryCode, flag, country, center, cities, dates, turnstileToken } = body;

  // ── Yapısal doğrulama ────────────────────────────────────────────────────
  if (!VALID_COUNTRY_CODES.has(countryCode)) {
    console.warn("[POST] Geçersiz ülke kodu:", countryCode);
    return NextResponse.json({ error: "invalid_country" }, { status: 400 });
  }
  if (!Array.isArray(cities) || cities.length === 0 || cities.length > 10) {
    console.warn("[POST] Geçersiz şehirler:", cities);
    return NextResponse.json({ error: "invalid_cities" }, { status: 400 });
  }
  if (!Array.isArray(dates) || dates.length === 0 || dates.length > 31) {
    console.warn("[POST] Geçersiz tarihler:", dates);
    return NextResponse.json({ error: "invalid_dates" }, { status: 400 });
  }
  const today = new Date().toISOString().slice(0, 10);
  for (const d of dates) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || d < today) {
      console.warn("[POST] Geçersiz tarih değeri:", d, "| Bugün:", today);
      return NextResponse.json({ error: "invalid_date_value" }, { status: 400 });
    }
  }
  if (typeof country !== "string" || country.length > 60) {
    console.warn("[POST] Geçersiz ülke adı:", country);
    return NextResponse.json({ error: "invalid_country_name" }, { status: 400 });
  }

  // ── IP ───────────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";
  console.log("[POST] İstek IP:", ip);

  // ── Turnstile ────────────────────────────────────────────────────────────
  if (!turnstileToken) {
    console.warn("[POST] Turnstile token eksik.");
    return NextResponse.json({ error: "captcha_missing" }, { status: 400 });
  }
  console.log("[POST] Turnstile doğrulanıyor...");
  const captchaOk = await verifyTurnstile(turnstileToken, ip);
  if (!captchaOk) {
    console.warn("[POST] Turnstile doğrulama başarısız.");
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }
  console.log("[POST] Turnstile doğrulama başarılı.");

  // ── Hız sınırı ───────────────────────────────────────────────────────────
  if (redis) {
    const ratelimit = getRatelimit(redis);
    const { success: allowed } = await ratelimit.limit(ip);
    if (!allowed) {
      console.warn("[POST] Rate limit aşıldı:", ip);
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
  }

  // ── Kayıt oluştur ─────────────────────────────────────────────────────────
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

  // ── Redis'e yaz ───────────────────────────────────────────────────────────
  if (redis) {
    try {
      console.log("[POST] Redis'e yazılıyor:", apt.id);
      await redis.zadd(KV_KEY, { score: now, member: JSON.stringify(apt) });
      await redis.zremrangebyrank(KV_KEY, 0, -16); // max 15 kayıt
      console.log("[POST] Redis yazma başarılı. ID:", apt.id);
    } catch (err) {
      console.error("[POST] Redis yazma hatası:", err);
      return NextResponse.json({ error: "storage_failed" }, { status: 500 });
    }
  } else {
    // ── JSON fallback'e yaz (lokal dev) ──────────────────────────────────
    console.log("[POST] Redis yok, JSON dosyasına yazılıyor:", JSON_FILE_PATH);
    try {
      let list: CommunityAppointment[] = [];
      try {
        const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
        list = JSON.parse(data) as CommunityAppointment[];
      } catch {
        // Dosya henüz yok — boş liste ile devam et
        console.log("[POST] JSON dosyası bulunamadı, yeni oluşturulacak.");
      }
      list.unshift(apt);
      list = list.slice(0, 15);
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
      console.log("[POST] JSON yazma başarılı. Toplam kayıt:", list.length);
    } catch (err) {
      console.error("[POST] JSON yazma hatası:", err);
      return NextResponse.json({ error: "write_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, appointment: apt }, { status: 201 });
}

