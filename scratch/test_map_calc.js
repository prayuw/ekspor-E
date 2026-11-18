const fs = require('fs');

// Test generating the full map HTML for each shipment
function generateMapHtml(ship) {
  const destMap = {
    'Japan': {
      origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 180, y: 350 },
      dest: { name: 'Port of Tokyo', portCode: 'JPTYO', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', x: 740, y: 95 },
      pathD: 'M 180 350 C 270 310, 360 270, 470 215 C 570 165, 660 130, 740 95',
      p0: {x: 180, y: 350}, p1: {x: 360, y: 270}, p2: {x: 570, y: 165}, p3: {x: 740, y: 95},
      seaLane: 'North-East Asia Maritime Corridor · Philippine Sea Lane',
      totalNm: 4500,
      vessel: 'MV Meratus Nusantara',
      vesselType: 'Post-Panamax (4,800 TEU)',
      currentSea: 'Philippine Sea (18° 14\' N, 126° 40\' E)',
      speed: '18.2 kts',
      heading: '034° NE',
      eta: 'Oct 28, 11:00 JST',
      departed: 'Oct 18, 14:20 WIB',
      isDelivered: false
    },
    'Germany': {
      origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 740, y: 340 },
      dest: { name: 'Port of Hamburg', portCode: 'DEHAM', city: 'Hamburg', country: 'Germany', flag: '🇩🇪', x: 170, y: 90 },
      pathD: 'M 740 340 C 600 300, 460 250, 360 190 C 270 140, 210 110, 170 90',
      p0: {x: 740, y: 340}, p1: {x: 530, y: 275}, p2: {x: 315, y: 165}, p3: {x: 170, y: 90},
      seaLane: 'Asia-Europe Trade Route · Suez / North Sea Express',
      totalNm: 8400,
      vessel: 'Hapag-Lloyd Berlin',
      vesselType: 'Ultra Large Container Vessel (15,000 TEU)',
      currentSea: 'Elbe River Approach (Hamburg)',
      speed: '0.0 kts (Docked)',
      heading: 'At Berth',
      eta: 'Delivered (Oct 15, 2026)',
      departed: 'Sep 22, 08:30 WIB',
      isDelivered: true
    },
    'Netherlands': {
      origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 740, y: 340 },
      dest: { name: 'Port of Rotterdam', portCode: 'NLRTM', city: 'Rotterdam', country: 'Netherlands', flag: '🇳🇱', x: 165, y: 95 },
      pathD: 'M 740 340 C 590 295, 450 245, 340 185 C 260 140, 200 115, 165 95',
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
      isDelivered: false
    },
    'India': {
      origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 720, y: 340 },
      dest: { name: 'JNPT Mumbai Port', portCode: 'INNSA', city: 'Mumbai', country: 'India', flag: '🇮🇳', x: 190, y: 130 },
      pathD: 'M 720 340 C 560 290, 440 230, 330 180 C 260 150, 220 135, 190 130',
      p0: {x: 720, y: 340}, p1: {x: 500, y: 260}, p2: {x: 295, y: 165}, p3: {x: 190, y: 130},
      seaLane: 'Southeast Asia - Indian Subcontinent Lane',
      totalNm: 3600,
      vessel: 'Ever Given Star',
      vesselType: 'Regional Feeder (3,500 TEU)',
      currentSea: 'Strait of Malacca (Bunkering / Waiting Clearance)',
      speed: '4.1 kts',
      heading: '310° NW',
      eta: 'Delayed · Nov 05, 2026',
      departed: 'Oct 18, 16:00 WIB',
      isDelivered: false
    }
  };

  const cfg = destMap[ship.destination] || destMap['Japan'];
  const t = Math.max(0, Math.min(1, (ship.progress || 0) / 100));

  function cubic(p0, p1, p2, p3, param) {
    const cX = 3 * (p1.x - p0.x), bX = 3 * (p2.x - p1.x) - cX, aX = p3.x - p0.x - cX - bX;
    const cY = 3 * (p1.y - p0.y), bY = 3 * (p2.y - p1.y) - cY, aY = p3.y - p0.y - cY - bY;
    const x = (aX * Math.pow(param, 3)) + (bX * Math.pow(param, 2)) + (cX * param) + p0.x;
    const y = (aY * Math.pow(param, 3)) + (bY * Math.pow(param, 2)) + (cY * param) + p0.y;
    return { x: Math.round(x), y: Math.round(y) };
  }

  const shipPos = cubic(cfg.p0, cfg.p1, cfg.p2, cfg.p3, t);
  const nextPos = cubic(cfg.p0, cfg.p1, cfg.p2, cfg.p3, Math.min(1, t + 0.02));
  const angle = Math.round(Math.atan2(nextPos.y - shipPos.y, nextPos.x - shipPos.x) * 180 / Math.PI);

  console.log(`Shipment ${ship.id} (${ship.destination}) at ${ship.progress}%: Pos=(${shipPos.x}, ${shipPos.y}), Angle=${angle}deg`);
  return { cfg, shipPos, angle };
}

const testShips = [
  { id: 'EXP-001', product: 'Arabica Coffee', destination: 'Japan', progress: 65, status: 'In Transit' },
  { id: 'EXP-002', product: 'Robusta Coffee', destination: 'Germany', progress: 100, status: 'Delivered' },
  { id: 'EXP-003', product: 'Coconut Sugar', destination: 'Netherlands', progress: 40, status: 'In Transit' },
  { id: 'EXP-004', product: 'Palm Oil', destination: 'India', progress: 25, status: 'Delayed' }
];

testShips.forEach(s => generateMapHtml(s));
console.log('All calculations valid!');
