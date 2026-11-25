import { NextResponse } from "next/server";
import { COOKIE, checkPassword, cookieOptions, isConfigured, makeToken } from "@/lib/auth";

export async function POST(req: Request) {
  if (!isConfigured()) return NextResponse.json({ error: "Panel nie jest jeszcze skonfigurowany (brak ADMIN_PASSWORD)." }, { status: 503 });
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password || ""))) {
    await new Promise((r) => setTimeout(r, 1200));
    return NextResponse.json({ error: "Złe hasło." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), cookieOptions);
  return res;
}
