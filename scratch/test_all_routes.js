const fs = require('fs');

const ROUTE_CONFIGS = {
  'Japan': {
    origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 180, y: 350 },
    dest: { name: 'Port of Tokyo', portCode: 'JPTYO', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', x: 740, y: 95 },
    pathD: 'M 180 350 C 360 270, 570 165, 740 95',
    p0: {x: 180, y: 350}, p1: {x: 360, y: 270}, p2: {x: 570, y: 165}, p3: {x: 740, y: 95},
    seaLane: 'North-East Asia Maritime Corridor · Philippine Sea Route',
    totalNm: 4500,
    vessel: 'MV Meratus Nusantara',
    vesselType: 'Post-Panamax (4,800 TEU)',
    currentSea: 'Philippine Sea (18° 14\' N, 126° 40\' E)',
    speed: '18.2 kts',
    heading: '034° NE',
    eta: 'Oct 28, 11:00 JST',
    departed: 'Oct 18, 14:20 WIB',
    isDelivered: false,
    landmasses: `
      <!-- Sumatra -->
      <path d="M 60 260 Q 110 290 140 330 Q 115 350 75 320 Q 50 280 60 260 Z"/>
      <!-- Java -->
      <path d="M 130 345 Q 220 350 265 355 Q 260 375 160 370 Q 125 365 130 345 Z"/>
      <!-- Kalimantan / Borneo -->
      <path d="M 170 230 Q 250 210 280 260 Q 235 305 180 285 Q 160 255 170 230 Z"/>
      <!-- Sulawesi -->
      <path d="M 300 235 Q 330 215 345 240 Q 335 300 310 295 Q 290 270 300 235 Z"/>
      <!-- Philippines -->
      <path d="M 365 155 Q 400 145 410 195 Q 395 245 370 215 Q 355 180 365 155 Z"/>
      <!-- Taiwan -->
      <path d="M 435 125 Q 455 115 460 135 Q 445 150 435 125 Z"/>
      <!-- Malay Peninsula & Indochina -->
      <path d="M 70 140 Q 120 150 130 220 Q 100 240 70 180 Z"/>
      <!-- East Asia Mainland / China -->
      <path d="M 240 60 Q 400 70 450 110 Q 390 150 330 140 Q 240 120 240 60 Z"/>
      <!-- Korea -->
      <path d="M 500 55 Q 525 45 535 85 Q 515 95 500 55 Z"/>
      <!-- Japan Archipelago -->
      <path d="M 560 110 Q 640 85 750 70 Q 770 85 730 110 Q 640 120 580 135 Z"/>
    `,
    seaLabels: `
      <text x="280" y="340">JAVA SEA</text>
      <text x="325" y="275">MAKASSAR STRAIT</text>
      <text x="460" y="210">PHILIPPINE SEA</text>
      <text x="680" y="165">PACIFIC OCEAN</text>
    `
  },
  'Germany': {
    origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 740, y: 340 },
    dest: { name: 'Port of Hamburg', portCode: 'DEHAM', city: 'Hamburg', country: 'Germany', flag: '🇩🇪', x: 175, y: 85 },
    pathD: 'M 740 340 C 530 275, 315 165, 175 85',
    p0: {x: 740, y: 340}, p1: {x: 530, y: 275}, p2: {x: 315, y: 165}, p3: {x: 175, y: 85},
    seaLane: 'Asia-Europe Trade Route · Suez / North Sea Express',
    totalNm: 8400,
    vessel: 'Hapag-Lloyd Berlin',
    vesselType: 'Ultra Large Container Vessel (15,000 TEU)',
    currentSea: 'Elbe River Approach (Hamburg)',
    speed: '0.0 kts (Docked)',
    heading: 'At Berth',
    eta: 'Delivered (Oct 15, 2026)',
    departed: 'Sep 22, 08:30 WIB',
    isDelivered: true,
    landmasses: `
      <!-- Western & Central Europe -->
      <path d="M 90 50 Q 220 40 260 90 Q 230 130 170 125 Q 110 120 90 50 Z"/>
      <!-- British Isles -->
      <path d="M 125 55 Q 150 45 155 75 Q 130 85 125 55 Z"/>
      <!-- Mediterranean & North Africa -->
      <path d="M 130 145 Q 260 135 340 165 Q 310 210 190 200 Q 130 190 130 145 Z"/>
      <!-- Arabian Peninsula & Red Sea Corridor -->
      <path d="M 330 170 Q 410 175 420 230 Q 370 250 340 205 Z"/>
      <!-- Indian Subcontinent -->
      <path d="M 460 180 Q 530 185 510 250 Q 475 260 455 210 Z"/>
      <!-- Southeast Asia & Sunda Shelf -->
      <path d="M 640 250 Q 720 260 780 310 Q 780 365 690 365 Q 630 320 640 250 Z"/>
    `,
    seaLabels: `
      <text x="120" y="105">NORTH SEA</text>
      <text x="210" y="160">MEDITERRANEAN</text>
      <text x="360" y="220">RED SEA / SUEZ</text>
      <text x="490" y="285">INDIAN OCEAN</text>
      <text x="680" y="340">JAVA SEA</text>
    `
  },
  'Netherlands': {
    origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 740, y: 340 },
    dest: { name: 'Port of Rotterdam', portCode: 'NLRTM', city: 'Rotterdam', country: 'Netherlands', flag: '🇳🇱', x: 165, y: 95 },
    pathD: 'M 740 340 C 520 270, 300 162, 165 95',
    p0: {x: 740, y: 340}, p1: {x: 520, y: 270}, p2: {x: 300, y: 162}, p3: {x: 165, y: 95},
    seaLane: 'Trans-Oceanic Asia-Rotterdam Gateway',
    totalNm: 8650,
    vessel: 'Maersk Mc-Kinney',
    vesselType: 'Triple-E Container Ship (18,270 TEU)',
    currentSea: 'Indian Ocean Westbound (04° 10\' N, 78° 22\' E)',
    speed: '19.4 kts',
    heading: '285° WNW',
    eta: 'Nov 02, 16:30 CET',
    departed: 'Oct 26, 11:00 WIB',
    isDelivered: false,
    landmasses: `
      <!-- Western & Central Europe -->
      <path d="M 90 50 Q 220 40 260 90 Q 230 130 170 125 Q 110 120 90 50 Z"/>
      <!-- British Isles -->
      <path d="M 125 55 Q 150 45 155 75 Q 130 85 125 55 Z"/>
      <!-- Mediterranean & North Africa -->
      <path d="M 130 145 Q 260 135 340 165 Q 310 210 190 200 Q 130 190 130 145 Z"/>
      <!-- Arabian Peninsula & Red Sea Corridor -->
      <path d="M 330 170 Q 410 175 420 230 Q 370 250 340 205 Z"/>
      <!-- Indian Subcontinent -->
      <path d="M 460 180 Q 530 185 510 250 Q 475 260 455 210 Z"/>
      <!-- Southeast Asia & Sunda Shelf -->
      <path d="M 640 250 Q 720 260 780 310 Q 780 365 690 365 Q 630 320 640 250 Z"/>
    `,
    seaLabels: `
      <text x="110" y="105">NORTH SEA</text>
      <text x="210" y="160">MEDITERRANEAN</text>
      <text x="360" y="220">RED SEA / SUEZ</text>
      <text x="490" y="285">INDIAN OCEAN</text>
      <text x="680" y="340">JAVA SEA</text>
    `
  },
  'India': {
    origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 720, y: 340 },
    dest: { name: 'JNPT Mumbai Port', portCode: 'INNSA', city: 'Mumbai', country: 'India', flag: '🇮🇳', x: 200, y: 130 },
    pathD: 'M 720 340 C 500 260, 295 165, 200 130',
    p0: {x: 720, y: 340}, p1: {x: 500, y: 260}, p2: {x: 295, y: 165}, p3: {x: 200, y: 130},
    seaLane: 'Southeast Asia - Indian Subcontinent Lane',
    totalNm: 3600,
    vessel: 'Ever Given Star',
    vesselType: 'Regional Feeder (3,500 TEU)',
    currentSea: 'Strait of Malacca (Waiting Bunkering Clearance)',
    speed: '4.1 kts',
    heading: '310° NW',
    eta: 'Delayed · Nov 05, 2026',
    departed: 'Oct 18, 16:00 WIB',
    isDelivered: false,
    landmasses: `
      <!-- Java & Bali -->
      <path d="M 670 340 Q 730 345 770 350 Q 765 365 680 360 Z"/>
      <!-- Sumatra -->
      <path d="M 600 245 Q 640 285 670 325 Q 650 340 610 305 Z"/>
      <!-- Malay Peninsula & Thailand -->
      <path d="M 580 150 Q 610 170 615 230 Q 590 240 570 190 Z"/>
      <!-- Indochina / Myanmar -->
      <path d="M 470 90 Q 570 95 580 150 Q 530 180 480 150 Z"/>
      <!-- Indian Subcontinent Peninsula -->
      <path d="M 140 70 L 320 70 Q 290 160 250 240 Q 235 245 220 210 Q 180 150 140 70 Z"/>
      <!-- Sri Lanka -->
      <path d="M 265 245 Q 285 240 285 270 Q 265 275 265 245 Z"/>
    `,
    seaLabels: `
      <text x="120" y="160">ARABIAN SEA</text>
      <text x="350" y="180">BAY OF BENGAL</text>
      <text x="510" y="240">ANDAMAN SEA</text>
      <text x="430" y="320">INDIAN OCEAN</text>
      <text x="680" y="335">JAVA SEA</text>
    `
  }
};

function cubic(p0, p1, p2, p3, param) {
  const cX = 3 * (p1.x - p0.x), bX = 3 * (p2.x - p1.x) - cX, aX = p3.x - p0.x - cX - bX;
  const cY = 3 * (p1.y - p0.y), bY = 3 * (p2.y - p1.y) - cY, aY = p3.y - p0.y - cY - bY;
  const x = (aX * Math.pow(param, 3)) + (bX * Math.pow(param, 2)) + (cX * param) + p0.x;
  const y = (aY * Math.pow(param, 3)) + (bY * Math.pow(param, 2)) + (cY * param) + p0.y;
  return { x: Math.round(x), y: Math.round(y) };
}

for (const [country, cfg] of Object.entries(ROUTE_CONFIGS)) {
  for (const p of [0, 25, 50, 65, 100]) {
    const t = p / 100;
    const pt = cubic(cfg.p0, cfg.p1, cfg.p2, cfg.p3, t);
    console.log(`${country} @ ${p}%: x=${pt.x}, y=${pt.y}`);
  }
}
