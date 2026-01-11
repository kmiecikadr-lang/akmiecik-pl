'use client'

import { useEffect, useMemo, useState } from 'react'

function isNightByHour(hour: number) {
  // NOC: 18:00–05:59
  return hour >= 18 || hour < 6
}

export default function ForestBackground() {
  const [isNight, setIsNight] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const night = isNightByHour(now.getHours())
      setIsNight(night)

      // >>> TO ZMIENIA KOLORY NAPISÓW (na całej stronie)
      document.body.classList.toggle('theme-night', night)
      document.body.classList.toggle('theme-day', !night)
    }

    update()
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [])

  const stars = useMemo(
    () => [
      { left: '5%', top: '10%', o: 0.7 },
      { left: '15%', top: '20%', o: 0.5 },
      { left: '25%', top: '5%', o: 0.8 },
      { left: '35%', top: '25%', o: 0.6 },
      { left: '45%', top: '15%', o: 0.7 },
      { left: '55%', top: '8%', o: 0.9 },
      { left: '65%', top: '30%', o: 0.5 },
      { left: '75%', top: '12%', o: 0.75 },
      { left: '85%', top: '22%', o: 0.65 },
      { left: '95%', top: '18%', o: 0.8 },
      { left: '10%', top: '35%', o: 0.7 },
      { left: '20%', top: '45%', o: 0.6 },
      { left: '30%', top: '40%', o: 0.85 },
      { left: '40%', top: '50%', o: 0.55 },
      { left: '50%', top: '35%', o: 0.75 },
      { left: '60%', top: '48%', o: 0.65 },
      { left: '70%', top: '42%', o: 0.8 },
      { left: '80%', top: '38%', o: 0.7 },
      { left: '90%', top: '46%', o: 0.9 },
      { left: '12%', top: '55%', o: 0.6 },

      { left: '8%', top: '18%', o: 0.55 },
      { left: '18%', top: '8%', o: 0.65 },
      { left: '22%', top: '28%', o: 0.5 },
      { left: '28%', top: '18%', o: 0.75 },
      { left: '33%', top: '10%', o: 0.6 },
      { left: '38%', top: '6%', o: 0.7 },
      { left: '42%', top: '32%', o: 0.55 },
      { left: '48%', top: '26%', o: 0.65 },
      { left: '52%', top: '18%', o: 0.8 },
      { left: '58%', top: '22%', o: 0.6 },
      { left: '62%', top: '12%', o: 0.7 },
      { left: '68%', top: '8%', o: 0.55 },
      { left: '72%', top: '28%', o: 0.65 },
      { left: '78%', top: '20%', o: 0.75 },
      { left: '82%', top: '8%', o: 0.6 },
      { left: '88%', top: '14%', o: 0.7 },
      { left: '92%', top: '30%', o: 0.55 },
      { left: '6%', top: '42%', o: 0.65 },
      { left: '16%', top: '38%', o: 0.75 },
      { left: '26%', top: '52%', o: 0.6 },
      { left: '36%', top: '44%', o: 0.7 },
      { left: '46%', top: '56%', o: 0.55 },
      { left: '56%', top: '40%', o: 0.65 },
      { left: '66%', top: '54%', o: 0.75 },
      { left: '76%', top: '50%', o: 0.6 },
      { left: '86%', top: '58%', o: 0.7 },
      { left: '94%', top: '52%', o: 0.55 },
    ],
    []
  )

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* ===================== NOC ===================== */}
      <div
        className={[
          'absolute inset-0 transition-opacity duration-700',
          isNight ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {/* Tło - ciemny las */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1b2a] to-[#000000]" />

        {/* Gwiazdy */}
        <div className="absolute inset-0">
          {stars.map((s, i) => {
            const group = i % 2 === 0 ? 'star-a' : 'star-b'
            const speed = i % 5 === 0 ? 'star-slow' : i % 7 === 0 ? 'star-fast' : ''
            return (
              <div
                key={`${s.left}-${s.top}-${i}`}
                className={`absolute w-1 h-1 bg-white rounded-full star ${group} ${speed}`}
                style={{ left: s.left, top: s.top, opacity: s.o }}
              />
            )
          })}
        </div>

        {/* Mgła */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-900/20 to-transparent" />

        {/* Drzewa - warstwa daleka */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-30">
          <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="200" cy="600" rx="80" ry="200" fill="#1a2332" opacity="0.6" />
            <ellipse cx="180" cy="500" rx="60" ry="150" fill="#0f1620" opacity="0.4" />

            <ellipse cx="600" cy="650" rx="100" ry="180" fill="#1a2332" opacity="0.7" />
            <ellipse cx="700" cy="680" rx="90" ry="160" fill="#0f1620" opacity="0.5" />
            <ellipse cx="800" cy="640" rx="85" ry="170" fill="#1a2332" opacity="0.6" />

            <ellipse cx="1240" cy="620" rx="95" ry="210" fill="#1a2332" opacity="0.6" />
            <ellipse cx="1260" cy="520" rx="70" ry="160" fill="#0f1620" opacity="0.4" />
          </svg>
        </div>

        {/* Drzewa - warstwa środkowa */}
        <div className="absolute bottom-0 left-0 right-0 h-[75%] opacity-50">
          <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="100" cy="700" rx="90" ry="240" fill="#2C3E50" />
            <ellipse cx="80" cy="600" rx="70" ry="180" fill="#1a2f3d" />

            <ellipse cx="350" cy="720" rx="100" ry="220" fill="#2C3E50" />
            <ellipse cx="450" cy="750" rx="85" ry="200" fill="#1a2f3d" />

            <ellipse cx="720" cy="740" rx="110" ry="250" fill="#2C3E50" />

            <ellipse cx="1000" cy="730" rx="95" ry="230" fill="#2C3E50" />
            <ellipse cx="1150" cy="750" rx="100" ry="210" fill="#1a2f3d" />

            <ellipse cx="1340" cy="710" rx="90" ry="240" fill="#2C3E50" />
            <ellipse cx="1360" cy="610" rx="75" ry="190" fill="#1a2f3d" />
          </svg>
        </div>

        {/* Drzewa - pierwszy plan (boki ekranu) */}
        <div className="absolute bottom-0 left-0 right-0 h-full opacity-80">
          <svg viewBox="0 0 1440 1080" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="0" cy="800" rx="150" ry="350" fill="#1e3a4a" />
            <ellipse cx="-20" cy="650" rx="120" ry="280" fill="#152838" />

            <ellipse cx="1440" cy="820" rx="160" ry="360" fill="#1e3a4a" />
            <ellipse cx="1460" cy="670" rx="130" ry="290" fill="#152838" />
          </svg>
        </div>

        {/* Ścieżka światła */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-600/5 via-amber-500/3 to-transparent blur-3xl" />
        </div>

        {/* Subtelna poświata u dołu */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-amber-950/10 to-transparent" />
      </div>

      {/* ===================== DZIEŃ ===================== */}
      <div
        className={[
          'absolute inset-0 transition-opacity duration-700',
          isNight ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        {/* Niebieskie niebo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8fd3ff] via-[#cfefff] to-[#f7fbff]" />

        {/* Słońce */}
        <div className="absolute left-[12%] top-[12%] h-28 w-28 rounded-full bg-[#ffd36b] sun-glow" />
        <div className="absolute left-[12%] top-[12%] h-44 w-44 rounded-full bg-[#ffd36b] opacity-30 blur-2xl" />

        {/* Chmurki */}
        <div className="absolute top-[16%] left-[42%] h-10 w-28 rounded-full bg-white/60 blur-md" />
        <div className="absolute top-[24%] left-[62%] h-8 w-24 rounded-full bg-white/55 blur-md" />
        <div className="absolute top-[12%] left-[70%] h-12 w-36 rounded-full bg-white/45 blur-md" />
        <div className="absolute top-[22%] left-[18%] h-9 w-26 rounded-full bg-white/45 blur-md" />

        {/* Lekka "mgiełka" dzienna */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />

        {/* Drzewa DZIEŃ - te same elipsy, ale zielone */}

        {/* Drzewa - warstwa daleka */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-30">
          <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="200" cy="600" rx="80" ry="200" fill="#2f6b3a" opacity="0.55" />
            <ellipse cx="180" cy="500" rx="60" ry="150" fill="#234f2c" opacity="0.4" />

            <ellipse cx="600" cy="650" rx="100" ry="180" fill="#2f6b3a" opacity="0.6" />
            <ellipse cx="700" cy="680" rx="90" ry="160" fill="#234f2c" opacity="0.45" />
            <ellipse cx="800" cy="640" rx="85" ry="170" fill="#2f6b3a" opacity="0.55" />

            <ellipse cx="1240" cy="620" rx="95" ry="210" fill="#2f6b3a" opacity="0.55" />
            <ellipse cx="1260" cy="520" rx="70" ry="160" fill="#234f2c" opacity="0.4" />
          </svg>
        </div>

        {/* Drzewa - warstwa środkowa */}
        <div className="absolute bottom-0 left-0 right-0 h-[75%] opacity-50">
          <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="100" cy="700" rx="90" ry="240" fill="#3f8a4b" />
            <ellipse cx="80" cy="600" rx="70" ry="180" fill="#2f6b3a" />

            <ellipse cx="350" cy="720" rx="100" ry="220" fill="#3f8a4b" />
            <ellipse cx="450" cy="750" rx="85" ry="200" fill="#2f6b3a" />

            <ellipse cx="720" cy="740" rx="110" ry="250" fill="#3f8a4b" />

            <ellipse cx="1000" cy="730" rx="95" ry="230" fill="#3f8a4b" />
            <ellipse cx="1150" cy="750" rx="100" ry="210" fill="#2f6b3a" />

            <ellipse cx="1340" cy="710" rx="90" ry="240" fill="#3f8a4b" />
            <ellipse cx="1360" cy="610" rx="75" ry="190" fill="#2f6b3a" />
          </svg>
        </div>

        {/* Drzewa - pierwszy plan (boki ekranu) */}
        <div className="absolute bottom-0 left-0 right-0 h-full opacity-80">
          <svg viewBox="0 0 1440 1080" className="w-full h-full" preserveAspectRatio="none">
            <ellipse cx="0" cy="800" rx="150" ry="350" fill="#2a6a3a" />
            <ellipse cx="-20" cy="650" rx="120" ry="280" fill="#1f4f2b" />

            <ellipse cx="1440" cy="820" rx="160" ry="360" fill="#2a6a3a" />
            <ellipse cx="1460" cy="670" rx="130" ry="290" fill="#1f4f2b" />
          </svg>
        </div>

        {/* Ścieżka światła - dzienna (jaśniejsza) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-300/10 via-yellow-200/5 to-transparent blur-3xl" />
        </div>

        {/* Subtelna poświata u dołu */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-yellow-200/10 to-transparent" />
      </div>
    </div>
  )
}
