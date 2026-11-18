const fs = require('fs');

function buildMapSvg(ship) {
  const destMap = {
    'Japan': {
      origin: { name: 'Tanjung Perak Port', portCode: 'IDSUB', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩', x: 180, y: 350 },
      dest: { name: 'Port of Tokyo', portCode: 'JPTYO', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', x: 740, y: 95 },
      pathD: 'M 180 350 C 270 310, 360 270, 470 215 C 570 165, 660 130, 740 95',
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
      currentSea: 'Strait of Malacca (Waiting Bunkering Clearance)',
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
  const completedNm = Math.round(cfg.totalNm * t);

  return `
    <div class="route-map mb-24">
      <div class="route-map-header">
        <div class="flex items-center gap-12">
          <span class="ais-badge"><span class="ais-dot"></span> LIVE AIS MARITIME TRACKING</span>
          <span class="route-map-ship-tag"><strong>${ship.id}</strong> · ${ship.product}</span>
        </div>
        <div class="route-map-controls">
          <span style="font-size:12px; color:#10b981; font-weight:600;">${cfg.origin.city} (${cfg.origin.portCode}) ➔ ${cfg.dest.city} (${cfg.dest.portCode})</span>
        </div>
      </div>

      <div class="route-map-canvas-wrap">
        <svg viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#051c24"/>
              <stop offset="50%" stop-color="#0a2a34"/>
              <stop offset="100%" stop-color="#06171f"/>
            </linearGradient>
            <filter id="glowPath" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <pattern id="gridPat" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(16, 185, 129, 0.07)" stroke-width="1"/>
              <circle cx="60" cy="60" r="1.5" fill="rgba(16, 185, 129, 0.25)"/>
            </pattern>
            <radialGradient id="beamGrad" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Ocean background -->
          <rect width="900" height="440" fill="url(#oceanGrad)"/>
          <rect width="900" height="440" fill="url(#gridPat)"/>

          <!-- Latitude / Longitude lines & labels -->
          <g opacity="0.45" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4,4" font-size="10" fill="#64748b" font-family="monospace">
            <line x1="0" y1="90" x2="900" y2="90"/>
            <text x="12" y="86">35°N</text>
            <line x1="0" y1="180" x2="900" y2="180"/>
            <text x="12" y="176">20°N (TROPIC OF CANCER)</text>
            <line x1="0" y1="270" x2="900" y2="270"/>
            <text x="12" y="266">05°N</text>
            <line x1="0" y1="350" x2="900" y2="350"/>
            <text x="12" y="346">08°S (JAVA SEA)</text>
            <line x1="200" y1="0" x2="200" y2="440"/>
            <text x="204" y="430">110°E</text>
            <line x1="440" y1="0" x2="440" y2="440"/>
            <text x="444" y="430">125°E</text>
            <line x1="680" y1="0" x2="680" y2="440"/>
            <text x="684" y="430">140°E</text>
          </g>

          <!-- Compass Rose -->
          <g transform="translate(840, 50)" opacity="0.65">
            <circle r="22" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <circle r="12" fill="none" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
            <polygon points="0,-20 4,-5 0,0 -4,-5" fill="#10b981"/>
            <polygon points="0,20 4,5 0,0 -4,5" fill="rgba(255,255,255,0.3)"/>
            <polygon points="20,0 5,4 0,0 5,-4" fill="rgba(255,255,255,0.3)"/>
            <polygon points="-20,0 -5,4 0,0 -5,-4" fill="rgba(255,255,255,0.3)"/>
            <text x="-4" y="-24" font-size="9" font-weight="700" fill="#10b981">N</text>
          </g>

          <!-- Stylized Continents & Archipelago -->
          <g fill="#0e323d" stroke="#164e5f" stroke-width="1.2" opacity="0.95">
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
          </g>

          <!-- Sea Water Labels -->
          <g fill="rgba(16, 185, 129, 0.45)" font-size="11" font-weight="700" letter-spacing="0.12em" font-family="sans-serif">
            <text x="280" y="340">JAVA SEA</text>
            <text x="325" y="275">MAKASSAR STRAIT</text>
            <text x="460" y="210">PHILIPPINE SEA</text>
            <text x="680" y="165">PACIFIC OCEAN</text>
          </g>

          <!-- Full Sea Route (Dashed Guide) -->
          <path d="${cfg.pathD}" fill="none" stroke="rgba(255, 255, 255, 0.22)" stroke-width="3.5" stroke-dasharray="6,6"/>
          
          <!-- Animated Active Route Flow -->
          <path d="${cfg.pathD}" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="8,16" class="sea-route-flow" opacity="0.8"/>

          <!-- Origin Port (Tanjung Perak) -->
          <g transform="translate(${cfg.origin.x}, ${cfg.origin.y})">
            <circle r="18" fill="rgba(16, 185, 129, 0.25)">
              <animate attributeName="r" values="8;24" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            <circle r="8" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
            <!-- Origin Card -->
            <g transform="translate(-80, 16)">
              <rect width="160" height="36" rx="6" fill="rgba(5, 22, 28, 0.92)" stroke="rgba(16, 185, 129, 0.6)" stroke-width="1"/>
              <text x="10" y="16" fill="#ffffff" font-size="11" font-weight="700">${cfg.origin.flag} ${cfg.origin.name}</text>
              <text x="10" y="28" fill="#94a3b8" font-size="9.5">Dep: ${cfg.departed}</text>
            </g>
          </g>

          <!-- Destination Port -->
          <g transform="translate(${cfg.dest.x}, ${cfg.dest.y})">
            <circle r="18" fill="rgba(56, 189, 248, 0.25)">
              <animate attributeName="r" values="8;24" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            <circle r="8" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
            <!-- Destination Card -->
            <g transform="translate(-140, -42)">
              <rect width="165" height="36" rx="6" fill="rgba(5, 22, 28, 0.92)" stroke="rgba(56, 189, 248, 0.6)" stroke-width="1"/>
              <text x="10" y="16" fill="#ffffff" font-size="11" font-weight="700">${cfg.dest.flag} ${cfg.dest.name}</text>
              <text x="10" y="28" fill="#94a3b8" font-size="9.5">ETA: ${cfg.eta}</text>
            </g>
          </g>

          <!-- Live Cargo Vessel Marker -->
          <g transform="translate(${shipPos.x}, ${shipPos.y})">
            <!-- Sonar Pulse -->
            <circle r="22" fill="rgba(16, 185, 129, 0.35)">
              <animate attributeName="r" values="10;36" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.9;0" dur="2s" repeatCount="indefinite"/>
            </circle>

            <!-- Ship Heading Beam -->
            <g transform="rotate(${angle})">
              <polygon points="0,0 55,-18 55,18" fill="url(#beamGrad)"/>
            </g>

            <!-- Ship Icon Badge -->
            <circle r="14" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
            <!-- Cargo Ship SVG silhouette -->
            <g transform="translate(-8, -8) scale(0.68)">
              <path d="M4 14 L20 14 L18 20 L6 20 Z" fill="#ffffff"/>
              <rect x="7" y="9" width="3" height="4" fill="#ef4444"/>
              <rect x="11" y="9" width="3" height="4" fill="#3b82f6"/>
              <rect x="15" y="9" width="3" height="4" fill="#fbbf24"/>
              <rect x="17" y="6" width="2" height="7" fill="#ffffff"/>
            </g>

            <!-- Floating Vessel Tooltip Tag -->
            <g transform="translate(${shipPos.x > 500 ? -175 : 20}, -32)">
              <rect width="160" height="44" rx="6" fill="rgba(4, 18, 23, 0.95)" stroke="#10b981" stroke-width="1.2"/>
              <text x="10" y="16" fill="#34d399" font-size="11" font-weight="700">🚢 ${cfg.vessel}</text>
              <text x="10" y="28" fill="#e2e8f0" font-size="9.5">Speed: ${cfg.speed} · Hdg: ${cfg.heading}</text>
              <text x="10" y="38" fill="#94a3b8" font-size="9">${ship.progress}% completed (${completedNm} nm)</text>
            </g>
          </g>
        </svg>
      </div>

      <!-- Live Telemetry Footer Bar -->
      <div class="route-map-footer">
        <div class="stat-item">
          <span>PORT OF ORIGIN</span>
          <strong>${cfg.origin.city} (${cfg.origin.portCode})</strong>
          <span style="font-size:11px; color:#64748b;">${cfg.departed}</span>
        </div>
        <div class="stat-item">
          <span>CURRENT AIS POSITION</span>
          <strong>${cfg.currentSea.split('(')[0]}</strong>
          <span style="font-size:11px; color:#10b981;">● Online (AIS Class-A)</span>
        </div>
        <div class="stat-item">
          <span>PORT OF DISCHARGE</span>
          <strong>${cfg.dest.city} (${cfg.dest.portCode})</strong>
          <span style="font-size:11px; color:#64748b;">ETA: ${cfg.eta}</span>
        </div>
        <div class="stat-item">
          <span>VOYAGE PROGRESS</span>
          <strong>${ship.progress}% · ${completedNm} / ${cfg.totalNm} nm</strong>
          <span style="font-size:11px; color:#10b981;">Speed: ${cfg.speed}</span>
        </div>
      </div>
    </div>
  `;
}

const testShip = { id: 'EXP-001', product: 'Arabica Coffee', destination: 'Japan', progress: 65, status: 'In Transit' };
const html = buildMapSvg(testShip);
console.log('HTML built successfully! Total characters:', html.length);
console.log('Includes SVG:', html.includes('<svg viewBox="0 0 900 440"'));
console.log('Includes Tanjung Perak:', html.includes('Tanjung Perak'));
console.log('Includes Tokyo Port:', html.includes('Tokyo'));
