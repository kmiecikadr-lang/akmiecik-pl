"use client";
import { useState } from "react";

export default function Login() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (r.ok) location.reload();
    else {
      setErr((await r.json()).error || "Błąd logowania.");
      setBusy(false);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[.03] p-8">
        <p className="font-display text-3xl font-extrabold">AK<span className="text-lime">.</span> panel</p>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Hasło" autoFocus
          className="mt-8 w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-base outline-none focus:border-lime" />
        {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
        <button disabled={busy || !pw} className="mt-6 w-full rounded-full bg-lime py-3 font-semibold text-ink disabled:opacity-50">
          {busy ? "Sprawdzam…" : "Zaloguj"}
        </button>
      </form>
    </main>
  );
}
