import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const KV_KEY        = "sp:community_apts";
const REPORT_PREFIX = "sp:reports:";
const REPORT_THRESHOLD = 3;

function getRedis() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  return new Redis({
    url:   process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

export async function POST(req: NextRequest) {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: "kv_unavailable" }, { status: 503 });

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

  // Rapor sayacını artır
  const reportKey = `${REPORT_PREFIX}${id}`;
  const count = await redis.incr(reportKey);

  // Eşik aşıldıysa sorted set'ten kaydı bul ve sil
  if (count >= REPORT_THRESHOLD) {
    // Tüm üyeleri çek ve id'si eşleşeni sil
    const raw = (await redis.zrange(KV_KEY, 0, -1)) as string[];
    for (const member of raw) {
      try {
        const parsed = JSON.parse(member) as { id: string };
        if (parsed.id === id) {
          await redis.zrem(KV_KEY, member);
          await redis.del(reportKey);
          break;
        }
      } catch { /* skip */ }
    }
    return NextResponse.json({ removed: true });
  }

  return NextResponse.json({ reported: true, count });
}
