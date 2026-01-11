'use client'

export default function ForestBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Tło - ciemny las */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1b2a] to-[#000000]" />
      
      {/* Gwiazdy */}
      <div className="absolute inset-0">
  {[
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

    /* DODATKOWE GWIAZDY (więcej niż wcześniej) */
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
    { left: '6%', top: '42%', o: 0.65 },
    { left: '16%', top: '38%', o: 0.75 },
    { left: '26%', top: '52%', o: 0.60 },
    { left: '36%', top: '44%', o: 0.70 },
    { left: '46%', top: '56%', o: 0.55 },
    { left: '56%', top: '40%', o: 0.65 },
    { left: '66%', top: '54%', o: 0.75 },
    { left: '76%', top: '50%', o: 0.60 },
    { left: '86%', top: '58%', o: 0.70 },
    { left: '94%', top: '52%', o: 0.55 },
  ].map((s, i) => {
    const group = i % 2 === 0 ? 'star-a' : 'star-b';
    const speed = i % 5 === 0 ? 'star-slow' : i % 7 === 0 ? 'star-fast' : '';
    return (
      <div
        key={`${s.left}-${s.top}-${i}`}
        className={`absolute w-1 h-1 bg-white rounded-full star ${group} ${speed}`}
        style={{ left: s.left, top: s.top, opacity: s.o }}
      />
    );
  })}
</div>

      
      {/* Mgła */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-900/20 to-transparent" />
      
      {/* Drzewa - warstwa daleka */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-30">
        <svg viewBox="0 0 1440 800" className="w-full h-full" preserveAspectRatio="none">
          {/* Duże drzewo lewy */}
          <ellipse cx="200" cy="600" rx="80" ry="200" fill="#1a2332" opacity="0.6" />
          <ellipse cx="180" cy="500" rx="60" ry="150" fill="#0f1620" opacity="0.4" />
          
          {/* Grupa środek */}
          <ellipse cx="600" cy="650" rx="100" ry="180" fill="#1a2332" opacity="0.7" />
          <ellipse cx="700" cy="680" rx="90" ry="160" fill="#0f1620" opacity="0.5" />
          <ellipse cx="800" cy="640" rx="85" ry="170" fill="#1a2332" opacity="0.6" />
          
          {/* Duże drzewo prawy */}
          <ellipse cx="1240" cy="620" rx="95" ry="210" fill="#1a2332" opacity="0.6" />
          <ellipse cx="1260" cy="520" rx="70" ry="160" fill="#0f1620" opacity="0.4" />
        </svg>
      </div>
      
      {/* Drzewa - warstwa środkowa */}
      <div className="absolute bottom-0 left-0 right-0 h-[75%] opacity-50">
        <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="none">
          {/* Lewy brzeg */}
          <ellipse cx="100" cy="700" rx="90" ry="240" fill="#2C3E50" />
          <ellipse cx="80" cy="600" rx="70" ry="180" fill="#1a2f3d" />
          
          <ellipse cx="350" cy="720" rx="100" ry="220" fill="#2C3E50" />
          <ellipse cx="450" cy="750" rx="85" ry="200" fill="#1a2f3d" />
          
          {/* Środek */}
          <ellipse cx="720" cy="740" rx="110" ry="250" fill="#2C3E50" />
          
          {/* Prawy brzeg */}
          <ellipse cx="1000" cy="730" rx="95" ry="230" fill="#2C3E50" />
          <ellipse cx="1150" cy="750" rx="100" ry="210" fill="#1a2f3d" />
          
          <ellipse cx="1340" cy="710" rx="90" ry="240" fill="#2C3E50" />
          <ellipse cx="1360" cy="610" rx="75" ry="190" fill="#1a2f3d" />
        </svg>
      </div>
      
      {/* Drzewa - pierwszy plan (boki ekranu) */}
      <div className="absolute bottom-0 left-0 right-0 h-full opacity-80">
        <svg viewBox="0 0 1440 1080" className="w-full h-full" preserveAspectRatio="none">
          {/* Wielkie drzewo lewy */}
          <ellipse cx="0" cy="800" rx="150" ry="350" fill="#1e3a4a" />
          <ellipse cx="-20" cy="650" rx="120" ry="280" fill="#152838" />
          
          {/* Wielkie drzewo prawy */}
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
  )
}