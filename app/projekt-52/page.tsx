import Nav, { Footer } from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { books, fmtDate } from "@/lib/content";

export const metadata = { title: "Projekt 52 — Adrian Kmiecik", description: "52 książki w rok. Lista przeczytanych i notatki." };

export default function P52() {
  const done = books.filter((b) => b.status === "przeczytana").length;
  return (
    <main className="grain relative min-h-screen overflow-x-clip">
      <Nav />
      <section className="mx-auto max-w-4xl px-6 pt-40 pb-20">
        <Reveal>
          <p className="text-sm uppercase tracking-[.3em] text-lime">Projekt 52</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">52 książki w rok</h1>
          <p className="mt-6 max-w-xl text-lg text-mist">Jedna książka tygodniowo: biznes, sprzedaż, rozwój. Po każdej krótka notatka — co biorę do pracy i do życia.</p>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="flex items-end justify-between">
            <p className="font-display text-7xl font-extrabold text-lime md:text-8xl">{done}<span className="text-white/30">/52</span></p>
            <p className="pb-3 text-sm text-mist">przeczytanych</p>
          </div>
          <div className="mt-6 grid grid-cols-[repeat(26,1fr)] gap-1.5 md:grid-cols-[repeat(52,1fr)]">
            {Array.from({ length: 52 }, (_, i) => (
              <div key={i} className={`aspect-[1/3] rounded-sm ${i < done ? "bg-lime" : i === done ? "animate-pulse bg-amber" : "bg-white/10"}`} />
            ))}
          </div>
        </Reveal>

        <div className="mt-16 space-y-4">
          {books.map((b, i) => (
            <Reveal key={b.title} delay={i * 60}>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.03] px-6 py-5">
                <div className="flex items-center gap-5">
                  <span className="font-display text-2xl font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-xl font-bold">{b.title}</p>
                    <p className="text-sm text-mist">{b.author}</p>
                    {b.note && <p className="mt-2 text-sm text-white/80">{b.note}</p>}
                  </div>
                </div>
                {b.status === "czytam" ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 text-xs uppercase tracking-widest text-amber">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber" /> Czytam
                  </span>
                ) : (
                  <span className="text-sm text-mist">{b.finished ? fmtDate(b.finished) : "Przeczytana"}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
