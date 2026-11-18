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
  }
};

function calculateCubicBezier(p0, p1, p2, p3, param) {
  const cX = 3 * (p1.x - p0.x), bX = 3 * (p2.x - p1.x) - cX, aX = p3.x - p0.x - cX - bX;
  const cY = 3 * (p1.y - p0.y), bY = 3 * (p2.y - p1.y) - cY, aY = p3.y - p0.y - cY - bY;
  const x = (aX * Math.pow(param, 3)) + (bX * Math.pow(param, 2)) + (cX * param) + p0.x;
  const y = (aY * Math.pow(param, 3)) + (bY * Math.pow(param, 2)) + (cY * param) + p0.y;
  return { x: Math.round(x), y: Math.round(y) };
}

const ship = { id: 'EXP-001', product: 'Arabica Coffee', destination: 'Japan', progress: 65, status: 'In Transit' };
const cfg = ROUTE_CONFIGS['Japan'];
const t = 0.65;
const shipPos = calculateCubicBezier(cfg.p0, cfg.p1, cfg.p2, cfg.p3, t);
const nextPos = calculateCubicBezier(cfg.p0, cfg.p1, cfg.p2, cfg.p3, Math.min(1, t + 0.02));
const angle = Math.round(Math.atan2(nextPos.y - shipPos.y, nextPos.x - shipPos.x) * 180 / Math.PI);
const completedNm = Math.round(cfg.totalNm * t);

const svgOutput = `
<div class="route-map mb-24">
  <div class="route-map-header">
    <div class="flex items-center gap-12">
      <span class="ais-badge"><span class="ais-dot"></span> LIVE AIS MARITIME TRACKING</span>
      <span class="route-map-ship-tag"><strong>${ship.id}</strong> · ${ship.product}</span>
    </div>
    <div class="route-map-controls">
      <span style="font-size:12px; color:#059669; font-weight:700;">${cfg.origin.city} (${cfg.origin.portCode}) ➔ ${cfg.dest.city} (${cfg.dest.portCode})</span>
    </div>
  </div>

  <div class="route-map-canvas-wrap">
    <svg viewBox="0 0 900 440" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="gridPat" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(14, 116, 144, 0.08)" stroke-width="1"/>
          <circle cx="60" cy="60" r="1.5" fill="rgba(14, 116, 144, 0.16)"/>
        </pattern>
        <radialGradient id="beamGrad" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
        </radialGradient>
        <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.12)"/>
        </filter>
      </defs>

      <!-- Clean light ocean background -->
      <rect width="900" height="440" fill="#eef7fb"/>
      <rect width="900" height="440" fill="url(#gridPat)"/>

      <!-- Latitude / Longitude lines & labels -->
      <g opacity="0.65" stroke="rgba(100, 116, 139, 0.2)" stroke-dasharray="4,4" font-size="10" fill="#64748b" font-family="monospace">
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
      <g transform="translate(840, 50)" opacity="0.85">
        <circle r="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="url(#cardShadow)"/>
        <circle r="12" fill="none" stroke="rgba(16,185,129,0.35)" stroke-width="1"/>
        <polygon points="0,-20 4,-5 0,0 -4,-5" fill="#059669"/>
        <polygon points="0,20 4,5 0,0 -4,5" fill="#94a3b8"/>
        <polygon points="20,0 5,4 0,0 5,-4" fill="#94a3b8"/>
        <polygon points="-20,0 -5,4 0,0 -5,-4" fill="#94a3b8"/>
        <text x="-4" y="-24" font-size="9" font-weight="700" fill="#059669">N</text>
      </g>

      <!-- Stylized Continents & Archipelago (Google Maps light style) -->
      <g fill="#ede8df" stroke="#cbd5e1" stroke-width="1.2" opacity="0.95">
        ${cfg.landmasses}
      </g>

      <!-- Sea Water Labels -->
      <g fill="#0284c7" opacity="0.65" font-size="11" font-weight="700" letter-spacing="0.12em" font-family="sans-serif">
        ${cfg.seaLabels}
      </g>

      <!-- Full Sea Route (Dashed Guide) -->
      <path d="${cfg.pathD}" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="6,6" opacity="0.45"/>
      
      <!-- Animated Active Route Flow -->
      <path d="${cfg.pathD}" fill="none" stroke="#059669" stroke-width="2.5" stroke-dasharray="8,16" class="sea-route-flow" opacity="0.9"/>

      <!-- Origin Port (Tanjung Perak) -->
      <g transform="translate(${cfg.origin.x}, ${cfg.origin.y})">
        <circle r="18" fill="rgba(16, 185, 129, 0.22)">
          <animate attributeName="r" values="8;24" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <circle r="8" fill="#059669" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Origin Card -->
        <g transform="translate(${cfg.origin.x > 500 ? -165 : 16}, 16)">
          <rect width="165" height="38" rx="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#cardShadow)"/>
          <text x="10" y="16" fill="#0f172a" font-size="11" font-weight="700">${cfg.origin.flag} ${cfg.origin.name}</text>
          <text x="10" y="30" fill="#64748b" font-size="9.5">Dep: ${cfg.departed}</text>
        </g>
      </g>

      <!-- Destination Port -->
      <g transform="translate(${cfg.dest.x}, ${cfg.dest.y})">
        <circle r="18" fill="rgba(2, 132, 199, 0.22)">
          <animate attributeName="r" values="8;24" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <circle r="8" fill="#0284c7" stroke="#ffffff" stroke-width="2.5"/>
        <!-- Destination Card -->
        <g transform="translate(${cfg.dest.x > 500 ? -175 : 16}, -42)">
          <rect width="165" height="38" rx="7" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" filter="url(#cardShadow)"/>
          <text x="10" y="16" fill="#0f172a" font-size="11" font-weight="700">${cfg.dest.flag} ${cfg.dest.name}</text>
          <text x="10" y="30" fill="#64748b" font-size="9.5">ETA: ${cfg.eta}</text>
        </g>
      </g>

      <!-- Live Cargo Vessel Marker -->
      <g transform="translate(${shipPos.x}, ${shipPos.y})">
        <!-- Sonar Pulse -->
        <circle r="22" fill="rgba(16, 185, 129, 0.28)">
          <animate attributeName="r" values="10;36" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0" dur="2s" repeatCount="indefinite"/>
        </circle>

        <!-- Ship Heading Beam -->
        <g transform="rotate(${angle})">
          <polygon points="0,0 55,-18 55,18" fill="url(#beamGrad)"/>
        </g>

        <!-- Ship Icon Badge -->
        <circle r="14" fill="#059669" stroke="#ffffff" stroke-width="2.5" filter="url(#cardShadow)"/>
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
          <rect width="165" height="46" rx="7" fill="#ffffff" stroke="#059669" stroke-width="1.2" filter="url(#cardShadow)"/>
          <text x="10" y="16" fill="#047857" font-size="11" font-weight="700">🚢 ${cfg.vessel}</text>
          <text x="10" y="29" fill="#1e293b" font-size="9.5">Speed: ${cfg.speed} · Hdg: ${cfg.heading}</text>
          <text x="10" y="40" fill="#64748b" font-size="9">${ship.progress}% completed (${completedNm} nm)</text>
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
      <span style="font-size:11px; color:#059669; font-weight:600;">● Online (AIS Class-A)</span>
    </div>
    <div class="stat-item">
      <span>PORT OF DISCHARGE</span>
      <strong>${cfg.dest.city} (${cfg.dest.portCode})</strong>
      <span style="font-size:11px; color:#64748b;">ETA: ${cfg.eta}</span>
    </div>
    <div class="stat-item">
      <span>VOYAGE PROGRESS</span>
      <strong>${ship.progress}% · ${completedNm} / ${cfg.totalNm} nm</strong>
      <span style="font-size:11px; color:#059669; font-weight:600;">Speed: ${cfg.speed}</span>
    </div>
  </div>
</div>
`;

console.log('SVG generated successfully. Length:', svgOutput.length);
