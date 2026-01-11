'use client'

export default function ForestBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Tło - ciemny las */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1b2a] to-[#000000]" />
      
      {/* Gwiazdy */}
      <div className="absolute inset-0">
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{left: '5%', top: '10%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-50" style={{left: '15%', top: '20%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-80" style={{left: '25%', top: '5%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" style={{left: '35%', top: '25%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{left: '45%', top: '15%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-90" style={{left: '55%', top: '8%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-50" style={{left: '65%', top: '30%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-75" style={{left: '75%', top: '12%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-65" style={{left: '85%', top: '22%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-80" style={{left: '95%', top: '18%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{left: '10%', top: '35%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" style={{left: '20%', top: '45%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-85" style={{left: '30%', top: '40%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-55" style={{left: '40%', top: '50%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-75" style={{left: '50%', top: '35%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-65" style={{left: '60%', top: '48%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-80" style={{left: '70%', top: '42%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70" style={{left: '80%', top: '38%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-90" style={{left: '90%', top: '46%'}} />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-60" style={{left: '12%', top: '55%'}} />
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