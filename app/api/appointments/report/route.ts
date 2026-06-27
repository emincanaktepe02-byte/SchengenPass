import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { createHash } from "crypto";

export const dynamic = "force-dynamic";

const KV_KEY          = "sp:community_apts";
const REPORT_PREFIX   = "sp:reports:";
const REPORTER_PREFIX = "sp:reported:"; // IP başına tekrar engeli
const REPORT_THRESHOLD = 5;             // 5 bağımsız rapor gerekir
const REPORT_TTL      = 10 * 24 * 60 * 60; // 10 gün (saniye)

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
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix:  "sp:rl:report",
  });
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "kv_unavailable" }, { status: 503 });

  // ── IP ───────────────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  // ── Hız sınırı ───────────────────────────────────────────────────────────
  const ratelimit = getRatelimit(redis);
  const { success: allowed } = await ratelimit.limit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  // ── Body parse ───────────────────────────────────────────────────────────
  let body: { id: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { id } = body;
  if (!id || typeof id !== "string" || id.length > 80) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  // ── IP başına tekrar engeli ───────────────────────────────────────────────
  const reporterKey = `${REPORTER_PREFIX}${id}:${hashIp(ip)}`;
  // SET NX: sadece ilk kez kayıt et; zaten raporlamışsa reddet
  const isNew = await redis.set(reporterKey, "1", { nx: true, ex: REPORT_TTL });
  if (!isNew) {
    return NextResponse.json({ error: "already_reported" }, { status: 409 });
  }

  // ── Rapor sayacını artır (TTL ile) ───────────────────────────────────────
  const reportKey = `${REPORT_PREFIX}${id}`;
  const count = await redis.incr(reportKey);
  // Sayaç TTL'ini güncelle (her incrda sıfırla ki paylaşımla aynı ömrü olsun)
  await redis.expire(reportKey, REPORT_TTL);

  // ── Eşik aşıldıysa sorted set'ten kaydı bul ve sil ──────────────────────
  if (count >= REPORT_THRESHOLD) {
    // @upstash/redis auto-parses members: raw contains objects, not strings
    const raw = (await redis.zrange(KV_KEY, 0, -1)) as unknown[];
    for (const member of raw) {
      const apt =
        member !== null && typeof member === "object"
          ? (member as { id?: string })
          : null;
      if (apt?.id === id) {
        await redis.zrem(KV_KEY, member);
        await redis.del(reportKey);
        break;
      }
    }
    return NextResponse.json({ removed: true });
  }

  return NextResponse.json({ reported: true, count });
}
