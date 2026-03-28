import ForestBackground from '@/components/ForestBackground'

export default function Home() {
  return (
    <>
      <ForestBackground />
      
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
        <div className="max-w-5xl w-full space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-white">
            Moje Projekty
          </h2>
          
          <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-6 text-center">🚀</div>
            <h3 className="text-2xl font-bold mb-6 text-white text-center">Rozwijam:</h3>
            <div className="space-y-4">
              <a href="https://opinie-0kmn.onrender.com" target="_blank" rel="noopener noreferrer" className="block text-center">
                <p className="text-amber-400 hover:text-amber-300 text-lg transition-colors">
                  Raport Opinii w Twoim biurze
                </p>
              </a>
              <a href="https://iatlas.pl" target="_blank" rel="noopener noreferrer" className="block text-center">
                <p className="text-green-400 hover:text-green-300 text-lg transition-colors">
                  Zbuduj formę z naszym iatlas.pl
                </p>
              </a>
              <a href="https://dbajobhp.com.pl" target="_blank" rel="noopener noreferrer" className="block text-center">
                <p className="text-blue-400 hover:text-blue-300 text-lg transition-colors">
                  Zadbaj o bezpieczeństwo w swojej firmie - dbajobhp.com.pl
                </p>
              </a>
            </div>
          </div>

          <div className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4 text-center">💼</div>
            <h3 className="text-2xl font-bold mb-4 text-white text-center">Na etacie:</h3>
            <p className="text-blue-400 text-lg text-center">Daimler Truck Retail Polska o/Ruda Śląska</p>
          </div>

          <div className="text-center mt-12 flex items-center justify-center gap-4">
            <span className="text-slate-500 text-sm animate-bounce">↓</span>
            <span className="text-slate-500 text-sm animate-bounce" style={{animationDelay: '0.1s'}}>↓</span>
            <span className="text-slate-500 text-sm animate-bounce" style={{animationDelay: '0.2s'}}>↓</span>
            <span className="text-slate-500 text-base">wchodzisz dalej?</span>
            <span className="text-slate-500 text-sm animate-bounce" style={{animationDelay: '0.2s'}}>↓</span>
            <span className="text-slate-500 text-sm animate-bounce" style={{animationDelay: '0.1s'}}>↓</span>
            <span className="text-slate-500 text-sm animate-bounce">↓</span>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
        <div className="max-w-2xl w-full">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
            
            <p className="text-xl text-slate-300 leading-relaxed mb-4 text-center">
              Lubię, gdy rzeczy działają. W biznesie, w technologii i w pracy ludzi.
            </p>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-12 text-center">
              Buduję relacje z klientami, rozwijam projekty technologiczne i uczę, jak pracować bezpiecznie.
            </p>
            
            <div className="border-t border-slate-600 pt-8">
              <h2 className="text-3xl font-bold mb-8 text-white text-center">
                Pozostańmy w kontakcie
              </h2>
              
              <div className="text-center space-y-4">
                <p className="text-2xl font-medium text-slate-200">
                  Adrian Kmiecik
                </p>
                
                <a 
                  href="tel:+48788441244" 
                  className="inline-block bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500 text-green-400 hover:text-green-300 px-8 py-4 rounded-full text-2xl font-bold transition-all duration-300 hover:scale-105"
                >
                  +48 788 441 244
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}
