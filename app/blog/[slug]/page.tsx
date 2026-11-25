import Link from "next/link";
import { notFound } from "next/navigation";
import Nav, { Footer } from "@/components/Nav";
import { posts, fmtDate } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — Adrian Kmiecik`, description: p.excerpt } : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <main className="grain relative min-h-screen overflow-x-clip">
      <Nav />
      <article className="mx-auto max-w-2xl px-6 pt-40 pb-20">
        <Link href="/blog" className="text-sm text-mist transition hover:text-lime">← Wszystkie wpisy</Link>
        <p className="mt-10 text-sm text-mist">{fmtDate(p.date)}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">{p.title}</h1>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/85">
          {p.body.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </article>
      <Footer />
    </main>
  );
}
