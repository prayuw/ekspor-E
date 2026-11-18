const destinations = ['Japan', 'Germany', 'Netherlands', 'India'];

const ROUTE_CONFIGS = {
  'Japan': {
    origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 180, y: 350 },
    dest: { name: 'Port of Tokyo', portCode: 'JPTYO', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', x: 740, y: 95 },
    pathD: 'M 180 350 C 270 310, 360 270, 470 215 C 570 165, 660 130, 740 95',
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

destinations.forEach(dest => {
  const cfg = ROUTE_CONFIGS[dest];
  console.log(`Checking route for ${dest}:`);
  console.log(`  Origin: (${cfg.origin.x}, ${cfg.origin.y}) -> Dest: (${cfg.dest.x}, ${cfg.dest.y})`);
  console.log(`  Path: ${cfg.pathD}`);
  console.log(`  Total NM: ${cfg.totalNm}`);
});
