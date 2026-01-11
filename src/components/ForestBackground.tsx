'use client'

export default function ForestBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Tło gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-[#152238] to-[#0A0E1A]" />
      
      {/* Mgła */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,14,26,0.8)_100%)]" />
      
      {/* Drzewa w tle (daleko) */}
      <svg className="absolute bottom-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Drzewo 1 */}
          <polygon points="100,800 150,400 200,800" fill="#1a2332" />
          <polygon points="140,600 150,400 160,600" fill="#0f1620" />
          
          {/* Drzewo 2 */}
          <polygon points="300,800 380,300 460,800" fill="#1a2332" />
          <polygon points="360,500 380,300 400,500" fill="#0f1620" />
          
          {/* Drzewo 3 */}
          <polygon points="600,800 680,350 760,800" fill="#1a2332" />
          <polygon points="660,550 680,350 700,550" fill="#0f1620" />
          
          {/* Drzewo 4 */}
          <polygon points="900,800 980,400 1060,800" fill="#1a2332" />
          <polygon points="960,600 980,400 1000,600" fill="#0f1620" />
          
          {/* Drzewo 5 */}
          <polygon points="1200,800 1280,280 1360,800" fill="#1a2332" />
          <polygon points="1260,480 1280,280 1300,480" fill="#0f1620" />
        </g>
      </svg>
      
      {/* Drzewa w środku */}
      <svg className="absolute bottom-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Drzewo 1 */}
          <polygon points="200,900 260,250 320,900" fill="#2C3E50" />
          <rect x="255" y="900" width="10" height="100" fill="#1a2332" />
          
          {/* Drzewo 2 */}
          <polygon points="500,900 580,200 660,900" fill="#2C3E50" />
          <rect x="575" y="900" width="10" height="120" fill="#1a2332" />
          
          {/* Drzewo 3 */}
          <polygon points="800,900 880,280 960,900" fill="#2C3E50" />
          <rect x="875" y="900" width="10" height="100" fill="#1a2332" />
          
          {/* Drzewo 4 */}
          <polygon points="1100,900 1180,220 1260,900" fill="#2C3E50" />
          <rect x="1175" y="900" width="10" height="110" fill="#1a2332" />
        </g>
      </svg>
      
      {/* Drzewa na pierwszym planie (blisko) */}
      <svg className="absolute bottom-0 w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Drzewo 1 - lewy */}
          <polygon points="50,1000 120,100 190,1000" fill="#34495E" />
          <rect x="115" y="1000" width="15" height="150" fill="#2C3E50" />
          
          {/* Drzewo 2 - prawy */}
          <polygon points="1300,1000 1380,80 1460,1000" fill="#34495E" />
          <rect x="1375" y="1000" width="15" height="160" fill="#2C3E50" />
        </g>
      </svg>
      
      {/* Ścieżka światła (będzie animowana później) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-full bg-gradient-to-t from-amber-500/10 via-amber-400/5 to-transparent blur-3xl" />
    </div>
  )
}