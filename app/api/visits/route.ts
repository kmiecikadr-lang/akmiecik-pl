import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Licznik odwiedzin w Upstash Redis (zmienne dodawane przez integrację Vercel → Storage).
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "akmiecik:visits";

async function redis(cmd: string) {
  const r = await fetch(`${URL_}/${cmd}/${KEY}`, { headers: { Authorization: `Bearer ${TOKEN}` }, cache: "no-store" });
  if (!r.ok) throw new Error(String(r.status));
  const j = await r.json();
  return Number(j.result) || 0;
}

export async function GET() {
  if (!URL_ || !TOKEN) return NextResponse.json({ count: null });
  try { return NextResponse.json({ count: await redis("get") }); } catch { return NextResponse.json({ count: null }); }
}

export async function POST() {
  if (!URL_ || !TOKEN) return NextResponse.json({ count: null });
  try { return NextResponse.json({ count: await redis("incr") }); } catch { return NextResponse.json({ count: null }); }
}
