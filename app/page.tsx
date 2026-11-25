import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Spot from "@/components/Spot";

const PHONE = "+48 788 441 244";
const TEL = "tel:+48788441244";

const marquee = ["Daimler Truck", "Scania", "Volvo", "ZTE", "Sprzedaż B2B", "Key Account Management", "SaaS", "BHP", "AI", "Produkty cyfrowe"];

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

export default function Home() {
  return (
    <main className="grain relative overflow-x-clip">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-ink/60 px-5 py-3 backdrop-blur-xl">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
            AK<span className="text-lime">.</span>
          </a>
          <div className="hidden gap-8 text-sm text-mist md:flex">
            <a href="#projekty" className="transition hover:text-white">Projekty</a>
            <a href="#doswiadczenie" className="transition hover:text-white">Doświadczenie</a>
            <a href="#kontakt" className="transition hover:text-white">Kontakt</a>
          </div>
          <a href={TEL} className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:scale-105">
            Zadzwoń
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-16">
        <div className="aurora"><span className="a1" /><span className="a2" /><span className="a3" /></div>
        <div className="grid-lines absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist backdrop-blur">
              <span className="pulse-dot h-2 w-2 rounded-full bg-lime" /> Key Account Manager · Daimler Truck Retail Polska
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[19vw] leading-[.82] font-extrabold tracking-[-.05em] md:text-[11rem]">
              Adrian<br /><span className="text-shine">Kmiecik</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-10 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Sprzedaż B2B w branży ciężarowej.<br /><span className="text-lime">Własne projekty cyfrowe.</span>
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              Ponad 8 lat doświadczenia w sprzedaży części i usług serwisowych dla flot i firm transportowych — w Daimler Truck, Scanii i Volvo. Równolegle rozwijam własne projekty: Smilerate, iAtlas i dbajOBHP.
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
          {[...marquee, ...marquee].map((m, i) => (
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
            { n: 4, s: "", t: "firmy w CV — od Scanii po Daimler" },
            { n: 3, s: "", t: "własne produkty w grze" },
            { n: 100, s: "%", t: "zaangażowania w każdy temat" },
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
              <Spot className="h-full p-8">
                <Tag>Laboratorium</Tag>
                <h3 className="mt-16 font-display text-3xl font-bold">AI w praktyce</h3>
                <p className="mt-3 text-mist">MediFind, monitoring publikacji naukowych, automatyzacje sprzedaży. Prototypy, na których sprawdzam nowe pomysły, zanim staną się produktem.</p>
              </Spot>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DOŚWIADCZENIE */}
      <section id="doswiadczenie" className="relative overflow-hidden border-y border-white/10 px-6 py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2">
          <Reveal>
            <p className="text-sm uppercase tracking-[.3em] text-lime">Na etacie</p>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-6xl">Key Account Manager</h2>
            <p className="mt-4 text-xl text-white/80">Daimler Truck Retail Polska · Ruda Śląska</p>
            <p className="mt-6 max-w-md leading-relaxed text-mist">
              Sprzedaż części i usług serwisowych dla flot ciężarowych. Relacje z klientami, programy lojalnościowe, oferty serwisowe szyte pod potrzeby firmy.
            </p>
          </Reveal>
          <div className="space-y-4">
            {[
              { f: "Daimler Truck Retail Polska", r: "KAM · części i serwis", now: true },
              { f: "Scania", r: "branża ciężarowa" },
              { f: "Volvo", r: "branża ciężarowa" },
              { f: "ZTE Katowice", r: "" },
            ].map((x, i) => (
              <Reveal key={x.f} delay={i * 100}>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 px-6 py-5 transition hover:border-lime/40 hover:bg-white/[.03]">
                  <div>
                    <p className="font-display text-xl font-bold">{x.f}</p>
                    {x.r && <p className="text-sm text-mist">{x.r}</p>}
                  </div>
                  {x.now && <Tag live>Teraz</Tag>}
                </div>
              </Reveal>
            ))}
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
        <footer className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-between gap-4 text-sm text-mist">
          <span>© {new Date().getFullYear()} Adrian Kmiecik</span>
          <span>Ruda Śląska · Śląsk</span>
        </footer>
      </section>
    </main>
  );
}
