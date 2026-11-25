import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "ak_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dni

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

export function isConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(pw: string) {
  const real = process.env.ADMIN_PASSWORD || "";
  if (!real) return false;
  const a = Buffer.from(sign(pw));
  const b = Buffer.from(sign(real));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeToken() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export async function isAdmin() {
  if (!isConfigured()) return false;
  const t = (await cookies()).get(COOKIE)?.value;
  if (!t) return false;
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = Buffer.from(sign(exp));
  const got = Buffer.from(sig);
  return good.length === got.length && timingSafeEqual(good, got);
}

export const cookieOptions = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/", maxAge: MAX_AGE };
