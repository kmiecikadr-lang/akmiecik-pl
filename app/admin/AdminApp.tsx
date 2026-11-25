"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Book, Post } from "@/lib/content";

type Msg = { role: "user" | "assistant"; content: string };
type Pending = { books?: Book[]; posts?: Post[]; summary: string[] };
type Tab = "asystent" | "ksiazki" | "blog";

const STATUSES: Book["status"][] = ["czytam", "przeczytana", "w kolejce"];
const today = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });
const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function diff<T>(before: T[], after: T[], key: (x: T) => string, label: (x: T) => string, what: string) {
  const out: string[] = [];
  const b = new Map(before.map((x) => [key(x), x]));
  const a = new Map(after.map((x) => [key(x), x]));
  for (const [k, x] of a) {
    if (!b.has(k)) out.push(`+ ${what}: ${label(x)}`);
    else if (JSON.stringify(b.get(k)) !== JSON.stringify(x)) out.push(`✎ ${what}: ${label(x)}`);
  }
  for (const [k, x] of b) if (!a.has(k)) out.push(`− ${what}: ${label(x)}`);
  return out;
}

const input = "w-full rounded-xl border border-white/15 bg-ink px-3 py-2.5 text-base outline-none focus:border-lime";
const btn = "rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-40";

export default function AdminApp() {
  const [tab, setTab] = useState<Tab>("asystent");
  const [books, setBooks] = useState<Book[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [readOnly, setReadOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content").then(async (r) => {
      const j = await r.json();
      if (!r.ok) setToast(j.error || "Nie udało się wczytać treści.");
      else {
        setBooks(j.books);
        setPosts(j.posts);
        setReadOnly(Boolean(j.readOnly));
      }
      setLoading(false);
    });
  }, []);

  const flash = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 6000);
  };

  const save = async (data: { books?: Book[]; posts?: Post[] }) => {
    setSaving(true);
    const r = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    setSaving(false);
    if (!r.ok) {
      flash((await r.json()).error || "Nie udało się zapisać.");
      return false;
    }
    if (data.books) setBooks(data.books);
    if (data.posts) setPosts(data.posts);
    flash("Opublikowane ✓ Strona zaktualizuje się za ok. 1–2 minuty.");
    return true;
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 pt-6 pb-32">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-extrabold">AK<span className="text-lime">.</span> <span className="text-base font-semibold text-mist">panel</span></Link>
        <button onClick={logout} className="text-sm text-mist hover:text-white">Wyloguj</button>
      </header>

      <nav className="sticky top-3 z-20 mt-6 grid grid-cols-3 gap-1 rounded-full border border-white/10 bg-ink/80 p-1 backdrop-blur-xl">
        {([["asystent", "Asystent AI"], ["ksiazki", "Projekt 52"], ["blog", "Blog"]] as [Tab, string][]).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full py-2.5 text-sm font-semibold transition ${tab === k ? "bg-lime text-ink" : "text-mist"}`}>{l}</button>
        ))}
      </nav>

      {readOnly && <p className="mt-4 rounded-xl border border-amber/40 p-3 text-sm text-amber">Tryb podglądu: brak GITHUB_TOKEN, więc zapisywanie jest wyłączone.</p>}

      {loading ? (
        <p className="mt-16 text-center text-mist">Wczytuję…</p>
      ) : tab === "asystent" ? (
        <Assistant books={books} posts={posts} save={save} saving={saving} readOnly={readOnly} />
      ) : tab === "ksiazki" ? (
        <Books books={books} save={save} saving={saving} readOnly={readOnly} />
      ) : (
        <Blog posts={posts} save={save} saving={saving} readOnly={readOnly} />
      )}

      {toast && <div className="pointer-events-none fixed inset-x-4 top-20 z-50 mx-auto max-w-md rounded-2xl bg-white px-5 py-4 text-sm font-medium text-ink shadow-2xl">{toast}</div>}
    </main>
  );
}

type SaveFn = (d: { books?: Book[]; posts?: Post[] }) => Promise<boolean>;

/* ---------------- ASYSTENT ---------------- */
function Assistant({ books, posts, save, saving, readOnly }: { books: Book[]; posts: Post[]; save: SaveFn; saving: boolean; readOnly: boolean }) {
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    try { return JSON.parse(localStorage.getItem("ak_chat") || "[]"); } catch { return []; }
  });
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [pending, setPending] = useState<Pending | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { localStorage.setItem("ak_chat", JSON.stringify(msgs.slice(-40))); } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, pending]);

  const send = async (t = text) => {
    if (!t.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: t.trim() }];
    setMsgs(next);
    setText("");
    setBusy(true);
    setPending(null);
    const r = await fetch("/api/admin/ai", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: next, books, posts }) });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) {
      setMsgs([...next, { role: "assistant", content: `⚠️ ${j.error}` }]);
      return;
    }
    setMsgs([...next, { role: "assistant", content: j.reply }]);
    const summary = [
      ...(j.books ? diff<Book>(books, j.books, (b) => b.title, (b) => `${b.title} (${b.status})`, "Książka") : []),
      ...(j.posts ? diff<Post>(posts, j.posts, (p) => p.slug, (p) => p.title, "Wpis") : []),
    ];
    if (summary.length) setPending({ books: j.books, posts: j.posts, summary });
  };

  const publish = async () => {
    if (!pending) return;
    const ok = await save({ books: pending.books, posts: pending.posts });
    if (ok) {
      setPending(null);
      setMsgs((m) => [...m, { role: "assistant", content: "Opublikowane ✓" }]);
    }
  };

  const hints = ["Skończyłem książkę…", "Zacząłem czytać…", "Dodaj do kolejki…", "Napisz wpis na bloga o…"];

  return (
    <section className="mt-6">
      {msgs.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6">
          <p className="font-display text-2xl font-bold">Cześć Adrian 👋</p>
          <p className="mt-2 text-mist">Napisz po ludzku, co się zmieniło — np. „skończyłem 12-tygodniowy rok, najważniejsze dla mnie było…”. Przygotuję zmiany, a Ty zatwierdzisz je jednym przyciskiem.</p>
        </div>
      )}
      <div className="mt-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "ml-auto bg-lime text-ink" : "bg-white/[.06]"}`}>{m.content}</div>
        ))}
        {busy && <div className="w-24 animate-pulse rounded-2xl bg-white/[.06] px-4 py-3 text-mist">…</div>}
        {pending && (
          <div className="rounded-2xl border border-lime/50 bg-lime/5 p-4">
            <p className="text-sm font-semibold text-lime">Zmiany do opublikowania</p>
            <ul className="mt-2 space-y-1 text-sm">{pending.summary.map((s) => <li key={s}>{s}</li>)}</ul>
            {pending.posts && <PostPreview posts={pending.posts} before={posts} />}
            <div className="mt-4 flex gap-2">
              <button onClick={publish} disabled={saving || readOnly} className={`${btn} bg-lime text-ink`}>{saving ? "Publikuję…" : "Opublikuj"}</button>
              <button onClick={() => setPending(null)} className={`${btn} border border-white/20`}>Odrzuć</button>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/90 px-4 pt-3 pb-5 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          {msgs.length === 0 && (
            <div className="mb-3 flex gap-2 overflow-x-auto">
              {hints.map((h) => <button key={h} onClick={() => setText(h)} className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-sm text-mist">{h}</button>)}
            </div>
          )}
          <div className="flex items-end gap-2">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={1} placeholder="Napisz do asystenta…"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) { e.preventDefault(); send(); } }}
              className={`${input} max-h-40 min-h-[46px] resize-none`} />
            <button onClick={() => send()} disabled={busy || !text.trim()} className="h-[46px] shrink-0 rounded-full bg-lime px-5 font-semibold text-ink disabled:opacity-40">↑</button>
          </div>
          {msgs.length > 0 && <button onClick={() => { setMsgs([]); setPending(null); }} className="mt-2 text-xs text-mist">Nowa rozmowa</button>}
        </div>
      </div>
    </section>
  );
}

function PostPreview({ posts, before }: { posts: Post[]; before: Post[] }) {
  const changed = posts.filter((p) => JSON.stringify(before.find((b) => b.slug === p.slug)) !== JSON.stringify(p));
  return (
    <div className="mt-3 space-y-3">
      {changed.map((p) => (
        <details key={p.slug} className="rounded-xl bg-ink/60 p-3 text-sm">
          <summary className="cursor-pointer font-semibold">Podgląd: {p.title}</summary>
          <p className="mt-2 text-mist">{p.excerpt}</p>
          {p.body.map((t, i) => <p key={i} className="mt-2">{t}</p>)}
        </details>
      ))}
    </div>
  );
}

/* ---------------- KSIĄŻKI ---------------- */
function Books({ books, save, saving, readOnly }: { books: Book[]; save: SaveFn; saving: boolean; readOnly: boolean }) {
  const [list, setList] = useState<Book[]>(books);
  const [open, setOpen] = useState<number | null>(null);
  const dirty = JSON.stringify(list) !== JSON.stringify(books);
  const done = list.filter((b) => b.status === "przeczytana").length;

  const upd = (i: number, patch: Partial<Book>) => setList((l) => l.map((b, j) => (j === i ? { ...b, ...patch } : b)));

  return (
    <section className="mt-6">
      <p className="font-display text-5xl font-extrabold text-lime">{done}<span className="text-white/30">/52</span></p>
      <div className="mt-6 space-y-3">
        {list.map((b, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/[.03]">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left">
              <div>
                <p className="font-semibold">{b.title || "Nowa książka"}</p>
                <p className="text-sm text-mist">{b.author}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${b.status === "czytam" ? "bg-amber/20 text-amber" : b.status === "przeczytana" ? "bg-lime/20 text-lime" : "bg-white/10 text-mist"}`}>{b.status}</span>
            </button>
            {open === i && (
              <div className="space-y-3 border-t border-white/10 p-4">
                <input className={input} value={b.title} placeholder="Tytuł" onChange={(e) => upd(i, { title: e.target.value })} />
                <input className={input} value={b.author} placeholder="Autor" onChange={(e) => upd(i, { author: e.target.value })} />
                <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/15 p-1">
                  {STATUSES.map((s) => (
                    <button key={s} onClick={() => upd(i, { status: s, finished: s === "przeczytana" ? b.finished || today() : undefined })}
                      className={`rounded-lg py-2 text-sm ${b.status === s ? "bg-white text-ink" : "text-mist"}`}>{s}</button>
                  ))}
                </div>
                {b.status === "przeczytana" && <input type="date" className={input} value={b.finished || ""} onChange={(e) => upd(i, { finished: e.target.value })} />}
                <textarea className={`${input} min-h-24`} value={b.note || ""} placeholder="Notatka: co biorę z tej książki (opcjonalnie)" onChange={(e) => upd(i, { note: e.target.value || undefined })} />
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <button disabled={i === 0} onClick={() => { const l = [...list]; [l[i - 1], l[i]] = [l[i], l[i - 1]]; setList(l); setOpen(i - 1); }} className="rounded-lg border border-white/15 px-3 py-1.5 text-sm disabled:opacity-30">↑</button>
                    <button disabled={i === list.length - 1} onClick={() => { const l = [...list]; [l[i + 1], l[i]] = [l[i], l[i + 1]]; setList(l); setOpen(i + 1); }} className="rounded-lg border border-white/15 px-3 py-1.5 text-sm disabled:opacity-30">↓</button>
                  </div>
                  <button onClick={() => { if (confirm(`Usunąć „${b.title}”?`)) { setList(list.filter((_, j) => j !== i)); setOpen(null); } }} className="text-sm text-red-400">Usuń</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => { setList([...list, { title: "", author: "", status: "w kolejce" }]); setOpen(list.length); }} className={`${btn} mt-4 w-full border border-dashed border-white/25`}>+ Dodaj książkę</button>
      <SaveBar dirty={dirty} saving={saving} readOnly={readOnly} onSave={() => save({ books: list.filter((b) => b.title.trim()) })} onReset={() => setList(books)} />
    </section>
  );
}

/* ---------------- BLOG ---------------- */
function Blog({ posts, save, saving, readOnly }: { posts: Post[]; save: SaveFn; saving: boolean; readOnly: boolean }) {
  const [list, setList] = useState<Post[]>(posts);
  const [edit, setEdit] = useState<number | null>(null);
  const dirty = JSON.stringify(list) !== JSON.stringify(posts);
  const upd = (i: number, patch: Partial<Post>) => setList((l) => l.map((p, j) => (j === i ? { ...p, ...patch } : p)));

  if (edit !== null && list[edit]) {
    const p = list[edit];
    return (
      <section className="mt-6 space-y-3">
        <button onClick={() => setEdit(null)} className="text-sm text-mist">← Wszystkie wpisy</button>
        <input className={`${input} font-display text-xl font-bold`} value={p.title} placeholder="Tytuł"
          onChange={(e) => upd(edit, { title: e.target.value, ...(posts.some((x) => x.slug === p.slug) ? {} : { slug: slugify(e.target.value) }) })} />
        <div className="grid grid-cols-2 gap-2">
          <input type="date" className={input} value={p.date} onChange={(e) => upd(edit, { date: e.target.value })} />
          <button onClick={() => upd(edit, { category: p.category === "ai" ? undefined : "ai" })}
            className={`rounded-xl border text-sm ${p.category === "ai" ? "border-lime bg-lime/10 text-lime" : "border-white/15 text-mist"}`}>
            {p.category === "ai" ? "✓ AI w praktyce" : "Seria AI w praktyce"}
          </button>
        </div>
        <input className={input} value={p.slug} placeholder="adres-wpisu" onChange={(e) => upd(edit, { slug: slugify(e.target.value) })} />
        <textarea className={`${input} min-h-20`} value={p.excerpt} placeholder="Zajawka — jedno zdanie" onChange={(e) => upd(edit, { excerpt: e.target.value })} />
        <textarea className={`${input} min-h-72`} value={p.body.join("\n\n")} placeholder="Treść. Akapity oddzielaj pustą linią."
          onChange={(e) => upd(edit, { body: e.target.value.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) })} />
        <button onClick={() => { if (confirm("Usunąć ten wpis?")) { setList(list.filter((_, j) => j !== edit)); setEdit(null); } }} className="text-sm text-red-400">Usuń wpis</button>
        <SaveBar dirty={dirty} saving={saving} readOnly={readOnly} onSave={() => save({ posts: list.filter((x) => x.title.trim() && x.slug) })} onReset={() => { setList(posts); setEdit(null); }} />
      </section>
    );
  }

  return (
    <section className="mt-6">
      <button onClick={() => { setList([{ slug: "", title: "", date: today(), excerpt: "", body: [] }, ...list]); setEdit(0); }} className={`${btn} w-full border border-dashed border-white/25`}>+ Nowy wpis</button>
      <div className="mt-4 space-y-3">
        {list.map((p, i) => (
          <button key={i} onClick={() => setEdit(i)} className="block w-full rounded-2xl border border-white/10 bg-white/[.03] px-4 py-4 text-left">
            <p className="text-xs text-mist">{p.date}{p.category === "ai" && <span className="ml-2 text-lime">AI w praktyce</span>}</p>
            <p className="mt-1 font-semibold">{p.title || "Bez tytułu"}</p>
          </button>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} readOnly={readOnly} onSave={() => save({ posts: list })} onReset={() => setList(posts)} />
    </section>
  );
}

function SaveBar({ dirty, saving, readOnly, onSave, onReset }: { dirty: boolean; saving: boolean; readOnly: boolean; onSave: () => void; onReset: () => void }) {
  if (!dirty) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/90 px-4 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
        <button onClick={onReset} className="text-sm text-mist">Cofnij zmiany</button>
        <button onClick={onSave} disabled={saving || readOnly} className={`${btn} bg-lime text-ink`}>{saving ? "Publikuję…" : "Opublikuj zmiany"}</button>
      </div>
    </div>
  );
}
