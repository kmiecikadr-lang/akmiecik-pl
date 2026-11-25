import Link from "next/link";

export const PHONE = "+48 788 441 244";
export const TEL = "tel:+48788441244";

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-ink/60 px-5 py-3 backdrop-blur-xl">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
          AK<span className="text-lime">.</span>
        </Link>
        <div className="flex gap-5 text-sm text-mist md:gap-8">
          <Link href="/#projekty" className="hidden transition hover:text-white md:inline">Projekty</Link>
          <Link href="/#doswiadczenie" className="hidden transition hover:text-white md:inline">Doświadczenie</Link>
          <Link href="/blog" className="transition hover:text-white">Blog</Link>
          <Link href="/projekt-52" className="transition hover:text-white">Projekt 52</Link>
        </div>
        <a href={TEL} className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:scale-105">
          Zadzwoń
        </a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-between gap-4 px-6 pb-10 text-sm text-mist">
      <span>© {new Date().getFullYear()} Adrian Kmiecik</span>
      <span>Czeladź · Śląsk</span>
    </footer>
  );
}
