'use client';

import { useEffect, useMemo, useState } from 'react';

function isNightByHour(hour: number) {
  // NOC: 18:00–05:59
  return hour >= 18 || hour < 6;
}

export default function ForestBackground() {
  const [isNight, setIsNight] = useState(true);

  // Ustaw od razu po stronie klienta (żeby nie było różnic SSR/CSR)
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setIsNight(isNightByHour(now.getHours()));
    };

    update();

    // Odświeżaj raz na minutę (wystarczy, a jest lekkie)
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Te gwiazdy możesz edytować: dodaj więcej wpisów jeśli chcesz
  const stars = useMemo(
    () => [
      { left: '5%', top: '10%', o: 0.70 },
      { left: '15%', top: '20%', o: 0.50 },
      { left: '25%', top: '5%', o: 0.80 },
      { left: '35%', top: '25%', o: 0.60 },
      { left: '45%', top: '15%', o: 0.70 },
      { left: '55%', top: '8%', o: 0.90 },
      { left: '65%', top: '30%', o: 0.50 },
      { left: '75%', top: '12%', o: 0.75 },
      { left: '85%', top: '22%', o: 0.65 },
      { left: '95%', top: '18%', o: 0.80 },
      { left: '10%', top: '35%', o: 0.70 },
      { left: '20%', top: '45%', o: 0.60 },
      { left: '30%', top: '40%', o: 0.85 },
      { left: '40%', top: '50%', o: 0.55 },
      { left: '50%', top: '35%', o: 0.75 },
      { left: '60%', top: '48%', o: 0.65 },
      { left: '70%', top: '42%', o: 0.80 },
      { left: '80%', top: '38%', o: 0.70 },
      { left: '90%', top: '46%', o: 0.90 },
      { left: '12%', top: '55%', o: 0.60 },

      // dodatkowe (żeby było gęściej)
      { left: '8%', top: '18%', o: 0.55 },
      { left: '18%', top: '8%', o: 0.65 },
      { left: '22%', top: '28%', o: 0.50 },
      { left: '28%', top: '18%', o: 0.75 },
      { left: '33%', top: '10%', o: 0.60 },
      { left: '38%', top: '6%', o: 0.70 },
      { left: '42%', top: '32%', o: 0.55 },
      { left: '48%', top: '26%', o: 0.65 },
      { left: '52%', top: '18%', o: 0.80 },
      { left: '58%', top: '22%', o: 0.60 },
      { left: '62%', top: '12%', o: 0.70 },
      { left: '68%', top: '8%', o: 0.55 },
      { left: '72%', top: '28%', o: 0.65 },
      { left: '78%', top: '20%', o: 0.75 },
      { left: '82%', top: '8%', o: 0.60 },
      { left: '88%', top: '14%', o: 0.70 },
      { left: '92%', top: '30%', o: 0.55 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* WARSTWA: NIEBO (płynne przejście) */}
      <div
        className={[
          'absolute inset-0 transition-opacity duration-700',
          isNight ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {/* NOCNE NIEBO */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1b2a] to-[#06080f]" />

        {/* GWIAZDY */}
        <div className="absolute inset-0">
          {stars.map((s, i) => (
            <div
              key={`${s.left}-${s.top}-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full star"
              style={{ left: s.left, top: s.top, opacity: s.o }}
            />
          ))}
        </div>
      </div>

      <div
        className={[
          'absolute inset-0 transition-opacity duration-700',
          isNight ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        {/* DZIENNE NIEBO */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#bfe9ff] via-[#e8f7ff] to-[#f7fbff]" />

        {/* SŁOŃCE */}
        <div className="absolute left-[12%] top-[12%] h-28 w-28 rounded-full bg-[#ffd36b] blur-[0px] sun-glow" />
        <div className="absolute left-[12%] top-[12%] h-40 w-40 rounded-full bg-[#ffd36b] opacity-30 blur-2xl" />

        {/* lekkie "chmurki" (opcjonalne, bardzo subtelne) */}
        <div className="absolute top-[18%] left-[40%] h-10 w-28 rounded-full bg-white/40 blur-md" />
        <div className="absolute top-[26%] left-[62%] h-8 w-24 rounded-full bg-white/35 blur-md" />
        <div className="absolute top-[14%] left-[70%] h-12 w-36 rounded-full bg-white/30 blur-md" />
      </div>

      {/* WARSTWA: MGŁA / PRZYCIEMNIENIE DO DOŁU (zostaje, tylko w nocy mocniejsze) */}
      <div
        className={[
          'absolute inset-0 bg-gradient-to-t from-transparent via-slate-900/30 to-transparent transition-opacity duration-700',
          isNight ? 'opacity-100' : 'opacity-40',
        ].join(' ')}
      />

      {/* WARSTWA: DRZEWA (możesz zostawić swoje SVG; poniżej tylko przykład “koloru dnia/nocy”) */}
      <div
        className={[
          'absolute bottom-0 left-0 right-0 h-[60%] opacity-30 transition-opacity duration-700',
          isNight ? 'opacity-30' : 'opacity-18',
        ].join(' ')}
      >
        {/* Jeśli masz tu swoje SVG drzew, zostaw je bez zmian.
            Ten wrapper tylko zmienia intensywność w dzień/noc. */}
      </div>
    </div>
  );
}
