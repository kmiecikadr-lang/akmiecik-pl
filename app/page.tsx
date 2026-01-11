import ForestBackground from '@/components/ForestBackground'
export default function Home() {
  return (
    <>
    <ForestBackground />
      {/* SEKCJA 1: Hero */}
   {/* SEKCJA 1: Hero */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Adrian Kmiecik
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed">
            Lubię, gdy rzeczy działają. W biznesie, w technologii i w pracy ludzi.
          </p>
          <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            Buduję relacje z klientami, rozwijam projekty technologiczne i uczę, jak pracować bezpiecznie.
          </p>
          <div className="text-slate-500 text-sm animate-bounce">
            ↓ wchodzisz dalej?
          </div>
        </div>
      </section>

      {/* SEKCJA 2: Placeholder */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Sekcja 2
          </h2>
          <p className="text-xl text-slate-300">
            Tutaj będzie portfolio
          </p>
        </div>
      </section>

      {/* SEKCJA 3: Placeholder */}
     <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Sekcja 3
          </h2>
          <p className="text-xl text-slate-300">
            Tutaj będzie blog
          </p>
        </div>
      </section>

      {/* SEKCJA 4: Placeholder */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Sekcja 4
          </h2>
          <p className="text-xl text-slate-300">
            Tutaj będzie kontakt
          </p>
        </div>
      </section>
    </>
  )
}