import Link from "next/link";
import Nav, { Footer } from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { posts, fmtDate } from "@/lib/content";

export const metadata = { title: "Blog — Adrian Kmiecik", description: "Notatki o sprzedaży, BHP, budowaniu projektów i przeczytanych książkach." };

export default function Blog() {
  return (
    <main className="grain relative min-h-screen overflow-x-clip">
      <Nav />
      <section className="mx-auto max-w-4xl px-6 pt-40 pb-20">
        <Reveal>
          <p className="text-sm uppercase tracking-[.3em] text-lime">Blog</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">Notatki z drogi</h1>
          <p className="mt-6 max-w-xl text-lg text-mist">Sprzedaż, BHP, budowanie własnych projektów i to, czego uczę się z książek.</p>
        </Reveal>
        <div className="mt-16 space-y-5">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link href={`/blog/${p.slug}`} className="group block rounded-3xl border border-white/10 bg-white/[.03] p-8 transition hover:-translate-y-1 hover:border-lime/40">
                <p className="text-sm text-mist">{fmtDate(p.date)}</p>
                <h2 className="mt-3 font-display text-3xl font-bold transition group-hover:text-lime">{p.title}</h2>
                <p className="mt-3 text-mist">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
