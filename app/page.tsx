import ForestBackground from '@/components/ForestBackground'

export default function Home() {
  return (
    <>
      <ForestBackground />
      
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

      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
        <div className="max-w-5xl w-full">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-white">
            Projekty
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Pracowałem nad:</h3>
              <a href="https://kiosk-daimler.onrender.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline text-lg">
                kiosk-daimler.onrender.com
              </a>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Rozwijam:</h3>
              <a href="https://dbajobhp.com.pl" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline text-lg">
                dbajobhp.com.pl
              </a>
            </div>

            <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Niedługo:</h3>
              <p className="text-purple-400 text-lg">AI - coming soon</p>
            </div>

          </div>
        </div>
      </section>

      <section id="kontakt" className="py-24 text-center relative z-10">
        <h2 className="text-2xl font-medium mb-6 text-white">📞 Pozostańmy w kontakcie</h2>
        <p className="text-lg text-slate-300 mb-4">Adrian</p>
        <a href="tel:+48788441244" className="text-green-400 hover:text-green-300 text-xl underline">
          +48 788 441 244
        </a>
      </section>
    </>
  )
}
