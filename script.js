/* ============================================
   EXPOR-E — script.js
   Vanilla JS · localStorage state management
   ============================================ */

/* ---------- STATE KEY ---------- */
const STATE_KEY = 'exporE_state_v1';

/* ---------- DEFAULT STATE ---------- */
const DEMO_USER = {
  id: 'dewi-001',
  name: 'Dewi',
  email: 'dewi@sarikopinusantara.id',
  password: 'demo123',
  role: 'umkm',
  business: {
    name: 'Sari Kopi Nusantara',
    type: 'UMKM',
    capacity: '2 Ton/month',
    exportExperience: 'None',
    commodity: 'Arabica Coffee',
    hsCode: '0901.21',
    currentMarket: 'Domestic',
    targetCountry: 'Japan',
    certifications: ['Halal']
  }
};

const DEMO_ADMIN = {
  id: 'admin-001',
  name: 'Budi Ekosistem',
  email: 'admin@expor-e.id',
  password: 'admin123',
  role: 'admin'
};

function defaultState() {
  return {
    users: [DEMO_USER, DEMO_ADMIN],
    currentUser: null,
    onboarding: {
      step: 1,
      completed: false,
      businessName: 'Sari Kopi Nusantara',
      businessType: 'UMKM',
      capacity: '2 Ton/month',
      exportExperience: 'None',
      commodity: 'Arabica Coffee',
      hsCode: '0901.21',
      valueAdd: 'Specialty grade, single origin, wet-hulled process',
      currentMarket: 'Domestic',
      targetCountry: 'Japan',
      certifications: ['Halal']
    },
    readiness: {
      score: 64,
      breakdown: {
        product: 82,
        documentation: 55,
        certification: 48,
        market: 70,
        digital: 65
      },
      detailed: [
        { area: 'Product Quality & Standards', score: 82, status: 'Good', rec: 'Maintain specialty grade consistency and continue cupping tests.' },
        { area: 'Export Documentation', score: 55, status: 'Fair', rec: 'Prepare Commercial Invoice, Packing List, and Certificate of Origin templates.' },
        { area: 'Certifications Compliance', score: 48, status: 'Need Improvement', rec: 'Complete HACCP and consider ISO 22000 for premium markets.' },
        { area: 'Market Knowledge', score: 70, status: 'Good', rec: 'Deepen research on Japan SPS requirements and consumer preferences.' },
        { area: 'Digital Readiness', score: 65, status: 'Fair', rec: 'Build digital catalog and online trade presence.' },
        { area: 'Financial Management', score: 58, status: 'Fair', rec: 'Implement proper bookkeeping and prepare financial statements.' },
        { area: 'Logistics & Shipping', score: 60, status: 'Fair', rec: 'Partner with experienced freight forwarder for Japan route.' }
      ]
    },
    education: {
      progress: 33,
      completedModules: 2,
      path: [
        { name: 'Import Basics', status: 'done', num: 1 },
        { name: 'Incoterms', status: 'done', num: 2 },
        { name: 'Customs', status: 'active', num: 3 },
        { name: 'Logistics', status: 'pending', num: 4 },
        { name: 'Export Finance', status: 'pending', num: 5 },
        { name: 'Documentation', status: 'pending', num: 6 }
      ],
      lessons: [
        { id: 'l1', title: 'What is Importing?', status: 'done', duration: '8 min' },
        { id: 'l2', title: 'Import Process Overview', status: 'done', duration: '12 min' },
        { id: 'l3', title: 'Key Import Documents', status: 'done', duration: '10 min' },
        { id: 'l4', title: 'Import Duties & Taxes', status: 'active', duration: '15 min' },
        { id: 'l5', title: 'Working with Customs Brokers', status: 'pending', duration: '14 min' }
      ]
    },
    sustainability: {
      score: 68,
      items: [
        { id: 's1', title: 'Use of sustainable farming practices', sub: 'Eco-friendly cultivation methods', status: 'completed' },
        { id: 's2', title: 'Traceability of raw materials', sub: 'Farm-to-batch tracking system', status: 'completed' },
        { id: 's3', title: 'Environmental certification (Fair Trade/Rainforest Alliance)', sub: 'Third-party verified sustainability', status: 'in-progress' },
        { id: 's4', title: 'Supplier code of conduct', sub: 'Defined ethical sourcing standards', status: 'in-progress' },
        { id: 's5', title: 'ESG reporting framework', sub: 'Annual environmental & social disclosure', status: 'not-started' }
      ],
      indicators: [
        { name: 'Raw Material Traceability', score: 80 },
        { name: 'Environmental Certification', score: 60 },
        { name: 'Supplier Transparency', score: 70 },
        { name: 'ESG Documentation', score: 50 }
      ]
    },
    shipments: [
      { id: 'EXP-001', product: 'Arabica Coffee', destination: 'Japan', buyer: 'Tokyo Specialty Co.', value: 48200, status: 'In Transit', progress: 65, date: '2026-10-22' },
      { id: 'EXP-002', product: 'Robusta Coffee', destination: 'Germany', buyer: 'Berlin Coffee Roasters', value: 36500, status: 'Delivered', progress: 100, date: '2026-10-15' },
      { id: 'EXP-003', product: 'Coconut Sugar', destination: 'Netherlands', buyer: 'Amsterdam Organics', value: 18900, status: 'In Transit', progress: 40, date: '2026-10-26' },
      { id: 'EXP-004', product: 'Palm Oil', destination: 'India', buyer: 'Mumbai Foods Ltd', value: 142000, status: 'Delayed', progress: 25, date: '2026-10-18' }
    ],
    performance: {
      totalValue: 245680,
      onTime: 83,
      satisfaction: 4.8,
      totalShipments: 12,
      totalOrders: 5,
      documents: 6,
      performance: 78
    },
    certifications: [
      { id: 'c1', umkm: 'Sari Kopi Nusantara', type: 'HACCP', status: 'pending', date: '2026-10-20' },
      { id: 'c2', umkm: 'Sari Kopi Nusantara', type: 'Halal', status: 'approved', date: '2026-10-10' },
      { id: 'c3', umkm: 'Kreasi Lada Lampung', type: 'ISO 22000', status: 'pending', date: '2026-10-24' },
      { id: 'c4', umkm: 'Gula Aren Asli', type: 'Organic', status: 'pending', date: '2026-10-25' }
    ],
    financing: [
      { id: 'f1', umkm: 'Sari Kopi Nusantara', amount: 75000, purpose: 'Export Working Capital', status: 'pending', score: 720 },
      { id: 'f2', umkm: 'Teh Hijau Wonosobo', amount: 45000, purpose: 'Packaging Upgrade', status: 'pending', score: 680 },
      { id: 'f3', umkm: 'Kriya Bambu Jepara', amount: 30000, purpose: 'Logistics Coverage', status: 'approved', score: 750 }
    ],
    adminStats: {
      totalUmkms: 1248,
      pendingCerts: 18,
      pendingFinance: 7,
      activeShipments: 64
    }
  };
}

/* ---------- LOAD / SAVE ---------- */
function migrateState(parsed) {
  // Migration v1 -> v1.1: rename demo user 'Qonita' -> 'Dewi'
  let changed = false;
  const renameUser = (u) => {
    if (!u) return;
    if (u.name === 'Qonita') { u.name = 'Dewi'; changed = true; }
    if (u.id === 'qonita-001') { u.id = 'dewi-001'; changed = true; }
    if (u.email && u.email.indexOf('qonita@') === 0) {
      u.email = 'dewi@sarikopinusantara.id'; changed = true;
    }
  };
  if (Array.isArray(parsed.users)) parsed.users.forEach(renameUser);
  if (parsed.currentUser) renameUser(parsed.currentUser);
  if (changed) localStorage.setItem(STATE_KEY, JSON.stringify(parsed));
  return parsed;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) {
      const s = defaultState();
      localStorage.setItem(STATE_KEY, JSON.stringify(s));
      return s;
    }
    const parsed = JSON.parse(raw);
    return migrateState(parsed);
  } catch (e) {
    console.error('State load error:', e);
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

let state = loadState();

/* ---------- TOAST ---------- */
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = 'toast ' + type;
  toast.innerHTML = `<span class="ic">${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}</span><span>${msg}</span>`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------- AUTH ---------- */
function login(email, password, role) {
  const user = state.users.find(u => u.email === email && u.password === password && u.role === role);
  if (user) {
    state.currentUser = { id: user.id, name: user.name, role: user.role, email: user.email, business: user.business || null };
    saveState(state);
    return user;
  }
  return null;
}

function register(name, email, password, role, businessName) {
  if (state.users.find(u => u.email === email)) {
    return { error: 'Email already registered' };
  }
  const user = {
    id: 'u-' + Date.now(),
    name, email, password, role,
    business: { name: businessName || name + "'s Business" }
  };
  state.users.push(user);
  state.currentUser = { id: user.id, name: user.name, role: user.role, email: user.email, business: user.business };
  saveState(state);
  return user;
}

function demoLogin(role) {
  if (role === 'umkm') {
    state.currentUser = { id: DEMO_USER.id, name: DEMO_USER.name, role: 'umkm', email: DEMO_USER.email, business: DEMO_USER.business };
  } else {
    state.currentUser = { id: DEMO_ADMIN.id, name: DEMO_ADMIN.name, role: 'admin', email: DEMO_ADMIN.email };
  }
  saveState(state);
  return state.currentUser;
}

function logout() {
  state.currentUser = null;
  saveState(state);
  window.location.href = 'auth.html';
}

function requireAuth(allowedRoles) {
  if (!state.currentUser) {
    window.location.href = 'auth.html';
    return false;
  }
  if (allowedRoles && !allowedRoles.includes(state.currentUser.role)) {
    window.location.href = state.currentUser.role === 'admin' ? 'admin.html' : 'dashboard.html';
    return false;
  }
  return true;
}

/* ---------- READINESS CALC ---------- */
function calcReadinessScore(onboarding) {
  let score = 30; // base
  if (onboarding.businessName) score += 5;
  if (onboarding.capacity) score += 5;
  if (onboarding.exportExperience === '>1 year') score += 15;
  else if (onboarding.exportExperience === '<1 year') score += 8;
  if (onboarding.targetCountry && onboarding.targetCountry !== 'Domestic') score += 10;
  score += onboarding.certifications.length * 7;
  if (score > 100) score = 100;
  return score;
}

/* ---------- ONBOARDING NAV ---------- */
function onboardingGo(stepNum) {
  const total = 5;
  if (stepNum < 1 || stepNum > total) return;
  state.onboarding.step = stepNum;
  saveState(state);

  document.querySelectorAll('.onboard-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.onboard-step').forEach(el => el.classList.remove('active', 'done'));

  const current = document.querySelector(`.onboard-content[data-step="${stepNum}"]`);
  if (current) current.classList.add('active');

  for (let i = 1; i <= total; i++) {
    const el = document.querySelector(`.onboard-step[data-step="${i}"]`);
    if (!el) continue;
    if (i < stepNum) el.classList.add('done');
    else if (i === stepNum) el.classList.add('active');
  }

  const stepperCircles = document.querySelectorAll('.onboard-stepper .step-circle');
  stepperCircles.forEach((c, idx) => {
    const i = idx + 1;
    c.classList.remove('done', 'active');
    if (i < stepNum) c.classList.add('done');
    else if (i === stepNum) c.classList.add('active');
  });
  const stepperLines = document.querySelectorAll('.onboard-stepper .step-line');
  stepperLines.forEach((l, idx) => {
    if (idx + 1 < stepNum) l.classList.add('done');
    else l.classList.remove('done');
  });
}

function onboardingSaveField(field, value) {
  state.onboarding[field] = value;
  saveState(state);
}

function onboardingToggleCert(cert) {
  const certs = state.onboarding.certifications;
  const idx = certs.indexOf(cert);
  if (idx > -1) certs.splice(idx, 1);
  else certs.push(cert);
  saveState(state);
  return certs;
}

function onboardingComplete() {
  state.onboarding.completed = true;
  const score = calcReadinessScore(state.onboarding);
  state.readiness.score = score;
  saveState(state);
  return score;
}

/* ---------- COMMODITY -> HS CODE ---------- */
const HS_CODES = {
  'Arabica Coffee': '0901.21',
  'Robusta Coffee': '0901.22',
  'Coconut Sugar': '1702.20',
  'Palm Oil': '1511.10',
  'Pepper (Black)': '0904.11',
  'Green Tea': '0902.10',
  'Handicraft': '4601.99'
};

function getHsCode(commodity) {
  return HS_CODES[commodity] || '—';
}

/* ---------- TABS ---------- */
function switchTab(tabGroup, tabId) {
  const group = document.querySelector(`[data-tab-group="${tabGroup}"]`) || document;
  group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  group.querySelectorAll(`.tab-btn[data-tab="${tabId}"]`).forEach(b => b.classList.add('active'));
  group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  group.querySelectorAll(`.tab-content[data-tab-content="${tabId}"]`).forEach(c => c.classList.add('active'));
}

/* ---------- MODALS ---------- */
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('show');
  document.body.style.overflow = '';
}

/* Close on overlay click */
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    document.body.style.overflow = '';
  }
});

/* ---------- DONUT UPDATE ---------- */
function updateDonut(elId, percent) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.style.setProperty('--p', percent);
  const numEl = el.querySelector('.donut-num');
  if (numEl) {
    numEl.innerHTML = `${percent}<span class="pct">%</span>`;
  }
}

/* ---------- PROGRESS BAR UPDATE ---------- */
function updateProgress(elId, percent) {
  const el = document.getElementById(elId);
  if (!el) return;
  const bar = el.querySelector('.progress-bar') || el;
  if (bar.classList.contains('progress-bar')) {
    bar.style.width = percent + '%';
  } else {
    bar.style.width = percent + '%';
  }
}

/* ---------- SUSTAINABILITY TOGGLE ---------- */
function toggleSustain(itemId) {
  const item = state.sustainability.items.find(i => i.id === itemId);
  if (!item) return;
  const order = ['not-started', 'in-progress', 'completed'];
  const idx = order.indexOf(item.status);
  item.status = order[(idx + 1) % order.length];

  // Recalc score
  const completed = state.sustainability.items.filter(i => i.status === 'completed').length;
  const inProgress = state.sustainability.items.filter(i => i.status === 'in-progress').length;
  const total = state.sustainability.items.length;
  state.sustainability.score = Math.round(((completed * 20) + (inProgress * 10)) );
  if (state.sustainability.score > 100) state.sustainability.score = 100;

  // Update indicators based on items
  const indicatorsMap = [
    { idx: 0, items: ['s1'] },
    { idx: 1, items: ['s3'] },
    { idx: 2, items: ['s4'] },
    { idx: 3, items: ['s5'] }
  ];
  indicatorsMap.forEach(m => {
    const itemStatus = state.sustainability.items.filter(i => m.items.includes(i.id));
    let sc = 0;
    itemStatus.forEach(it => {
      if (it.status === 'completed') sc += 80;
      else if (it.status === 'in-progress') sc += 40;
      else sc += 20;
    });
    sc = Math.min(100, sc + 20);
    state.sustainability.indicators[m.idx].score = sc;
  });

  saveState(state);
  renderSustainability();
}

function renderSustainability() {
  document.querySelectorAll('[data-sustain-item]').forEach(el => {
    const id = el.getAttribute('data-sustain-item');
    const item = state.sustainability.items.find(i => i.id === id);
    if (!item) return;
    el.classList.remove('completed', 'in-progress', 'not-started');
    el.classList.add(item.status);
    const statusBadge = el.querySelector('.sustain-status');
    if (statusBadge) {
      statusBadge.className = 'sustain-status ' + item.status;
      statusBadge.textContent = item.status.replace('-', ' ');
    }
  });
  updateDonut('sustain-donut', state.sustainability.score);
  const scoreText = document.getElementById('sustain-score-text');
  if (scoreText) scoreText.textContent = state.sustainability.score + '% Sustainability Score';

  document.querySelectorAll('[data-sustain-indicator]').forEach(el => {
    const idx = parseInt(el.getAttribute('data-sustain-indicator'));
    const ind = state.sustainability.indicators[idx];
    if (!ind) return;
    const numEl = el.querySelector('.ind-score');
    if (numEl) numEl.textContent = ind.score + '%';
    const barEl = el.querySelector('.progress-bar');
    if (barEl) {
      barEl.style.width = ind.score + '%';
      barEl.classList.remove('warning', 'danger');
      if (ind.score < 50) barEl.classList.add('danger');
      else if (ind.score < 70) barEl.classList.add('warning');
    }
  });
}

/* ---------- EDUCATION COMPLETE LESSON ---------- */
function completeLesson(lessonId) {
  const lesson = state.education.lessons.find(l => l.id === lessonId);
  if (!lesson || lesson.status === 'done') return;
  lesson.status = 'done';
  state.education.completedModules = state.education.lessons.filter(l => l.status === 'done').length;
  state.education.progress = Math.round((state.education.completedModules / state.education.lessons.length) * 100);
  saveState(state);
  showToast('Lesson completed! Progress updated.', 'success');
  setTimeout(() => location.reload(), 1000);
}

function completeModule(moduleKey) {
  state.education.completedModules += 1;
  state.education.progress = Math.min(100, state.education.progress + 17);
  // mark next path step done
  const nextPath = state.education.path.find(p => p.status === 'active');
  if (nextPath) {
    nextPath.status = 'done';
    const upcoming = state.education.path.find(p => p.status === 'pending');
    if (upcoming) upcoming.status = 'active';
  }
  saveState(state);
  showToast('Module completed! Your learning path is updated.', 'success');
  setTimeout(() => location.reload(), 1200);
}

/* ---------- SHIPMENT MANAGEMENT ---------- */
function addShipment(data) {
  const newShip = {
    id: 'EXP-' + String(state.shipments.length + 1).padStart(3, '0'),
    product: data.product,
    destination: data.destination,
    buyer: data.buyer,
    value: parseInt(data.value) || 0,
    status: 'Picked Up',
    progress: 10,
    date: new Date().toISOString().split('T')[0]
  };
  state.shipments.unshift(newShip);
  state.performance.totalShipments += 1;
  saveState(state);
  return newShip;
}

function updateShipmentStatus(shipId, status) {
  const ship = state.shipments.find(s => s.id === shipId);
  if (!ship) return;
  ship.status = status;
  const progressMap = { 'Picked Up': 10, 'In Transit': 50, 'Arrived': 85, 'Delivered': 100, 'Delayed': 30 };
  ship.progress = progressMap[status] || ship.progress;
  saveState(state);
  return ship;
}

function trackShipment(shipId) {
  const ship = state.shipments.find(s => s.id === shipId);
  if (!ship) return;
  // Render tracking timeline
  const panel = document.getElementById('tracking-panel');
  if (!panel) return;
  const events = buildTrackingEvents(ship);
  panel.innerHTML = `
    <div class="route-map mb-24">
      <div class="route-points">
        <div class="route-point active">
          <div class="pin">📍</div>
          <div class="city">Tanjung Perak</div>
          <div class="country">Indonesia</div>
        </div>
        <div class="route-line">
          <div class="route-line-fill" style="width: ${ship.progress}%"></div>
          <div class="route-ship" style="left: calc(${ship.progress}% - 12px)">🚢</div>
        </div>
        <div class="route-point ${ship.progress > 50 ? 'active' : ''}">
          <div class="pin ${ship.progress > 50 ? '' : ''}">${ship.destination === 'Japan' ? '🗾' : ship.destination === 'Germany' ? '🇩🇪' : ship.destination === 'Netherlands' ? '🇳🇱' : '🇮🇳'}</div>
          <div class="city">${ship.destination === 'Japan' ? 'Tokyo' : ship.destination === 'Germany' ? 'Hamburg' : ship.destination === 'Netherlands' ? 'Rotterdam' : 'Mumbai'}</div>
          <div class="country">${ship.destination}</div>
        </div>
      </div>
    </div>
    <div class="tracking-timeline">
      ${events.map(e => `<div class="tracking-event ${e.state}">
        <div class="time">${e.time}</div>
        <div class="title">${e.title}</div>
        <div class="place">${e.place}</div>
      </div>`).join('')}
    </div>
    <div class="mt-24">
      <h4 class="mb-16">Shipping Progress</h4>
      <div class="stepper">
        ${['Picked Up', 'In Transit', 'Arrived', 'Delivered'].map((s, i) => {
          const order = ['Picked Up', 'In Transit', 'Arrived', 'Delivered'];
          const curIdx = order.indexOf(ship.status === 'Delayed' ? 'In Transit' : ship.status);
          const cls = i < curIdx ? 'done' : i === curIdx ? 'active' : '';
          return `<div class="step ${cls}"><div class="step-circle">${i < curIdx ? '✓' : i + 1}</div><div class="step-label">${s}</div>${i < 3 ? '<div class="step-line ' + (i < curIdx ? 'done' : '') + '"></div>' : ''}</div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function buildTrackingEvents(ship) {
  const baseEvents = [
    { time: 'Oct 15, 09:30', title: 'Order Confirmed', place: 'Surabaya, Indonesia' },
    { time: 'Oct 18, 14:20', title: 'Picked Up', place: 'Tanjung Perak Port' },
    { time: 'Oct 20, 08:00', title: 'In Transit', place: 'Pacific Ocean / Indian Ocean' },
    { time: 'Oct 26, 16:45', title: 'Arrived at Port', place: 'Destination Port' },
    { time: 'Oct 28, 11:00', title: 'Delivered', place: 'Buyer Warehouse' }
  ];
  const statusOrder = { 'Picked Up': 1, 'In Transit': 2, 'Arrived': 3, 'Delivered': 4, 'Delayed': 2 };
  const curIdx = statusOrder[ship.status] || 0;
  return baseEvents.map((e, i) => ({
    ...e,
    state: i < curIdx ? 'done' : i === curIdx ? 'active' : ''
  }));
}

/* ---------- ADMIN ACTIONS ---------- */
function approveCert(certId) {
  const cert = state.certifications.find(c => c.id === certId);
  if (!cert) return;
  cert.status = 'approved';
  saveState(state);
  showToast(`Certification ${cert.type} for ${cert.umkm} approved.`, 'success');
  setTimeout(() => location.reload(), 1000);
}

function rejectCert(certId) {
  const cert = state.certifications.find(c => c.id === certId);
  if (!cert) return;
  cert.status = 'rejected';
  saveState(state);
  showToast(`Certification ${cert.type} rejected.`, 'warning');
  setTimeout(() => location.reload(), 1000);
}

function approveFinance(financeId) {
  const fin = state.financing.find(f => f.id === financeId);
  if (!fin) return;
  fin.status = 'approved';
  saveState(state);
  showToast(`Financing $${fin.amount.toLocaleString()} for ${fin.umkm} approved.`, 'success');
  setTimeout(() => location.reload(), 1000);
}

function rejectFinance(financeId) {
  const fin = state.financing.find(f => f.id === financeId);
  if (!fin) return;
  fin.status = 'rejected';
  saveState(state);
  showToast(`Financing request rejected.`, 'warning');
  setTimeout(() => location.reload(), 1000);
}

function adminUpdateShipment(shipId, status) {
  updateShipmentStatus(shipId, status);
  showToast(`Shipment ${shipId} status updated to ${status}.`, 'success');
  setTimeout(() => location.reload(), 1000);
}

/* ---------- SEARCH & FILTER ---------- */
function searchMarkets(query) {
  const cards = document.querySelectorAll('[data-market-card]');
  const q = query.toLowerCase().trim();
  cards.forEach(c => {
    const text = c.getAttribute('data-search') || c.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
}

function filterMarkets(category) {
  const cards = document.querySelectorAll('[data-market-card]');
  cards.forEach(c => {
    const cat = c.getAttribute('data-category') || '';
    if (category === 'all' || cat === category) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
  document.querySelectorAll('[data-filter-btn]').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-filter-btn="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

function filterPartners(category) {
  const cards = document.querySelectorAll('[data-partner-card]');
  cards.forEach(c => {
    const cat = c.getAttribute('data-category') || '';
    if (category === 'all' || cat === category) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
  document.querySelectorAll('[data-partner-filter]').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-partner-filter="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

function searchPartners(query) {
  const cards = document.querySelectorAll('[data-partner-card]');
  const q = query.toLowerCase().trim();
  cards.forEach(c => {
    const text = c.getAttribute('data-search') || c.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
}

/* ---------- AI MARKET FINDER ---------- */
function aiMarketFinder() {
  const commodity = state.onboarding.commodity || 'Arabica Coffee';
  const recommendations = getAIRecommendations(commodity);
  const panel = document.getElementById('ai-result');
  if (!panel) return;
  panel.innerHTML = recommendations.map(r => `
    <div class="ai-result-item">
      <div class="flag">${r.flag}</div>
      <div class="info">
        <div class="name">${r.country}</div>
        <div class="match">${r.reason}</div>
      </div>
      <div class="score">${r.score}%</div>
    </div>
  `).join('');
  panel.classList.remove('hidden');
  showToast('AI analyzed your product profile!', 'success');
}

function getAIRecommendations(commodity) {
  const map = {
    'Arabica Coffee': [
      { country: 'Japan', flag: '🇯🇵', score: 94, reason: 'High demand for specialty Arabica' },
      { country: 'Germany', flag: '🇩🇪', score: 88, reason: 'Largest EU coffee market' },
      { country: 'United States', flag: '🇺🇸', score: 82, reason: 'Premium single-origin trend' }
    ],
    'Robusta Coffee': [
      { country: 'Germany', flag: '🇩🇪', score: 91, reason: 'Major Robusta importer' },
      { country: 'Italy', flag: '🇮🇹', score: 86, reason: 'Espresso blend demand' },
      { country: 'Vietnam Trade Hub', flag: '🇻🇳', score: 78, reason: 'Regional processing hub' }
    ],
    'Coconut Sugar': [
      { country: 'Netherlands', flag: '🇳🇱', score: 92, reason: 'EU organic food gateway' },
      { country: 'United States', flag: '🇺🇸', score: 85, reason: 'Healthy sweetener trend' },
      { country: 'Japan', flag: '🇯🇵', score: 79, reason: 'Natural food demand' }
    ],
    'Palm Oil': [
      { country: 'India', flag: '🇮🇳', score: 95, reason: 'World\'s largest importer' },
      { country: 'China', flag: '🇨🇳', score: 88, reason: 'Food industry demand' },
      { country: 'Netherlands', flag: '🇳🇱', score: 74, reason: 'EU refining hub' }
    ]
  };
  return map[commodity] || map['Arabica Coffee'];
}

/* ---------- RENDER HELPERS ---------- */
function renderUserInfo() {
  if (!state.currentUser) return;
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = state.currentUser.name);
  document.querySelectorAll('[data-user-initial]').forEach(el => el.textContent = state.currentUser.name.charAt(0).toUpperCase());
  document.querySelectorAll('[data-business-name]').forEach(el => el.textContent = state.currentUser.business?.name || state.currentUser.name + "'s Business");
  document.querySelectorAll('[data-user-role]').forEach(el => {
    el.textContent = state.currentUser.role === 'admin' ? 'Ecosystem Partner' : 'UMKM / Exporter';
  });
}

function renderDashboard() {
  if (!state.currentUser || state.currentUser.role !== 'umkm') return;
  const score = state.readiness.score;
  document.querySelectorAll('[data-readiness-score]').forEach(el => el.textContent = score + '%');
  const headerEl = document.querySelector('[data-dashboard-header]');
  if (headerEl) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    headerEl.textContent = `${greeting}, ${state.currentUser.name}   |  Your business is ${score}% export-ready`;
  }
}

function renderReadiness() {
  updateDonut('readiness-donut', state.readiness.score);
  const scoreLabel = document.getElementById('readiness-score-label');
  if (scoreLabel) {
    let label = 'Good Progress';
    if (state.readiness.score < 40) label = 'Getting Started';
    else if (state.readiness.score < 60) label = 'Building Up';
    else if (state.readiness.score < 80) label = 'Good Progress';
    else label = 'Export Ready';
    scoreLabel.textContent = `${state.readiness.score}% Export Readiness (${label})`;
  }
  // Breakdown
  const breakdownEls = document.querySelectorAll('[data-readiness-breakdown]');
  breakdownEls.forEach(el => {
    const key = el.getAttribute('data-readiness-breakdown');
    const val = state.readiness.breakdown[key];
    if (val === undefined) return;
    const numEl = el.querySelector('.val');
    if (numEl) numEl.textContent = val + '%';
    const barEl = el.querySelector('.progress-bar');
    if (barEl) {
      barEl.style.width = val + '%';
      barEl.classList.remove('warning', 'danger');
      if (val < 50) barEl.classList.add('danger');
      else if (val < 70) barEl.classList.add('warning');
    }
  });
  // Detailed table
  const tbody = document.getElementById('readiness-detailed-table');
  if (tbody) {
    tbody.innerHTML = state.readiness.detailed.map(d => `
      <tr>
        <td class="cell-strong">${d.area}</td>
        <td><strong>${d.score}%</strong></td>
        <td><span class="badge ${d.status === 'Good' ? 'badge-success' : d.status === 'Fair' ? 'badge-warning' : 'badge-danger'}">${d.status}</span></td>
        <td class="cell-muted">${d.rec}</td>
      </tr>
    `).join('');
  }
}

function renderEducation() {
  document.querySelectorAll('[data-edu-progress]').forEach(el => el.textContent = state.education.progress + '%');
  document.querySelectorAll('[data-edu-completed]').forEach(el => el.textContent = state.education.completedModules);
  document.querySelectorAll('[data-edu-progress-bar]').forEach(el => {
    const bar = el.querySelector('.progress-bar') || el;
    bar.style.width = state.education.progress + '%';
  });
  // Render path
  const pathContainer = document.querySelector('[data-edu-path]');
  if (pathContainer) {
    pathContainer.innerHTML = state.education.path.map(p => `
      <div class="step ${p.status === 'done' ? 'done' : p.status === 'active' ? 'active' : ''}">
        <div class="step-circle ${p.status === 'done' ? 'done' : p.status === 'active' ? 'active' : ''}">${p.status === 'done' ? '✓' : p.num}</div>
        <div class="step-label">${p.name}</div>
        ${p.num < 6 ? `<div class="step-line ${p.status === 'done' ? 'done' : ''}"></div>` : ''}
      </div>
    `).join('');
    // Add current step indicator below stepper (visible on mobile)
    const activeStep = state.education.path.find(p => p.status === 'active');
    const nextStep = activeStep || state.education.path.find(p => p.status === 'pending');
    if (nextStep) {
      // Remove any existing label first
      const existing = pathContainer.parentNode.querySelector('.stepper-current-label');
      if (existing) existing.remove();
      const label = document.createElement('div');
      label.className = 'stepper-current-label';
      label.innerHTML = `<span class="ic">📌</span>Current: <strong>${nextStep.name}</strong> (Step ${nextStep.num} of ${state.education.path.length})`;
      // Insert AFTER the stepper (as sibling, not child) so it doesn't break flex layout
      pathContainer.parentNode.insertBefore(label, pathContainer.nextSibling);
    }
  }
  // Render lessons
  const lessonsContainer = document.querySelector('[data-edu-lessons]');
  if (lessonsContainer) {
    lessonsContainer.innerHTML = state.education.lessons.map(l => `
      <div class="lesson-row ${l.status === 'done' ? 'done' : ''}">
        <div class="lesson-icon">${l.status === 'done' ? '✓' : '📖'}</div>
        <div class="lesson-info">
          <div class="lesson-title">${l.title}</div>
          <div class="lesson-sub">${l.duration}</div>
        </div>
        <div class="lesson-status">${l.status === 'done' ? 'Completed' : l.status === 'active' ? 'In Progress' : 'Not Started'}</div>
        ${l.status !== 'done' ? `<button class="btn btn-sm btn-primary" onclick="completeLesson('${l.id}')">Mark Done</button>` : ''}
      </div>
    `).join('');
  }
}

function renderShipments(targetElId) {
  const tbody = document.getElementById(targetElId);
  if (!tbody) return;
  tbody.innerHTML = state.shipments.map(s => {
    const statusBadge = s.status === 'Delivered' ? 'badge-success' : s.status === 'In Transit' ? 'badge-info' : s.status === 'Delayed' ? 'badge-danger' : 'badge-warning';
    return `
    <tr>
      <td class="cell-strong">${s.id}</td>
      <td>${s.product}</td>
      <td>${s.destination}</td>
      <td class="cell-muted">${s.buyer}</td>
      <td>$${s.value.toLocaleString()}</td>
      <td><span class="badge ${statusBadge}">${s.status}</span></td>
      <td>
        <button class="btn btn-sm btn-ghost" onclick="trackShipment('${s.id}')">Track →</button>
      </td>
    </tr>
    `;
  }).join('');
}

function renderPerformance() {
  document.querySelectorAll('[data-perf-value]').forEach(el => {
    const key = el.getAttribute('data-perf-value');
    const val = state.performance[key];
    if (val !== undefined) {
      el.textContent = typeof val === 'number' && key === 'totalValue' ? '$' + val.toLocaleString() : val;
    }
  });
}

function renderAdmin() {
  if (!state.currentUser || state.currentUser.role !== 'admin') return;
  // Stats
  document.querySelectorAll('[data-admin-stat]').forEach(el => {
    const key = el.getAttribute('data-admin-stat');
    if (state.adminStats[key] !== undefined) el.textContent = state.adminStats[key].toLocaleString();
  });
  // Certifications table
  const certTbody = document.getElementById('admin-cert-table');
  if (certTbody) {
    certTbody.innerHTML = state.certifications.map(c => {
      const badge = c.status === 'approved' ? 'badge-success' : c.status === 'rejected' ? 'badge-danger' : 'badge-warning';
      const actions = c.status === 'pending' ? `
        <div class="action-buttons">
          <button class="action-btn approve" onclick="approveCert('${c.id}')">Approve</button>
          <button class="action-btn reject" onclick="rejectCert('${c.id}')">Reject</button>
        </div>
      ` : `<span class="badge ${badge}">${c.status}</span>`;
      return `
        <tr>
          <td class="cell-strong">${c.umkm}</td>
          <td>${c.type}</td>
          <td class="cell-muted">${c.date}</td>
          <td>${actions}</td>
        </tr>
      `;
    }).join('');
  }
  // Financing table
  const finTbody = document.getElementById('admin-finance-table');
  if (finTbody) {
    finTbody.innerHTML = state.financing.map(f => {
      const badge = f.status === 'approved' ? 'badge-success' : f.status === 'rejected' ? 'badge-danger' : 'badge-warning';
      const actions = f.status === 'pending' ? `
        <div class="action-buttons">
          <button class="action-btn approve" onclick="approveFinance('${f.id}')">Approve</button>
          <button class="action-btn reject" onclick="rejectFinance('${f.id}')">Reject</button>
        </div>
      ` : `<span class="badge ${badge}">${f.status}</span>`;
      const scoreColor = f.score >= 720 ? 'text-emerald' : f.score >= 680 ? '' : 'text-muted';
      return `
        <tr>
          <td class="cell-strong">${f.umkm}</td>
          <td>$${f.amount.toLocaleString()}</td>
          <td class="cell-muted">${f.purpose}</td>
          <td><strong class="${scoreColor}">${f.score}</strong></td>
          <td>${actions}</td>
        </tr>
      `;
    }).join('');
  }
  // Shipment control table
  const shipTbody = document.getElementById('admin-ship-table');
  if (shipTbody) {
    shipTbody.innerHTML = state.shipments.map(s => {
      const badge = s.status === 'Delivered' ? 'badge-success' : s.status === 'In Transit' ? 'badge-info' : s.status === 'Delayed' ? 'badge-danger' : 'badge-warning';
      return `
        <tr>
          <td class="cell-strong">${s.id}</td>
          <td>${s.product}</td>
          <td>${s.destination}</td>
          <td><span class="badge ${badge}">${s.status}</span></td>
          <td>
            <select class="form-control form-control-sm" onchange="adminUpdateShipment('${s.id}', this.value)" style="padding: 6px 10px; font-size: 12px;">
              <option value="Picked Up" ${s.status === 'Picked Up' ? 'selected' : ''}>Picked Up</option>
              <option value="In Transit" ${s.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
              <option value="Arrived" ${s.status === 'Arrived' ? 'selected' : ''}>Arrived</option>
              <option value="Delivered" ${s.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Delayed" ${s.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');
  }
}

/* ---------- SIDEBAR TOGGLE (mobile) ---------- */
function toggleSidebar() {
  const sidebar = document.querySelector('.app-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeSidebar() {
  const sidebar = document.querySelector('.app-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* ---------- PUBLIC NAVBAR TOGGLE (mobile) ---------- */
function toggleNav() {
  const menu = document.querySelector('.nav-menu');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeNav() {
  const menu = document.querySelector('.nav-menu');
  const backdrop = document.querySelector('.nav-backdrop');
  if (menu) menu.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  document.body.style.overflow = '';
}

/* Auto-close sidebar/nav on link click (mobile UX) */
document.addEventListener('DOMContentLoaded', function() {
  // Close sidebar when a sidebar link is clicked
  document.querySelectorAll('.app-sidebar .sidebar-link, .app-sidebar .sidebar-sublink').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 880) {
        setTimeout(closeSidebar, 150);
      }
    });
  });
  // Close nav menu when a nav link is clicked
  document.querySelectorAll('.nav-menu .nav-link, .nav-menu .btn').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 880) {
        setTimeout(closeNav, 150);
      }
    });
  });
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSidebar();
      closeNav();
    }
  });
  // Reset overlay when window resized back to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 880) {
      closeSidebar();
      closeNav();
    }
  });
});

/* ---------- LANGUAGE SWITCH (cosmetic) ---------- */
function switchLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll(`.lang-btn[data-lang="${lang}"]`).forEach(b => b.classList.add('active'));
  showToast(lang === 'id' ? 'Bahasa Indonesia dipilih (demo)' : 'English selected', 'success');
}

/* ---------- PAGE INIT HOOK ---------- */
function pageInit(pageName) {
  renderUserInfo();
  if (pageName === 'dashboard') { renderDashboard(); }
  if (pageName === 'readiness') { renderReadiness(); }
  if (pageName === 'education') { renderEducation(); }
  if (pageName === 'sustainability') { renderSustainability(); }
  if (pageName === 'my-export') { renderShipments('shipments-tbody'); renderPerformance(); }
  if (pageName === 'my-business') { renderShipments('business-shipments-tbody'); renderPerformance(); }
  if (pageName === 'admin') { renderAdmin(); }
}

/* Expose to window */
window.ExporE = {
  state, saveState, loadState,
  login, register, demoLogin, logout, requireAuth,
  onboardingGo, onboardingSaveField, onboardingToggleCert, onboardingComplete, getHsCode,
  switchTab, openModal, closeModal,
  updateDonut, updateProgress,
  toggleSustain, renderSustainability,
  completeLesson, completeModule,
  addShipment, updateShipmentStatus, trackShipment,
  approveCert, rejectCert, approveFinance, rejectFinance, adminUpdateShipment,
  searchMarkets, filterMarkets, searchPartners, filterPartners,
  aiMarketFinder,
  showToast, switchLang, toggleSidebar, closeSidebar, toggleNav, closeNav, pageInit,
  calcReadinessScore
};