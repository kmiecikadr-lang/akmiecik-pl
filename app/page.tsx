import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Spot from "@/components/Spot";
import Nav, { Footer, PHONE, TEL } from "@/components/Nav";
import Link from "next/link";
import { posts, books } from "@/lib/content";
import ChessPuzzle from "@/components/ChessPuzzle";
import { getDailyPuzzle } from "@/lib/puzzle";

export const revalidate = 3600;


const marquee = ["Daimler Truck Retail Polska", "Smilerate", "iAtlas", "dbajOBHP"];

const jobs: { d: string; r: string; f: string; t?: string; now?: boolean; bhp?: boolean }[] = [
  { d: "08.2024 — obecnie", r: "Key Account Manager ds. Sprzedaży Części i Usług Serwisowych", f: "Daimler Truck Retail Polska · Ruda Śląska", t: "Pozyskiwanie i rozwój klientów flotowych, oferty, negocjacje, współpraca z serwisem.", now: true },
  { d: "02.2022 — 07.2024", r: "Reprezentant Handlowy ds. Usług Serwisowych", f: "Volvo Trucks Polska · Świętochłowice", t: "Sprzedaż usług i kontraktów serwisowych, analiza potrzeb klientów." },
  { d: "02.2023 — 02.2024", r: "Starszy Inspektor ds. BHP", f: "Ajaks Multiserwis · Dąbrowa Górnicza", t: "Pełen zakres zadań służby BHP, kontrole, szkolenia wstępne i okresowe.", bhp: true },
  { d: "07.2021 — 07.2023", r: "Starszy Inspektor ds. BHP", f: "ARBOR BHP · Sławków", t: "Doradztwo, kontrole i szkolenia BHP.", bhp: true },
  { d: "01.2021 — 01.2022", r: "Przedstawiciel Handlowy", f: "ZTE Katowice" },
  { d: "04.2020 — 11.2020", r: "Przedstawiciel Handlowy ds. Usług Serwisowych", f: "Scania Polska · Gliwice", t: "Kontrakty serwisowe, kampanie warsztatowe, usługi telematyczne." },
  { d: "06.2018 — 04.2020", r: "Doradca Serwisowy", f: "Scania Polska · Gliwice", t: "Zlecenia warsztatowe, sprzedaż części, rozliczenia, współpraca z ubezpieczycielami." },
];

const edu = [
  { t: "Studia podyplomowe — Bezpieczeństwo i higiena pracy", s: "Uniwersytet Jana Długosza w Częstochowie · 2023" },
  { t: "Magister — Zarządzanie i Inżynieria Produkcji, Europejski Menedżer BHP", s: "Wyższa Szkoła Zarządzania Ochroną Pracy w Katowicach · 2021" },
  { t: "Inżynier — Zarządzanie i Inżynieria Produkcji, Zarządzanie Jakością", s: "Wyższa Szkoła Zarządzania Ochroną Pracy w Katowicach · 2020" },
];


type Job = (typeof jobs)[number];

function JobCard({ x }: { x: Job }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.02] px-6 py-5 transition hover:border-lime/40 hover:bg-white/[.04]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-mist">{x.d}</p>
        {x.now && <Tag live>Teraz</Tag>}
        {x.bhp && <span className="text-xs uppercase tracking-widest text-amber">BHP</span>}
      </div>
      <p className="mt-2 font-display text-xl font-bold">{x.r}</p>
      <p className="text-sm text-white/70">{x.f}</p>
      {x.t && <p className="mt-2 text-sm text-mist">{x.t}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function Tag({ children, live = false }: { children: React.ReactNode; live?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-mist">
      {live && <span className="pulse-dot h-2 w-2 rounded-full bg-lime" />}
      {children}
    </span>
  );
}

export default async function Home() {
  const puzzle = await getDailyPuzzle();
  return (
    <main className="grain relative overflow-x-clip">
      <Nav />

      {/* HERO */}
      <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-16">
        <div className="aurora"><span className="a1" /><span className="a2" /><span className="a3" /></div>
        <div className="grid-lines absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist backdrop-blur">
              <span className="pulse-dot h-2 w-2 rounded-full bg-lime" /> Sprzedaż B2B · BHP · Własne projekty
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[19vw] leading-[.82] font-extrabold tracking-[-.05em] md:text-[11rem]">
              Adrian<br /><span className="text-shine">Kmiecik</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-10 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Sprzedaję, szkolę, buduję.<br /><span className="text-lime">I ciągle się rozwijam.</span>
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              Key Account Manager w Daimler Truck Retail Polska, wcześniej Volvo Trucks i Scania. Magister inżynier i specjalista BHP z uprawnieniami inspektora ochrony przeciwpożarowej. Po godzinach rozwijam własne projekty, czytam i opisuję to, czego się uczę.
            </p>
          </Reveal>
          <Reveal delay={550}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projekty" className="group inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-semibold text-ink transition hover:scale-105">
                Zobacz projekty <Arrow />
              </a>
              <a href={TEL} className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 font-semibold transition hover:border-lime hover:text-lime">
                {PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative -rotate-1 overflow-hidden border-y border-white/10 bg-lime py-4 text-ink">
        <div className="marquee">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="mx-6 flex items-center gap-6 font-display text-2xl font-bold whitespace-nowrap md:text-3xl">
              {m} <span className="text-ink/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* LICZBY */}
      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
          {[
            { n: 8, s: "+", t: "lat w branży ciężarowej" },
            { n: 2, s: "+", t: "lata jako starszy inspektor BHP" },
            { n: 3, s: "", t: "własne projekty w rozwoju" },
            { n: 52, s: "", t: "książki do przeczytania w rok" },
          ].map((x, i) => (
            <Reveal key={i} delay={i * 100} className="bg-ink p-8 md:p-10">
              <div className="font-display text-5xl font-extrabold tracking-tight text-lime md:text-7xl">
                <CountUp to={x.n} suffix={x.s} />
              </div>
              <p className="mt-3 text-sm text-mist">{x.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJEKTY */}
      <section id="projekty" className="px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[.3em] text-lime">Projekty</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
              Rzeczy, które <span className="outline-text">buduję</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
            <Reveal className="md:col-span-4">
              <Spot href="https://smilerate.pl" className="h-full p-8 md:p-10">
                <div className="flex items-start justify-between">
                  <Tag live>Działa</Tag>
                  <span className="text-mist group-hover:text-lime"><Arrow /></span>
                </div>
                <div className="my-10 flex gap-2 text-[2.6rem] md:gap-5 md:text-8xl">
                  {["😡", "🙁", "😐", "🙂", "😍"].map((e, i) => (
                    <span key={i} className="transition duration-500 group-hover:-translate-y-3" style={{ transitionDelay: `${i * 60}ms` }}>{e}</span>
                  ))}
                </div>
                <h3 className="font-display text-4xl font-bold">Smilerate</h3>
                <p className="mt-3 max-w-lg text-mist">
                  Kiosk z minkami, który mierzy zadowolenie klientów na bieżąco. Tablet przy ladzie, panel dla managera i raport w każdy poniedziałek na maila.
                </p>
              </Spot>
            </Reveal>

            <Reveal delay={120} className="md:col-span-2">
              <Spot href="https://iatlas.pl" className="flex h-full flex-col p-8">
                <div className="flex items-start justify-between">
                  <Tag>Start 01.2027</Tag>
                  <span className="text-mist group-hover:text-lime"><Arrow /></span>
                </div>
                <div className="my-10 flex flex-1 items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 rounded-full border-[10px] border-white/10" />
                    <div className="absolute inset-0 animate-spin rounded-full border-[10px] border-transparent border-t-lime border-r-lime [animation-duration:3s]" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">AI</div>
                  </div>
                </div>
                <h3 className="font-display text-3xl font-bold">iAtlas</h3>
                <p className="mt-3 text-mist">Aplikacja treningowa z analizą AI. Plan, postęp i motywacja w jednym miejscu.</p>
              </Spot>
            </Reveal>

            <Reveal delay={80} className="md:col-span-3">
              <Spot href="https://dbajobhp.com.pl" className="h-full p-8">
                <div className="flex items-start justify-between">
                  <Tag>BHP dla firm</Tag>
                  <span className="text-mist group-hover:text-lime"><Arrow /></span>
                </div>
                <h3 className="mt-16 font-display text-3xl font-bold">dbaj<span className="text-amber">OBHP</span></h3>
                <p className="mt-3 text-mist">Doradztwo i szkolenia BHP. Robię to osobiście — konkretnie, bez papierologii dla samej papierologii.</p>
              </Spot>
            </Reveal>

            <Reveal delay={160} className="md:col-span-3">
              <Spot href="/blog/ai-w-praktyce" className="h-full p-8">
                <div className="flex items-start justify-between">
                  <Tag>Blog</Tag>
                  <span className="text-mist group-hover:text-lime"><Arrow /></span>
                </div>
                <h3 className="mt-16 font-display text-3xl font-bold">AI w praktyce</h3>
                <p className="mt-3 text-mist">Jak używam AI w sprzedaży, BHP i przy budowaniu własnych projektów. Konkretne przykłady, bez teorii.</p>
              </Spot>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DOŚWIADCZENIE */}
      <section id="doswiadczenie" className="relative overflow-hidden border-y border-white/10 px-6 py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[1fr_1.4fr]">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <p className="text-sm uppercase tracking-[.3em] text-lime">Doświadczenie</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Od doradcy serwisowego do Key Account Managera</h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist">
              Zaczynałem w 2018 roku jako doradca serwisowy w Scanii. Potem sprzedaż usług serwisowych w Scanii i Volvo Trucks, a dziś kluczowi klienci w Daimler Truck. Równolegle ponad 2 lata pracowałem jako starszy inspektor BHP — audyty, kontrole i szkolenia.
            </p>
          </Reveal>
          <div>
            <JobCard x={jobs[0]} />
            <details className="group/d mt-4">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl border border-white/10 px-6 py-5 text-mist transition hover:border-lime/40 hover:text-white [&::-webkit-details-marker]:hidden">
                <span>Wcześniejsze doświadczenie ({jobs.length - 1})</span>
                <span className="text-2xl leading-none text-lime transition-transform duration-300 group-open/d:rotate-45">+</span>
              </summary>
              <div className="mt-4 space-y-4">
                {jobs.slice(1).map((x, i) => <JobCard key={i} x={x} />)}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* WYKSZTAŁCENIE */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[.3em] text-lime">Wykształcenie</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              mgr inż. <span className="outline-text">+ BHP</span>
            </h2>
          </Reveal>
          <div className="mt-14 max-w-3xl">
            <Reveal>
              <Spot className="h-full p-8">
                <Tag>Studia</Tag>
                <ul className="mt-6 space-y-5">
                  {edu.map((e) => (
                    <li key={e.t}>
                      <p className="font-display text-lg font-bold">{e.t}</p>
                      <p className="text-sm text-mist">{e.s}</p>
                    </li>
                  ))}
                </ul>
              </Spot>
            </Reveal>
          </div>
        </div>
      </section>

      {/* POZA PRACĄ */}
      <section className="px-6 pt-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[.3em] text-lime">Poza pracą</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
              Normalny człowiek, <span className="outline-text">który chce więcej</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <Link href="/projekt-52" className="spot group block h-full rounded-3xl border border-white/10 bg-white/[.03] p-8 transition hover:-translate-y-1 hover:border-lime/40">
                <Tag live>Projekt 52</Tag>
                <p className="mt-10 font-display text-7xl font-extrabold text-lime">
                  {books.filter((b) => b.status === "przeczytana").length}<span className="text-white/30">/52</span>
                </p>
                <h3 className="mt-4 font-display text-3xl font-bold">52 książki w rok</h3>
                <p className="mt-3 text-mist">
                  Teraz czytam: {books.find((b) => b.status === "czytam")?.title ?? "—"}. Po każdej książce krótka notatka.
                </p>
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <Link href="/blog" className="spot group block h-full rounded-3xl border border-white/10 bg-white/[.03] p-8 transition hover:-translate-y-1 hover:border-lime/40">
                <div className="flex items-start justify-between">
                  <Tag>Blog</Tag>
                  <span className="text-mist group-hover:text-lime"><Arrow /></span>
                </div>
                <h3 className="mt-10 font-display text-3xl font-bold">Notatki z drogi</h3>
                <p className="mt-3 text-mist">Sprzedaż, BHP, budowanie własnych projektów i wnioski z książek.</p>
                <p className="mt-8 border-t border-white/10 pt-5 text-sm text-mist">Najnowszy wpis</p>
                <p className="mt-1 font-semibold transition group-hover:text-lime">{posts[0]?.title}</p>
              </Link>
            </Reveal>
            <Reveal delay={80} className="md:col-span-2">
              <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-white/10 bg-white/[.03] p-6 md:grid-cols-[1fr_auto] md:p-10">
                <div>
                  <Tag live>Szachy · zadanie dnia</Tag>
                  <h3 className="mt-8 font-display text-4xl font-bold md:text-5xl">{puzzle.goal}</h3>
                  <p className="mt-4 max-w-sm text-mist">Codziennie nowe zadanie. Rozwiąż je tutaj — kliknij bierkę, a potem pole, na które ma się ruszyć.</p>
                  {puzzle.rating && <p className="mt-6 text-sm text-mist">Ranking zadania: <span className="font-semibold text-white">{puzzle.rating}</span></p>}
                  {puzzle.url && <a href={puzzle.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-lime hover:underline">Zadanie z Lichess →</a>}
                </div>
                <ChessPuzzle key={puzzle.fen} fen={puzzle.fen} solution={puzzle.solution} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFEST */}
      <section className="px-6 py-32">
        <Reveal className="mx-auto max-w-6xl">
          <p className="font-display text-5xl leading-[1.05] font-extrabold tracking-tight md:text-8xl">
            Lubię, gdy rzeczy <span className="text-shine">działają.</span>{" "}
            <span className="outline-text">W biznesie, w technologii i w pracy ludzi.</span>
          </p>
        </Reveal>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="relative overflow-hidden px-6 pb-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-lime px-8 py-20 text-ink md:px-16 md:py-28">
          <div className="pointer-events-none absolute -right-20 -bottom-24 font-display text-[22rem] leading-none font-extrabold opacity-10">AK</div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[.3em]">Kontakt</p>
            <h2 className="mt-4 font-display text-[3.2rem] font-extrabold tracking-tight md:text-9xl">Pogadajmy.</h2>
            <p className="mt-6 max-w-md text-lg text-ink/70">Masz flotę, firmę albo pomysł? Jeden telefon wystarczy, żeby sprawdzić, czy możemy coś razem zrobić.</p>
            <a href={TEL} className="group mt-10 inline-flex items-center gap-4 rounded-full bg-ink px-6 py-4 font-display text-xl font-bold whitespace-nowrap text-lime transition hover:scale-105 md:px-8 md:py-5 md:text-4xl">
              {PHONE} <Arrow />
            </a>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
