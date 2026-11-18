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
  role: 'MSMEs',
  business: {
    name: 'Sari Kopi Nusantara',
    type: 'MSMEs',
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
      businessType: 'MSMEs',
      capacity: '500',
      capacityUnit: 'kg',
      capacityPeriod: 'trip',
      exportExperience: 'None',
      commodity: 'Coffee',
      hsCode: '0901.11',
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
      ],
      plan: [
        {
          week: 1,
          title: 'HACCP & Compliance Foundations',
          tasks: [
            { id: 'w1_t1', text: 'HACCP gap analysis', sub: 'Identify missing control points', done: true },
            { id: 'w1_t2', text: 'Start HACCP fundamentals module', sub: 'Education · 2h', done: true },
            { id: 'w1_t3', text: 'Schedule HACCP auditor visit', sub: 'Local certification body', done: false }
          ]
        },
        {
          week: 2,
          title: 'Documentation & SPS',
          tasks: [
            { id: 'w2_t1', text: 'Download export document templates', sub: 'Commercial Invoice, Packing List, COO', done: false },
            { id: 'w2_t2', text: 'Complete SPS requirements module', sub: 'Education · 1h 45m', done: false },
            { id: 'w2_t3', text: 'Draft first Commercial Invoice sample', sub: 'Use real product data', done: false }
          ]
        },
        {
          week: 3,
          title: 'Market & Buyer Outreach',
          tasks: [
            { id: 'w3_t1', text: 'Deep-dive Japan market research', sub: 'Consumer trends, pricing, SPS rules', done: false },
            { id: 'w3_t2', text: 'Shortlist 5 potential buyers', sub: 'Use Ecosystem partner directory', done: false },
            { id: 'w3_t3', text: 'Send first outreach email', sub: 'Include product sample offer', done: false }
          ]
        },
        {
          week: 4,
          title: 'Certification & Logistics',
          tasks: [
            { id: 'w4_t1', text: 'Submit HACCP certification application', sub: 'With all supporting documents', done: false },
            { id: 'w4_t2', text: 'Sign logistics partner for Japan route', sub: 'Freight forwarder with coffee experience', done: false },
            { id: 'w4_t3', text: 'Prepare first export shipment plan', sub: 'Timeline, costs, Incoterms', done: false }
          ]
        }
      ]
    },
    education: {
      progress: 33,
      completedModules: 2,
      activeModuleNum: 3,
      path: [
        { name: 'Import Basics', status: 'done', num: 1 },
        { name: 'Incoterms', status: 'done', num: 2 },
        { name: 'Customs', status: 'active', num: 3 },
        { name: 'Logistics', status: 'pending', num: 4 },
        { name: 'Export Finance', status: 'pending', num: 5 },
        { name: 'Documentation', status: 'pending', num: 6 }
      ],
      moduleLessons: {
        1: [
          { id: 'm1_l1', title: 'What is International Trade?', status: 'done', duration: '8 min' },
          { id: 'm1_l2', title: 'Exporter vs Importer Roles', status: 'done', duration: '10 min' },
          { id: 'm1_l3', title: 'Indonesia Export Regulations', status: 'done', duration: '12 min' },
          { id: 'm1_l4', title: 'Export Readiness Self-Audit', status: 'done', duration: '15 min' }
        ],
        2: [
          { id: 'm2_l1', title: 'Introduction to Incoterms 2020', status: 'done', duration: '10 min' },
          { id: 'm2_l2', title: 'FOB, CIF, and CFR Explained', status: 'done', duration: '15 min' },
          { id: 'm2_l3', title: 'Risk Transfer & Insurance Points', status: 'done', duration: '12 min' },
          { id: 'm2_l4', title: 'Choosing the Right Term for Coffee', status: 'done', duration: '10 min' }
        ],
        3: [
          { id: 'l1', title: 'What is Customs Clearance?', status: 'done', duration: '8 min' },
          { id: 'l2', title: 'Customs Declaration & PEB', status: 'done', duration: '12 min' },
          { id: 'l3', title: 'Key Import Documents', status: 'done', duration: '10 min' },
          { id: 'l4', title: 'Import Duties & Taxes', status: 'done', duration: '15 min' },
          { id: 'l5', title: 'Working with Customs Brokers', status: 'active', duration: '14 min' }
        ],
        4: [
          { id: 'm4_l1', title: 'Ocean Freight vs Air Freight Selection', status: 'active', duration: '12 min' },
          { id: 'm4_l2', title: 'FCL vs LCL Container Loading', status: 'pending', duration: '14 min' },
          { id: 'm4_l3', title: 'Bill of Lading & Shipping Instructions', status: 'pending', duration: '15 min' },
          { id: 'm4_l4', title: 'Selecting Freight Forwarders for Agro Cargo', status: 'pending', duration: '10 min' }
        ],
        5: [
          { id: 'm5_l1', title: 'Letter of Credit (L/C) Fundamentals', status: 'active', duration: '15 min' },
          { id: 'm5_l2', title: 'Digital Credit Scoring & Working Capital', status: 'pending', duration: '12 min' },
          { id: 'm5_l3', title: 'Hedging Currency & Payment Security', status: 'pending', duration: '10 min' }
        ],
        6: [
          { id: 'm6_l1', title: 'Commercial Invoice & Packing List Standards', status: 'active', duration: '12 min' },
          { id: 'm6_l2', title: 'Certificate of Origin (COO / Form AK/AJ)', status: 'pending', duration: '15 min' },
          { id: 'm6_l3', title: 'Phytosanitary & Health Certificates', status: 'pending', duration: '14 min' },
          { id: 'm6_l4', title: 'Pre-Shipment Document Verification Checklist', status: 'pending', duration: '10 min' }
        ]
      },
      lessons: [
        { id: 'l1', title: 'What is Customs Clearance?', status: 'done', duration: '8 min' },
        { id: 'l2', title: 'Customs Declaration & PEB', status: 'done', duration: '12 min' },
        { id: 'l3', title: 'Key Import Documents', status: 'done', duration: '10 min' },
        { id: 'l4', title: 'Import Duties & Taxes', status: 'done', duration: '15 min' },
        { id: 'l5', title: 'Working with Customs Brokers', status: 'active', duration: '14 min' }
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
      { id: 'c1', MSMEs: 'Sari Kopi Nusantara', type: 'HACCP', status: 'pending', date: '2026-10-20' },
      { id: 'c2', MSMEs: 'Sari Kopi Nusantara', type: 'Halal', status: 'approved', date: '2026-10-10' },
      { id: 'c3', MSMEs: 'Kreasi Lada Lampung', type: 'ISO 22000', status: 'pending', date: '2026-10-24' },
      { id: 'c4', MSMEs: 'Gula Aren Asli', type: 'Organic', status: 'pending', date: '2026-10-25' }
    ],
    financing: [
      { id: 'f1', MSMEs: 'Sari Kopi Nusantara', amount: 75000, purpose: 'Export Working Capital', status: 'pending', score: 720 },
      { id: 'f2', MSMEs: 'Teh Hijau Wonosobo', amount: 45000, purpose: 'Packaging Upgrade', status: 'pending', score: 680 },
      { id: 'f3', MSMEs: 'Kriya Bambu Jepara', amount: 30000, purpose: 'Logistics Coverage', status: 'approved', score: 750 }
    ],
    adminStats: {
      totalMSMEs: 1248,
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

  // Migration v1.2: consolidate Arabica & Robusta into 'Coffee' in onboarding
  if (parsed.onboarding && (parsed.onboarding.commodity === 'Arabica Coffee' || parsed.onboarding.commodity === 'Robusta Coffee')) {
    parsed.onboarding.commodity = 'Coffee';
    parsed.onboarding.hsCode = '0901.11';
    changed = true;
  }
  if (parsed.onboarding && Array.isArray(parsed.onboarding.products)) {
    parsed.onboarding.products.forEach(p => {
      if (p.name === 'Arabica Coffee' || p.name === 'Robusta Coffee') {
        p.name = 'Coffee';
        p.hsCode = '0901.11';
        changed = true;
      }
    });
  }

  // Migration v1.3: ensure education completedModules strictly tracks path modules (/6)
  if (parsed.education && Array.isArray(parsed.education.path)) {
    const donePath = parsed.education.path.filter(p => p.status === 'done').length;
    if (parsed.education.completedModules !== donePath) {
      parsed.education.completedModules = donePath;
      changed = true;
    }
  }

  // Migration v1.4: initialize improvement plan in readiness if missing or incomplete
  if (parsed.readiness && (!Array.isArray(parsed.readiness.plan) || parsed.readiness.plan.length === 0)) {
    parsed.readiness.plan = [
      {
        week: 1,
        title: 'HACCP & Compliance Foundations',
        tasks: [
          { id: 'w1_t1', text: 'HACCP gap analysis', sub: 'Identify missing control points', done: true },
          { id: 'w1_t2', text: 'Start HACCP fundamentals module', sub: 'Education · 2h', done: true },
          { id: 'w1_t3', text: 'Schedule HACCP auditor visit', sub: 'Local certification body', done: false }
        ]
      },
      {
        week: 2,
        title: 'Documentation & SPS',
        tasks: [
          { id: 'w2_t1', text: 'Download export document templates', sub: 'Commercial Invoice, Packing List, COO', done: false },
          { id: 'w2_t2', text: 'Complete SPS requirements module', sub: 'Education · 1h 45m', done: false },
          { id: 'w2_t3', text: 'Draft first Commercial Invoice sample', sub: 'Use real product data', done: false }
        ]
      },
      {
        week: 3,
        title: 'Market & Buyer Outreach',
        tasks: [
          { id: 'w3_t1', text: 'Deep-dive Japan market research', sub: 'Consumer trends, pricing, SPS rules', done: false },
          { id: 'w3_t2', text: 'Shortlist 5 potential buyers', sub: 'Use Ecosystem partner directory', done: false },
          { id: 'w3_t3', text: 'Send first outreach email', sub: 'Include product sample offer', done: false }
        ]
      },
      {
        week: 4,
        title: 'Certification & Logistics',
        tasks: [
          { id: 'w4_t1', text: 'Submit HACCP certification application', sub: 'With all supporting documents', done: false },
          { id: 'w4_t2', text: 'Sign logistics partner for Japan route', sub: 'Freight forwarder with coffee experience', done: false },
          { id: 'w4_t3', text: 'Prepare first export shipment plan', sub: 'Timeline, costs, Incoterms', done: false }
        ]
      }
    ];
    changed = true;
  }

  // Migration v1.5: initialize education activeModuleNum and moduleLessons
  if (parsed.education) {
    if (!parsed.education.activeModuleNum) {
      const act = (parsed.education.path || []).find(p => p.status === 'active');
      parsed.education.activeModuleNum = act ? act.num : 3;
      changed = true;
    }
    if (!parsed.education.moduleLessons) {
      parsed.education.moduleLessons = {
        1: [
          { id: 'm1_l1', title: 'What is International Trade?', status: 'done', duration: '8 min' },
          { id: 'm1_l2', title: 'Exporter vs Importer Roles', status: 'done', duration: '10 min' },
          { id: 'm1_l3', title: 'Indonesia Export Regulations', status: 'done', duration: '12 min' },
          { id: 'm1_l4', title: 'Export Readiness Self-Audit', status: 'done', duration: '15 min' }
        ],
        2: [
          { id: 'm2_l1', title: 'Introduction to Incoterms 2020', status: 'done', duration: '10 min' },
          { id: 'm2_l2', title: 'FOB, CIF, and CFR Explained', status: 'done', duration: '15 min' },
          { id: 'm2_l3', title: 'Risk Transfer & Insurance Points', status: 'done', duration: '12 min' },
          { id: 'm2_l4', title: 'Choosing the Right Term for Coffee', status: 'done', duration: '10 min' }
        ],
        3: Array.isArray(parsed.education.lessons) && parsed.education.lessons.length > 0 ? parsed.education.lessons : [
          { id: 'l1', title: 'What is Customs Clearance?', status: 'done', duration: '8 min' },
          { id: 'l2', title: 'Customs Declaration & PEB', status: 'done', duration: '12 min' },
          { id: 'l3', title: 'Key Import Documents', status: 'done', duration: '10 min' },
          { id: 'l4', title: 'Import Duties & Taxes', status: 'done', duration: '15 min' },
          { id: 'l5', title: 'Working with Customs Brokers', status: 'active', duration: '14 min' }
        ],
        4: [
          { id: 'm4_l1', title: 'Ocean Freight vs Air Freight Selection', status: 'active', duration: '12 min' },
          { id: 'm4_l2', title: 'FCL vs LCL Container Loading', status: 'pending', duration: '14 min' },
          { id: 'm4_l3', title: 'Bill of Lading & Shipping Instructions', status: 'pending', duration: '15 min' },
          { id: 'm4_l4', title: 'Selecting Freight Forwarders for Agro Cargo', status: 'pending', duration: '10 min' }
        ],
        5: [
          { id: 'm5_l1', title: 'Letter of Credit (L/C) Fundamentals', status: 'active', duration: '15 min' },
          { id: 'm5_l2', title: 'Digital Credit Scoring & Working Capital', status: 'pending', duration: '12 min' },
          { id: 'm5_l3', title: 'Hedging Currency & Payment Security', status: 'pending', duration: '10 min' }
        ],
        6: [
          { id: 'm6_l1', title: 'Commercial Invoice & Packing List Standards', status: 'active', duration: '12 min' },
          { id: 'm6_l2', title: 'Certificate of Origin (COO / Form AK/AJ)', status: 'pending', duration: '15 min' },
          { id: 'm6_l3', title: 'Phytosanitary & Health Certificates', status: 'pending', duration: '14 min' },
          { id: 'm6_l4', title: 'Pre-Shipment Document Verification Checklist', status: 'pending', duration: '10 min' }
        ]
      };
      changed = true;
    }
  }
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
  if (role === 'MSMEs') {
    state.currentUser = { id: DEMO_USER.id, name: DEMO_USER.name, role: 'MSMEs', email: DEMO_USER.email, business: DEMO_USER.business };
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
  score += (onboarding.certifications || []).length * 7;
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
  'Coffee': '0901.11',
  'Arabica Coffee': '0901.21',
  'Robusta Coffee': '0901.22',
  'Coconut Sugar': '1702.20',
  'Palm Oil': '1511.10',
  'Pepper (Black)': '0904.11',
  'Pepper (White)': '0904.12',
  'Green Tea': '0902.10',
  'Black Tea': '0902.30',
  'Cocoa Beans': '1801.00',
  'Cocoa Powder': '1805.00',
  'Vanilla Beans': '0905.00',
  'Cloves': '0907.00',
  'Nutmeg': '0908.10',
  'Cinnamon': '0906.10',
  'Ginger': '0910.10',
  'Turmeric': '0910.30',
  'Cashew Nuts': '0801.31',
  'Betel Nuts': '0802.90',
  'Rattan Products': '4601.21',
  'Handicraft': '4601.99',
  'Batik Textile': '6204.42',
  'Wooden Furniture': '9403.60',
  'Coconut Oil': '1513.19'
};

function getHsCode(commodity) {
  return HS_CODES[commodity] || '—';
}

/* ---------- ONBOARDING PRODUCTS (multi-product + custom) ---------- */
function getOnboardingProducts() {
  // returns array of { name, hsCode, valueAdd } — defaults to single Arabica
  if (!state.onboarding.products) {
    state.onboarding.products = [{
      name: state.onboarding.commodity || 'Arabica Coffee',
      hsCode: state.onboarding.hsCode || getHsCode('Arabica Coffee'),
      valueAdd: state.onboarding.valueAdd || 'Specialty grade, single origin, wet-hulled process'
    }];
    saveState(state);
  }
  return state.onboarding.products;
}

function addOnboardingProduct(name, hsCode, valueAdd) {
  getOnboardingProducts();
  state.onboarding.products.push({ name, hsCode, valueAdd: valueAdd || '' });
  saveState(state);
  return state.onboarding.products.length - 1;
}

function removeOnboardingProduct(idx) {
  if (!state.onboarding.products) return;
  state.onboarding.products.splice(idx, 1);
  if (state.onboarding.products.length === 0) {
    state.onboarding.products.push({ name: 'Arabica Coffee', hsCode: getHsCode('Arabica Coffee'), valueAdd: '' });
  }
  saveState(state);
}

function setPrimaryOnboardingProduct(idx) {
  if (!state.onboarding.products || !state.onboarding.products[idx]) return;
  const p = state.onboarding.products[idx];
  state.onboarding.commodity = p.name;
  state.onboarding.hsCode = p.hsCode;
  state.onboarding.valueAdd = p.valueAdd || '';
  saveState(state);
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

/* ---------- IMPROVEMENT PLAN & EXPORT JOURNEY (READINESS) ---------- */
function updateDynamicReadinessScore() {
  if (!state.readiness || !state.readiness.plan) return;
  const plan = state.readiness.plan;
  let totalTasks = 0;
  let doneTasks = 0;
  plan.forEach(w => {
    (w.tasks || []).forEach(t => {
      totalTasks++;
      if (t.done) doneTasks++;
    });
  });
  if (totalTasks === 0) return;

  // Baseline readiness score for demo user is 57%
  // 12 tasks in improvement plan; initially 2 done (w1_t1, w1_t2)
  // Additional tasks lift score from 57% up to 92% (100% plan = 92% readiness)
  const bonusTasks = Math.max(0, doneTasks - 2);
  const maxBonusTasks = Math.max(1, totalTasks - 2);
  const bonus = Math.round((bonusTasks / maxBonusTasks) * 35);
  state.readiness.score = Math.min(100, 57 + bonus);
}

function renderExportJourney() {
  const stepper = document.querySelector('[data-journey-stepper], .stepper');
  if (!stepper) return;

  const plan = (state.readiness && state.readiness.plan) || [];
  let totalTasks = 0;
  let doneTasks = 0;

  plan.forEach(w => {
    (w.tasks || []).forEach(t => {
      totalTasks++;
      if (t.done) doneTasks++;
    });
  });

  const planPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const eduDoneModules = (state.education && state.education.completedModules) || 2;

  // 6 Milestones:
  // Step 1: Assessment - always completed once assessed
  const s1 = true;
  // Step 2: Education - completed if planPct >= 25% or doneTasks >= 3 or eduDoneModules >= 4
  const s2 = (doneTasks >= 3) || (eduDoneModules >= 4) || (planPct >= 25);
  // Step 3: Certification - completed if planPct >= 50% or doneTasks >= 6
  const s3 = s2 && (doneTasks >= 6 || planPct >= 50);
  // Step 4: Market - completed if planPct >= 75% or doneTasks >= 8
  const s4 = s3 && (doneTasks >= 8 || planPct >= 75);
  // Step 5: Buyer - completed if planPct >= 90% or doneTasks >= 10
  const s5 = s4 && (doneTasks >= 10 || planPct >= 90);
  // Step 6: Export - completed if planPct === 100% or doneTasks >= 12
  const s6 = s5 && (planPct === 100 || doneTasks >= 12);

  const stepsDone = [s1, s2, s3, s4, s5, s6];
  const doneCount = stepsDone.filter(Boolean).length;
  const activeStepNum = doneCount === 6 ? 6 : (doneCount + 1);

  const stepElements = stepper.querySelectorAll('.step');
  stepElements.forEach((stepEl, idx) => {
    const stepNum = idx + 1;
    const isDone = stepsDone[idx];
    const isActive = (stepNum === activeStepNum && doneCount < 6);
    const circle = stepEl.querySelector('.step-circle');
    const line = stepEl.querySelector('.step-line');

    stepEl.classList.toggle('done', isDone);
    stepEl.classList.toggle('active', isActive);

    if (circle) {
      circle.classList.toggle('done', isDone);
      circle.classList.toggle('active', isActive);
      circle.textContent = stepNum;
    }

    if (line) {
      line.classList.toggle('done', isDone);
    }
  });

  // Notice banner updates
  const banner = document.querySelector('[data-journey-banner], .notice-banner');
  if (banner) {
    const bannerText = banner.querySelector('[data-journey-banner-text], span:not(.ic)');
    const bannerIcon = banner.querySelector('.ic');

    const stepNames = [
      'Assessment',
      'Education',
      'Certification',
      'Market Research',
      'Buyer Outreach',
      'Export Execution'
    ];

    if (doneCount === 6) {
      banner.style.background = 'var(--mint-soft)';
      banner.style.borderColor = 'var(--emerald)';
      if (bannerIcon) {
        bannerIcon.style.color = 'var(--emerald)';
        bannerIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      }
      if (bannerText) {
        bannerText.innerHTML = `<strong>100% Export-Ready!</strong> All 6 milestones completed. Your business is fully certified and prepared for international export shipments.`;
      }
    } else {
      banner.style.background = '';
      banner.style.borderColor = '';
      if (bannerIcon) {
        bannerIcon.style.color = '';
        bannerIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.5.4.8 1 .9 1.6h6.2c.1-.6.4-1.2.9-1.6A7 7 0 0 0 12 2Z"/></svg>`;
      }
      if (bannerText) {
        bannerText.innerHTML = `You're <strong>${activeStepNum} of 6 steps</strong> into your export journey. Current milestone: <strong>${stepNames[activeStepNum - 1]}</strong>.`;
      }
    }
  }
}

function togglePlanTask(taskId, isChecked) {
  if (!state.readiness || !state.readiness.plan) return;
  for (const w of state.readiness.plan) {
    const t = (w.tasks || []).find(x => x.id === taskId);
    if (t) {
      t.done = (isChecked !== undefined ? isChecked : !t.done);
      break;
    }
  }
  updateDynamicReadinessScore();
  saveState(state);
  renderImprovementPlan();
  renderExportJourney();
}

function renderImprovementPlan() {
  if (!state.readiness || !state.readiness.plan) return;

  let totalTasks = 0;
  let totalDone = 0;

  state.readiness.plan.forEach(w => {
    const weekEl = document.querySelector(`[data-plan-week="${w.week}"]`);
    const weekTasks = w.tasks || [];
    const doneCount = weekTasks.filter(t => t.done).length;
    const taskCount = weekTasks.length;
    const weekPct = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0;

    totalTasks += taskCount;
    totalDone += doneCount;

    if (weekEl) {
      // Update badge
      const badge = weekEl.querySelector('[data-plan-week-badge]');
      if (badge) {
        if (doneCount === 0) {
          badge.className = 'badge badge-muted';
          badge.textContent = 'Not Started';
        } else if (doneCount === taskCount) {
          badge.className = 'badge badge-success';
          badge.textContent = 'Completed';
        } else {
          badge.className = 'badge badge-warning';
          badge.textContent = 'In Progress';
        }
      }

      // Update count text
      const countEl = weekEl.querySelector('[data-plan-week-count]');
      if (countEl) {
        countEl.textContent = `${doneCount} of ${taskCount} completed`;
      }

      // Update week progress bar
      const bar = weekEl.querySelector('[data-plan-week-bar] .progress-bar, [data-plan-week-bar].progress-bar');
      if (bar) {
        bar.style.width = weekPct + '%';
        bar.classList.remove('warning', 'danger');
        if (doneCount > 0 && doneCount < taskCount) {
          bar.classList.add('warning');
        }
      }

      // Sync checkbox inputs and parent .form-check class
      weekTasks.forEach(t => {
        const input = weekEl.querySelector(`input[data-plan-task="${t.id}"]`);
        if (input) {
          input.checked = !!t.done;
          const parent = input.closest('.form-check');
          if (parent) {
            parent.classList.toggle('checked', !!t.done);
          }
        }
      });
    }
  });

  // Overall plan progress
  const overallPct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;
  const overallBadge = document.querySelector('[data-plan-overall-badge]');
  if (overallBadge) {
    overallBadge.textContent = `Overall progress ${overallPct}%`;
    overallBadge.className = overallPct === 100 ? 'badge badge-success' : overallPct > 0 ? 'badge badge-info' : 'badge badge-muted';
  }

  const overallBar = document.querySelector('[data-plan-overall-bar] .progress-bar, [data-plan-overall-bar].progress-bar');
  if (overallBar) {
    overallBar.style.width = overallPct + '%';
  }

  // Sync Dashboard HACCP step if dashboard elements exist
  const dashHaccpSub = document.querySelector('[data-dash-haccp-sub]');
  const dashHaccpBar = document.querySelector('[data-dash-haccp-bar]');
  if (dashHaccpSub || dashHaccpBar) {
    const w1 = state.readiness.plan[0];
    if (w1) {
      const w1Done = (w1.tasks || []).filter(t => t.done).length;
      const w1Total = (w1.tasks || []).length;
      const w1Pct = w1Total > 0 ? Math.round((w1Done / w1Total) * 100) : 0;
      const left = w1Total - w1Done;
      if (dashHaccpSub) {
        dashHaccpSub.textContent = left === 0 ? '100% complete · Completed' : `${w1Pct}% complete · ${left} task${left > 1 ? 's' : ''} left`;
      }
      if (dashHaccpBar) {
        dashHaccpBar.style.width = w1Pct + '%';
        dashHaccpBar.classList.remove('warning', 'success');
        if (w1Pct === 100) dashHaccpBar.classList.add('success');
        else if (w1Pct > 0) dashHaccpBar.classList.add('warning');
      }
    }
  }

  // Sync Dashboard SPS step
  const dashSpsSub = document.querySelector('[data-dash-sps-sub]');
  const dashSpsBar = document.querySelector('[data-dash-sps-bar]');
  if (dashSpsSub || dashSpsBar) {
    const w2 = state.readiness.plan[1];
    if (w2) {
      const w2Done = (w2.tasks || []).filter(t => t.done).length;
      const w2Total = (w2.tasks || []).length;
      const w2Pct = w2Total > 0 ? Math.round((w2Done / w2Total) * 100) : 0;
      const left = w2Total - w2Done;
      if (dashSpsSub) {
        dashSpsSub.textContent = left === 0 ? '100% complete · Completed' : `${w2Pct}% complete · ${left} task${left > 1 ? 's' : ''} left`;
      }
      if (dashSpsBar) {
        dashSpsBar.style.width = w2Pct + '%';
        dashSpsBar.classList.remove('warning', 'success');
        if (w2Pct === 100) dashSpsBar.classList.add('success');
        else if (w2Pct > 0) dashSpsBar.classList.add('warning');
      }
    }
  }

  // Sync Dashboard Market step
  const dashMarketSub = document.querySelector('[data-dash-market-sub]');
  const dashMarketBar = document.querySelector('[data-dash-market-bar]');
  if (dashMarketSub || dashMarketBar) {
    const w3 = state.readiness.plan[2];
    if (w3) {
      const w3Done = (w3.tasks || []).filter(t => t.done).length;
      const w3Total = (w3.tasks || []).length;
      const w3Pct = w3Total > 0 ? Math.round((w3Done / w3Total) * 100) : 0;
      const left = w3Total - w3Done;
      if (dashMarketSub) {
        dashMarketSub.textContent = left === 0 ? '100% complete · Completed' : `${w3Pct}% complete · ${left} task${left > 1 ? 's' : ''} left`;
      }
      if (dashMarketBar) {
        dashMarketBar.style.width = w3Pct + '%';
        dashMarketBar.classList.remove('warning', 'success');
        if (w3Pct === 100) dashMarketBar.classList.add('success');
        else if (w3Pct > 0) dashMarketBar.classList.add('warning');
      }
    }
  }

  // Sync Dashboard pending badge
  const pendingBadge = document.querySelector('[data-dash-pending-badge]');
  if (pendingBadge) {
    let pendingCount = 3;
    const w1 = state.readiness.plan[0];
    const w2 = state.readiness.plan[1];
    const w3 = state.readiness.plan[2];
    if (w1 && (w1.tasks || []).every(t => t.done)) pendingCount--;
    if (w2 && (w2.tasks || []).every(t => t.done)) pendingCount--;
    if (w3 && (w3.tasks || []).every(t => t.done)) pendingCount--;

    if (pendingCount === 0) {
      pendingBadge.className = 'badge badge-success';
      pendingBadge.textContent = 'All Completed';
    } else {
      pendingBadge.className = 'badge badge-muted';
      pendingBadge.textContent = `${pendingCount} pending`;
    }
  }

  renderExportJourney();
}

window.updateDynamicReadinessScore = updateDynamicReadinessScore;
window.renderExportJourney = renderExportJourney;
window.togglePlanTask = togglePlanTask;
window.renderImprovementPlan = renderImprovementPlan;

/* ---------- EDUCATION PROGRESS & LESSON SYNC ---------- */
function getDefaultModuleLessons(num) {
  const defaults = {
    1: [
      { id: 'm1_l1', title: 'What is International Trade?', status: 'done', duration: '8 min' },
      { id: 'm1_l2', title: 'Exporter vs Importer Roles', status: 'done', duration: '10 min' },
      { id: 'm1_l3', title: 'Indonesia Export Regulations', status: 'done', duration: '12 min' },
      { id: 'm1_l4', title: 'Export Readiness Self-Audit', status: 'done', duration: '15 min' }
    ],
    2: [
      { id: 'm2_l1', title: 'Introduction to Incoterms 2020', status: 'done', duration: '10 min' },
      { id: 'm2_l2', title: 'FOB, CIF, and CFR Explained', status: 'done', duration: '15 min' },
      { id: 'm2_l3', title: 'Risk Transfer & Insurance Points', status: 'done', duration: '12 min' },
      { id: 'm2_l4', title: 'Choosing the Right Term for Coffee', status: 'done', duration: '10 min' }
    ],
    3: [
      { id: 'l1', title: 'What is Customs Clearance?', status: 'done', duration: '8 min' },
      { id: 'l2', title: 'Customs Declaration & PEB', status: 'done', duration: '12 min' },
      { id: 'l3', title: 'Key Import Documents', status: 'done', duration: '10 min' },
      { id: 'l4', title: 'Import Duties & Taxes', status: 'done', duration: '15 min' },
      { id: 'l5', title: 'Working with Customs Brokers', status: 'active', duration: '14 min' }
    ],
    4: [
      { id: 'm4_l1', title: 'Ocean Freight vs Air Freight Selection', status: 'active', duration: '12 min' },
      { id: 'm4_l2', title: 'FCL vs LCL Container Loading', status: 'pending', duration: '14 min' },
      { id: 'm4_l3', title: 'Bill of Lading & Shipping Instructions', status: 'pending', duration: '15 min' },
      { id: 'm4_l4', title: 'Selecting Freight Forwarders for Agro Cargo', status: 'pending', duration: '10 min' }
    ],
    5: [
      { id: 'm5_l1', title: 'Letter of Credit (L/C) Fundamentals', status: 'active', duration: '15 min' },
      { id: 'm5_l2', title: 'Digital Credit Scoring & Working Capital', status: 'pending', duration: '12 min' },
      { id: 'm5_l3', title: 'Hedging Currency & Payment Security', status: 'pending', duration: '10 min' }
    ],
    6: [
      { id: 'm6_l1', title: 'Commercial Invoice & Packing List Standards', status: 'active', duration: '12 min' },
      { id: 'm6_l2', title: 'Certificate of Origin (COO / Form AK/AJ)', status: 'pending', duration: '15 min' },
      { id: 'm6_l3', title: 'Phytosanitary & Health Certificates', status: 'pending', duration: '14 min' },
      { id: 'm6_l4', title: 'Pre-Shipment Document Verification Checklist', status: 'pending', duration: '10 min' }
    ]
  };
  return defaults[num] || [];
}

function getCurrentModuleLessons(moduleNum) {
  const num = moduleNum || state.education.activeModuleNum || 3;
  if (!state.education.moduleLessons) state.education.moduleLessons = {};
  if (!state.education.moduleLessons[num] || state.education.moduleLessons[num].length === 0) {
    if (num === 3 && Array.isArray(state.education.lessons) && state.education.lessons.length > 0) {
      state.education.moduleLessons[3] = state.education.lessons;
    } else {
      state.education.moduleLessons[num] = getDefaultModuleLessons(num);
    }
  }
  return state.education.moduleLessons[num];
}

function selectEducationModule(num) {
  if (!state.education || !state.education.path) return;
  const mod = state.education.path.find(p => p.num === num);
  if (!mod) return;
  state.education.activeModuleNum = num;
  saveState(state);
  renderEducation();
  showToast(`Viewing Module ${num}: ${mod.name}`, 'info');
}

function syncEducationProgress() {
  if (!state.education) return;
  const path = state.education.path || [];
  const completedMods = path.filter(p => p.status === 'done').length;
  state.education.completedModules = completedMods;

  const totalMods = path.length || 6;
  const activeNum = state.education.activeModuleNum || 3;
  const curLessons = getCurrentModuleLessons(activeNum);
  const curDone = curLessons.filter(l => l.status === 'done').length;
  const curTotal = curLessons.length;
  const frac = curTotal > 0 ? (curDone / curTotal) : 0;

  const rawProgress = Math.round(((completedMods + (completedMods < totalMods ? frac : 0)) / totalMods) * 100);
  state.education.progress = Math.min(100, Math.max(0, rawProgress));
}

function completeLesson(lessonId) {
  const activeNum = state.education.activeModuleNum || 3;
  const lessons = getCurrentModuleLessons(activeNum);
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson || lesson.status === 'done') return;
  lesson.status = 'done';

  const nextPending = lessons.find(l => l.status === 'pending');
  if (nextPending) nextPending.status = 'active';

  // Check if all lessons of this module are now completed
  const doneCount = lessons.filter(l => l.status === 'done').length;
  if (doneCount === lessons.length && lessons.length > 0) {
    const mod = state.education.path.find(p => p.num === activeNum);
    if (mod) mod.status = 'done';

    // Activate next module
    const nextMod = state.education.path.find(p => p.num === activeNum + 1);
    if (nextMod) {
      if (nextMod.status !== 'done') nextMod.status = 'active';
      state.education.activeModuleNum = nextMod.num;
      showToast(`Module ${mod ? mod.name : ''} completed! Now on ${nextMod.name}.`, 'success');
    } else {
      showToast(`Congratulations! You completed all export learning modules!`, 'success');
    }
  } else {
    showToast('Lesson marked completed! Progress updated.', 'success');
  }

  if (activeNum === 3) state.education.lessons = lessons;
  syncEducationProgress();
  saveState(state);
  renderEducation();
}

function uncompleteLesson(lessonId) {
  const activeNum = state.education.activeModuleNum || 3;
  const lessons = getCurrentModuleLessons(activeNum);
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson || lesson.status !== 'done') return;
  lesson.status = 'active';

  // If this module was done, revert it back to active
  const mod = state.education.path.find(p => p.num === activeNum);
  if (mod && mod.status === 'done') {
    mod.status = 'active';
    const nextMod = state.education.path.find(p => p.num === activeNum + 1);
    if (nextMod && nextMod.status === 'active') {
      const nextLessons = getCurrentModuleLessons(nextMod.num);
      const nextDone = nextLessons.filter(l => l.status === 'done').length;
      if (nextDone === 0) nextMod.status = 'pending';
    }
  }

  if (activeNum === 3) state.education.lessons = lessons;
  syncEducationProgress();
  saveState(state);
  showToast('Lesson marked undone. Progress updated.', 'info');
  renderEducation();
}

function completeModule(moduleKey) {
  let targetNum = state.education.activeModuleNum || 3;
  if (moduleKey === 'hs' || moduleKey === 'sps') targetNum = 3;
  else if (moduleKey === 'incoterms') targetNum = 2;
  else if (moduleKey === 'docs') targetNum = 6;
  else if (typeof moduleKey === 'number') targetNum = moduleKey;

  const mod = state.education.path.find(p => p.num === targetNum);
  if (mod) {
    mod.status = 'done';
    const lessons = getCurrentModuleLessons(targetNum);
    lessons.forEach(l => l.status = 'done');
    if (targetNum === 3) state.education.lessons = lessons;

    const nextMod = state.education.path.find(p => p.num === targetNum + 1);
    if (nextMod && nextMod.status === 'pending') {
      nextMod.status = 'active';
      state.education.activeModuleNum = nextMod.num;
    }

    if (typeof moduleKey === 'string') {
      if (!state.education.completedArticles) state.education.completedArticles = [];
      if (!state.education.completedArticles.includes(moduleKey)) {
        state.education.completedArticles.push(moduleKey);
      }
    }
  }

  syncEducationProgress();
  saveState(state);
  showToast(`Module ${mod ? mod.name : ''} completed! Learning path updated.`, 'success');
  renderEducation();
}

function uncompleteModule(moduleKey) {
  let targetNum = state.education.activeModuleNum || 3;
  if (moduleKey === 'hs' || moduleKey === 'sps') targetNum = 3;
  else if (moduleKey === 'incoterms') targetNum = 2;
  else if (moduleKey === 'docs') targetNum = 6;
  else if (moduleKey === 'catalog') targetNum = 4;
  else if (moduleKey === 'esg') targetNum = 5;
  else if (typeof moduleKey === 'number') targetNum = moduleKey;

  // Remove from completedArticles
  if (typeof moduleKey === 'string' && state.education.completedArticles) {
    state.education.completedArticles = state.education.completedArticles.filter(k => k !== moduleKey);
  }

  // Check if any other articles remain done for this module
  const hasRemainingArticles = (state.education.completedArticles || []).some(k => {
    if (targetNum === 3) return k === 'hs' || k === 'sps';
    if (targetNum === 2) return k === 'incoterms';
    if (targetNum === 6) return k === 'docs';
    if (targetNum === 4) return k === 'catalog';
    if (targetNum === 5) return k === 'esg';
    return false;
  });

  const mod = state.education.path.find(p => p.num === targetNum);
  if (mod && !hasRemainingArticles) {
    mod.status = 'active';
    state.education.activeModuleNum = targetNum;

    // Reset last done lesson of this module back to active
    const lessons = getCurrentModuleLessons(targetNum);
    if (lessons.length > 0) {
      for (let i = lessons.length - 1; i >= 0; i--) {
        if (lessons[i].status === 'done') {
          lessons[i].status = 'active';
          break;
        }
      }
      if (targetNum === 3) state.education.lessons = lessons;
    }

    // Revert next module if it was activated by completing this one
    const nextMod = state.education.path.find(p => p.num === targetNum + 1);
    if (nextMod && nextMod.status === 'active') {
      const nextLessons = getCurrentModuleLessons(nextMod.num);
      const nextDone = nextLessons.filter(l => l.status === 'done').length;
      if (nextDone === 0) nextMod.status = 'pending';
    }
  }

  syncEducationProgress();
  saveState(state);
  showToast(`Status modul ${mod ? mod.name : ''} berhasil dibatalkan.`, 'info');
  renderEducation();
}

window.selectEducationModule = selectEducationModule;
window.completeLesson = completeLesson;
window.uncompleteLesson = uncompleteLesson;
window.completeModule = completeModule;
window.uncompleteModule = uncompleteModule;
window.renderEducation = renderEducation;

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

function calculateCubicBezier(p0, p1, p2, p3, param) {
  const cX = 3 * (p1.x - p0.x), bX = 3 * (p2.x - p1.x) - cX, aX = p3.x - p0.x - cX - bX;
  const cY = 3 * (p1.y - p0.y), bY = 3 * (p2.y - p1.y) - cY, aY = p3.y - p0.y - cY - bY;
  const x = (aX * Math.pow(param, 3)) + (bX * Math.pow(param, 2)) + (cX * param) + p0.x;
  const y = (aY * Math.pow(param, 3)) + (bY * Math.pow(param, 2)) + (cY * param) + p0.y;
  return { x: Math.round(x), y: Math.round(y) };
}

function trackShipment(shipId) {
  const ship = state.shipments.find(s => s.id === shipId);
  if (!ship) return;
  const panel = document.getElementById('tracking-panel');
  if (!panel) return;

  const cfg = ROUTE_CONFIGS[ship.destination] || ROUTE_CONFIGS['Japan'];
  const t = Math.max(0, Math.min(1, (ship.progress || 0) / 100));
  const shipPos = calculateCubicBezier(cfg.p0, cfg.p1, cfg.p2, cfg.p3, t);
  const nextPos = calculateCubicBezier(cfg.p0, cfg.p1, cfg.p2, cfg.p3, Math.min(1, t + 0.02));
  const angle = Math.round(Math.atan2(nextPos.y - shipPos.y, nextPos.x - shipPos.x) * 180 / Math.PI);
  const completedNm = Math.round(cfg.totalNm * t);
  const events = buildTrackingEvents(ship);

  panel.innerHTML = `
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
            <polygon points="-20,0 -5,4 0,0 5,-4" fill="#94a3b8"/>
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
  const destName = ship.destination || 'Japan';
  const cfg = ROUTE_CONFIGS[destName] || ROUTE_CONFIGS['Japan'];

  const baseEvents = [
    { time: 'Oct 15, 09:30', title: 'Order & Export Declaration (PEB)', place: 'Surabaya, Indonesia' },
    { time: 'Oct 18, 14:20', title: 'Loaded & Departed', place: `${cfg.origin.name} (${cfg.origin.city})` },
    { time: 'Oct 20, 08:00', title: ship.status === 'Delayed' ? 'Vessel Delayed · Bunkering Queue' : 'In Maritime Transit', place: cfg.currentSea },
    { time: 'Oct 26, 16:45', title: 'Port Clearance & Discharge', place: `${cfg.dest.name} (${cfg.dest.city})` },
    { time: 'Oct 28, 11:00', title: 'Customs Cleared & Delivered', place: `${cfg.dest.city} Buyer Distribution Center` }
  ];
  const statusOrder = { 'Picked Up': 1, 'In Transit': 2, 'Arrived': 3, 'Delivered': 4, 'Delayed': 2 };
  const curIdx = statusOrder[ship.status] || 0;
  return baseEvents.map((e, i) => ({
    ...e,
    state: i < curIdx ? 'done' : i === curIdx ? 'active' : ''
  }));
}
window.trackShipment = trackShipment;

/* ---------- ADMIN ACTIONS ---------- */
function approveCert(certId) {
  const cert = state.certifications.find(c => c.id === certId);
  if (!cert) return;
  cert.status = 'approved';
  saveState(state);
  showToast(`Certification ${cert.type} for ${cert.MSMEs} approved.`, 'success');
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
  showToast(`Financing $${fin.amount.toLocaleString()} for ${fin.MSMEs} approved.`, 'success');
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
  const q = (query || '').toLowerCase().trim();
  const activeBtn = document.querySelector('[data-market-filter].active, [data-filter-btn].active');
  const activeCat = activeBtn ? (activeBtn.getAttribute('data-market-filter') || activeBtn.getAttribute('data-filter-btn')) : 'all';

  const groups = document.querySelectorAll('[data-market-group]');
  let totalMatches = 0;

  groups.forEach(sec => {
    const groupName = sec.getAttribute('data-market-group');
    if (activeCat !== 'all' && groupName !== activeCat) {
      sec.style.display = 'none';
      return;
    }

    const cards = sec.querySelectorAll('[data-market-card]');
    let groupMatches = 0;

    cards.forEach(card => {
      const text = (card.getAttribute('data-search') || card.textContent || '').toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = '';
        groupMatches++;
        totalMatches++;
      } else {
        card.style.display = 'none';
      }
    });

    if (groupMatches === 0 && q) {
      sec.style.display = 'none';
    } else {
      sec.style.display = 'block';
    }
  });

  const emptyState = document.getElementById('markets-empty-state');
  if (emptyState) {
    emptyState.style.display = totalMatches === 0 ? 'block' : 'none';
  }
}

function filterMarkets(category) {
  const currentCategory = category || 'all';

  // 1. Update filter tab buttons
  document.querySelectorAll('[data-market-filter], [data-filter-btn]').forEach(b => {
    const btnCat = b.getAttribute('data-market-filter') || b.getAttribute('data-filter-btn');
    b.classList.toggle('active', btnCat === currentCategory);
  });

  // 2. Clear search box on category tab switch to prevent accidental empty filters
  const searchInput = document.querySelector('[data-market-search], .app-content input[placeholder*="Search markets"]');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
  }

  // 3. Toggle market category groups
  const groups = document.querySelectorAll('[data-market-group]');
  let visibleCardsCount = 0;

  groups.forEach(sec => {
    const groupName = sec.getAttribute('data-market-group');
    const isVisible = (currentCategory === 'all' || groupName === currentCategory);
    sec.style.display = isVisible ? 'block' : 'none';
    if (isVisible) {
      sec.querySelectorAll('[data-market-card]').forEach(card => {
        card.style.display = '';
        visibleCardsCount++;
      });
    }
  });

  // 4. Toggle empty state
  const emptyState = document.getElementById('markets-empty-state');
  if (emptyState) {
    emptyState.style.display = visibleCardsCount === 0 ? 'block' : 'none';
  }
}

function initMarketsPage() {
  document.querySelectorAll('[data-market-filter], [data-filter-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-market-filter') || btn.getAttribute('data-filter-btn');
      filterMarkets(cat);
    });
  });

  filterMarkets('all');
}

window.filterMarkets = filterMarkets;
window.searchMarkets = searchMarkets;
window.initMarketsPage = initMarketsPage;

function filterPartners(category) {
  const currentCategory = category || 'all';

  // 1. Update filter tab buttons
  document.querySelectorAll('[data-partner-filter]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-partner-filter') === currentCategory);
  });

  // 2. Update sidebar category row highlight if present
  document.querySelectorAll('[data-sidebar-cat]').forEach(row => {
    const isMatch = row.getAttribute('data-sidebar-cat') === currentCategory;
    row.style.borderColor = isMatch ? 'var(--emerald)' : 'transparent';
    row.style.background = isMatch ? 'var(--mint-soft)' : 'var(--mint-bg)';
  });

  // 3. Clear search box on category tab switch to prevent accidental empty filters
  const searchInput = document.querySelector('[data-partner-search]');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
  }

  // 4. Toggle category groups
  const groups = document.querySelectorAll('[data-category-group]');
  let visibleCardsCount = 0;

  groups.forEach(sec => {
    const groupName = sec.getAttribute('data-category-group');
    const isVisible = (currentCategory === 'all' || groupName === currentCategory);
    sec.style.display = isVisible ? 'block' : 'none';
    if (isVisible) {
      sec.querySelectorAll('[data-partner-card]').forEach(card => {
        card.style.display = '';
        visibleCardsCount++;
      });
    }
  });

  // 5. Toggle recommended tools section (visible on 'all')
  const recoSec = document.querySelector('[data-recommended-section]');
  if (recoSec) {
    recoSec.style.display = (currentCategory === 'all') ? 'block' : 'none';
  }

  // 6. Empty state toggle
  const emptyState = document.getElementById('partners-empty-state');
  if (emptyState) {
    emptyState.style.display = visibleCardsCount === 0 ? 'block' : 'none';
  }
}

function searchPartners(query) {
  const q = (query || '').toLowerCase().trim();
  const activeBtn = document.querySelector('[data-partner-filter].active');
  const activeCat = activeBtn ? activeBtn.getAttribute('data-partner-filter') : 'all';

  const groups = document.querySelectorAll('[data-category-group]');
  let totalMatches = 0;

  groups.forEach(sec => {
    const groupName = sec.getAttribute('data-category-group');
    if (activeCat !== 'all' && groupName !== activeCat) {
      sec.style.display = 'none';
      return;
    }

    const cards = sec.querySelectorAll('[data-partner-card]');
    let groupMatches = 0;

    cards.forEach(card => {
      const text = (card.getAttribute('data-search') || card.textContent || '').toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = '';
        groupMatches++;
        totalMatches++;
      } else {
        card.style.display = 'none';
      }
    });

    if (groupMatches === 0 && q) {
      sec.style.display = 'none';
    } else {
      sec.style.display = 'block';
    }
  });

  const recoSec = document.querySelector('[data-recommended-section]');
  if (recoSec) {
    recoSec.style.display = (activeCat === 'all' && !q) ? 'block' : 'none';
  }

  const emptyState = document.getElementById('partners-empty-state');
  if (emptyState) {
    emptyState.style.display = totalMatches === 0 ? 'block' : 'none';
  }
}

window.filterPartners = filterPartners;
window.searchPartners = searchPartners;

function simCalcFinance() {
  const val = parseFloat(document.getElementById('sim-contract-val')?.value) || 0;
  const pct = parseFloat(document.getElementById('sim-type')?.value) || 0.8;
  const res = document.getElementById('sim-advance-res');
  if (res) {
    const advance = Math.round(val * pct);
    res.textContent = '$' + advance.toLocaleString('en-US') + ' USD';
  }
}
window.simCalcFinance = simCalcFinance;

/* ---------- AI MARKET FINDER ---------- */
function aiMarketFinder() {
  const commodity = state.onboarding.commodity || 'Arabica Coffee';
  const recommendations = getAIRecommendations(commodity);
  const panel = document.getElementById('ai-result');
  if (!panel) return;
  panel.innerHTML = recommendations.map(r => `
    <div class="ai-result-item">
      <div class="flag code-badge">${r.code}</div>
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
    'Coffee': [
      { country: 'Japan', code: 'JP', score: 94, reason: 'High demand for specialty coffee' },
      { country: 'Germany', code: 'DE', score: 89, reason: 'Largest EU coffee consumer & market' },
      { country: 'United States', code: 'US', score: 84, reason: 'Premium single-origin trend' }
    ],
    'Arabica Coffee': [
      { country: 'Japan', code: 'JP', score: 94, reason: 'High demand for specialty Arabica' },
      { country: 'Germany', code: 'DE', score: 88, reason: 'Largest EU coffee market' },
      { country: 'United States', code: 'US', score: 82, reason: 'Premium single-origin trend' }
    ],
    'Robusta Coffee': [
      { country: 'Germany', code: 'DE', score: 91, reason: 'Major Robusta importer' },
      { country: 'Italy', code: 'IT', score: 86, reason: 'Espresso blend demand' },
      { country: 'Vietnam', code: 'VN', score: 78, reason: 'Regional processing hub' }
    ],
    'Coconut Sugar': [
      { country: 'Netherlands', code: 'NL', score: 92, reason: 'EU organic food gateway' },
      { country: 'United States', code: 'US', score: 85, reason: 'Healthy sweetener trend' },
      { country: 'Japan', code: 'JP', score: 79, reason: 'Natural food demand' }
    ],
    'Palm Oil': [
      { country: 'India', code: 'IN', score: 95, reason: "World's largest importer" },
      { country: 'China', code: 'CN', score: 88, reason: 'Food industry demand' },
      { country: 'Netherlands', code: 'NL', score: 74, reason: 'EU refining hub' }
    ],
    'Cocoa Beans': [
      { country: 'United States', code: 'US', score: 92, reason: 'Strong cocoa processing market' },
      { country: 'Netherlands', code: 'NL', score: 89, reason: 'Europe cocoa import hub' },
      { country: 'Germany', code: 'DE', score: 81, reason: 'Chocolate manufacturing' }
    ],
    'Pepper (Black)': [
      { country: 'United States', code: 'US', score: 90, reason: 'Top spice importer' },
      { country: 'Germany', code: 'DE', score: 84, reason: 'Food processing demand' },
      { country: 'Singapore', code: 'SG', score: 78, reason: 'Regional spice trade hub' }
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
    el.textContent = state.currentUser.role === 'admin' ? 'Ecosystem Partner' : 'MSMEs / Exporter';
  });
}

function renderDashboard() {
  if (!state.currentUser || state.currentUser.role !== 'MSMEs') return;
  updateDynamicReadinessScore();
  const score = state.readiness.score;
  document.querySelectorAll('[data-readiness-score]').forEach(el => el.textContent = score + '%');
  const headerEl = document.querySelector('[data-dashboard-header]');
  if (headerEl) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    headerEl.textContent = `${greeting}, ${state.currentUser.name}   |  Your business is ${score}% export-ready`;
  }
  renderImprovementPlan();
  renderExportJourney();
}

function renderReadiness() {
  updateDynamicReadinessScore();
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
  renderImprovementPlan();
}

function renderEducation() {
  const activeNum = state.education.activeModuleNum || 3;
  const currentModule = (state.education.path || []).find(p => p.num === activeNum) || state.education.path[2] || { name: 'Customs', num: 3, status: 'active' };
  const lessons = getCurrentModuleLessons(activeNum);
  const doneLessons = lessons.filter(l => l.status === 'done').length;
  const totalLessons = lessons.length;
  const lessonPct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;

  // Active module title in card header
  document.querySelectorAll('[data-edu-active-title]').forEach(el => el.textContent = currentModule.name);

  // Overall progress and completed modules
  document.querySelectorAll('[data-edu-progress]').forEach(el => el.textContent = state.education.progress + '%');
  document.querySelectorAll('[data-edu-completed]').forEach(el => el.textContent = state.education.completedModules);
  document.querySelectorAll('[data-edu-progress-bar]').forEach(el => {
    const bar = el.querySelector('.progress-bar') || el;
    bar.style.width = state.education.progress + '%';
  });

  // Dynamic lesson summary and progress bar
  document.querySelectorAll('[data-edu-lessons-summary]').forEach(el => {
    el.textContent = `${doneLessons} of ${totalLessons} lessons completed`;
  });
  document.querySelectorAll('[data-edu-lessons-bar] .progress-bar, [data-edu-lessons-bar].progress-bar').forEach(el => {
    el.style.width = lessonPct + '%';
  });
  document.querySelectorAll('[data-edu-lessons-badge]').forEach(el => {
    if (doneLessons === totalLessons && totalLessons > 0) {
      el.className = 'badge badge-success';
      el.textContent = 'Completed';
    } else if (doneLessons > 0) {
      el.className = 'badge badge-info';
      el.textContent = 'In Progress';
    } else {
      el.className = 'badge badge-muted';
      el.textContent = 'Not Started';
    }
  });

  // Render path stepper with interactivity & animations
  const pathContainer = document.querySelector('[data-edu-path]');
  if (pathContainer) {
    pathContainer.innerHTML = state.education.path.map(p => {
      const isSelected = activeNum === p.num;
      const isDone = p.status === 'done';
      const isActive = p.status === 'active';
      return `
        <div class="step ${isDone ? 'done' : isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}" 
             onclick="ExporE.selectEducationModule(${p.num})" 
             title="Module ${p.num}: ${p.name} (${p.status}) - Click to switch view">
          <div class="step-circle ${isDone ? 'done' : isActive ? 'active' : ''}">
            ${isDone 
              ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' 
              : p.num}
          </div>
          <div class="step-label">${p.name}</div>
          ${p.num < 6 ? `<div class="step-line ${isDone ? 'done' : ''}"></div>` : ''}
        </div>
      `;
    }).join('');

    // Indicator label below stepper
    const existing = pathContainer.parentNode.querySelector('.stepper-current-label');
    if (existing) existing.remove();
    const label = document.createElement('div');
    label.className = 'stepper-current-label';
    const statusText = currentModule.status === 'done' ? 'Completed' : currentModule.status === 'active' ? 'In Progress' : 'Pending';
    const statusBadge = currentModule.status === 'done' ? 'badge-success' : currentModule.status === 'active' ? 'badge-warning' : 'badge-muted';
    label.innerHTML = `Viewing module: <strong>${currentModule.name}</strong> (Step ${currentModule.num} of ${state.education.path.length}) · <span class="badge ${statusBadge}">${statusText}</span> <span class="text-muted fs-11" style="margin-left:6px;">(Click circles to explore other modules)</span>`;
    pathContainer.parentNode.insertBefore(label, pathContainer.nextSibling);
  }

  // Render lessons
  const lessonsContainer = document.querySelector('[data-edu-lessons]');
  if (lessonsContainer) {
    lessonsContainer.innerHTML = lessons.map(l => `
      <div class="lesson-row ${l.status === 'done' ? 'done' : ''}">
        <div class="lesson-icon">${l.status === 'done' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'}</div>
        <div class="lesson-info">
          <div class="lesson-title">${l.title}</div>
          <div class="lesson-sub">${l.duration}</div>
        </div>
        <div class="lesson-status">${l.status === 'done' ? 'Completed' : l.status === 'active' ? 'In Progress' : 'Not Started'}</div>
        ${l.status === 'done' 
          ? `<button class="btn btn-sm btn-ghost" onclick="ExporE.uncompleteLesson('${l.id}')">Mark Undone</button>` 
          : `<button class="btn btn-sm btn-primary" onclick="ExporE.completeLesson('${l.id}')">Mark Done</button>`}
      </div>
    `).join('');
  }

  // Guidance Articles completion badges
  const completedArticles = state.education.completedArticles || [];
  document.querySelectorAll('[data-article-badge]').forEach(el => {
    const key = el.getAttribute('data-article-badge');
    const isDone = completedArticles.includes(key);
    if (isDone) {
      el.className = 'badge-done-container';
      el.innerHTML = `
        <span class="badge badge-success">Completed</span>
        <button type="button" class="btn-undo-badge" onclick="event.stopPropagation(); ExporE.uncompleteModule('${key}');" title="Batal Selesai / Mark Incomplete">
          ✕ Batal
        </button>
      `;
    } else {
      el.className = '';
      el.innerHTML = '';
    }
  });

  // Dynamic modal footers for guidance articles
  const articleKeys = ['hs', 'sps', 'incoterms', 'docs', 'catalog', 'esg'];
  articleKeys.forEach(key => {
    const footer = document.querySelector(`[data-article-footer="${key}"]`);
    if (footer) {
      const isDone = completedArticles.includes(key);
      const modalId = `article-${key}`;
      if (isDone) {
        footer.innerHTML = `
          <button class="btn btn-ghost" onclick="ExporE.closeModal('${modalId}')">Close</button>
          <button class="btn btn-outline" style="color:#ef4444; border-color:rgba(239, 68, 68, 0.4);" onclick="ExporE.uncompleteModule('${key}'); ExporE.closeModal('${modalId}');">
            ✕ Batal Selesai
          </button>
        `;
      } else {
        footer.innerHTML = `
          <button class="btn btn-ghost" onclick="ExporE.closeModal('${modalId}')">Cancel</button>
          <button class="btn btn-primary" onclick="ExporE.completeModule('${key}'); ExporE.closeModal('${modalId}');">
            Complete Module
          </button>
        `;
      }
    }
  });
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
          <td class="cell-strong">${c.MSMEs}</td>
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
          <td class="cell-strong">${f.MSMEs}</td>
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

function toggleSidebarDropdown(trigger) {
  const dropdown = trigger ? trigger.closest('.sidebar-dropdown') : null;
  if (!dropdown) return;
  dropdown.classList.toggle('open');
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

  // Initialize stat counters animation (from 0 to target)
  initCounters();

  // Initialize staggered scroll reveal animation for cards
  initScrollReveal();
});

/* ---------- STAT COUNTERS ANIMATION ---------- */
function parseCounterTarget(text) {
  const clean = (text || '').trim();
  const match = clean.match(/^([^\d.]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;
  const prefix = match[1] || '';
  const numRaw = match[2].replace(/,/g, '');
  const suffix = match[3] || '';
  const val = parseFloat(numRaw);
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
  return { target: val, prefix, suffix, decimals };
}

function animateCounter(el, target, duration = 1800, decimals = 0, prefix = '', suffix = '') {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Smooth ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;

    let formatted;
    if (decimals > 0) {
      formatted = current.toFixed(decimals);
    } else {
      formatted = Math.floor(current).toLocaleString('en-US');
    }

    el.textContent = `${prefix}${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      const finalFormatted = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('en-US');
      el.textContent = `${prefix}${finalFormatted}${suffix}`;
    }
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const elements = document.querySelectorAll('[data-counter], .hero-stat-num');
  if (!elements.length) return;

  function run(el) {
    if (el._hasAnimatedCounter) return;
    el._hasAnimatedCounter = true;

    let target = parseFloat(el.getAttribute('data-counter'));
    let prefix = el.getAttribute('data-prefix');
    let suffix = el.getAttribute('data-suffix');
    let decimals = parseInt(el.getAttribute('data-decimals'), 10);
    let duration = parseInt(el.getAttribute('data-duration'), 10) || 1800;

    if (isNaN(target)) {
      const parsed = parseCounterTarget(el.textContent);
      if (parsed) {
        target = parsed.target;
        if (prefix === null) prefix = parsed.prefix;
        if (suffix === null) suffix = parsed.suffix;
        if (isNaN(decimals)) decimals = parsed.decimals;
      }
    }

    if (!isNaN(target)) {
      prefix = prefix || '';
      suffix = suffix || '';
      decimals = isNaN(decimals) ? 0 : decimals;
      const initial = decimals > 0 ? (0).toFixed(decimals) : '0';
      el.textContent = `${prefix}${initial}${suffix}`;
      animateCounter(el, target, duration, decimals, prefix, suffix);
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          run(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(run);
  }
}

/* ---------- SCROLL REVEAL STAGGER ANIMATION ---------- */
function initScrollReveal() {
  const cards = document.querySelectorAll('.card-feature, #features .card, .stat-card');
  if (!cards.length) return;

  cards.forEach(card => card.classList.add('reveal-card'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          obs.unobserve(card);

          // Calculate index among siblings for natural stagger delay (slow-motion wave)
          const parent = card.parentElement;
          let delay = 0;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.reveal-card'));
            const idx = siblings.indexOf(card);
            if (idx > 0) delay = idx * 220; // 220ms slow-motion stagger between cards
          }

          card.style.transitionDelay = `${delay}ms`;
          requestAnimationFrame(() => {
            card.classList.add('revealed');
            // Clear transition-delay after reveal so hover transitions are immediate
            setTimeout(() => {
              card.style.transitionDelay = '';
            }, delay + 1150);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add('revealed'));
  }
}

/* ---------- ECOSYSTEM PAGE INIT ---------- */
function initEcosystemPage() {
  document.querySelectorAll('[data-partner-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-partner-filter');
      filterPartners(cat);
    });
  });

  document.querySelectorAll('[data-sidebar-cat]').forEach(row => {
    row.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = row.getAttribute('data-sidebar-cat');
      filterPartners(cat);
    });
  });

  filterPartners('all');
}

window.initEcosystemPage = initEcosystemPage;

/* ---------- PAGE INIT HOOK ---------- */
function pageInit(pageName) {
  renderUserInfo();
  if (pageName === 'dashboard') { renderDashboard(); }
  if (pageName === 'readiness') { renderReadiness(); }
  if (pageName === 'education') { renderEducation(); }
  if (pageName === 'markets') { initMarketsPage(); }
  if (pageName === 'ecosystem') { initEcosystemPage(); }
  if (pageName === 'sustainability') { renderSustainability(); }
  if (pageName === 'my-export') {
    renderShipments('shipments-tbody');
    renderPerformance();
    if (state.shipments && state.shipments.length > 0) {
      trackShipment(state.shipments[0].id);
    }
  }
  if (pageName === 'my-business') { renderShipments('business-shipments-tbody'); renderPerformance(); }
  if (pageName === 'admin') { renderAdmin(); }
}

/* Expose to window */
window.ExporE = {
  state, saveState, loadState,
  login, register, demoLogin, logout, requireAuth,
  onboardingGo, onboardingSaveField, onboardingToggleCert, onboardingComplete, getHsCode,
  getOnboardingProducts, addOnboardingProduct, removeOnboardingProduct, setPrimaryOnboardingProduct,
  switchTab, openModal, closeModal,
  updateDonut, updateProgress,
  toggleSustain, renderSustainability,
  togglePlanTask, renderImprovementPlan, renderExportJourney, updateDynamicReadinessScore,
  selectEducationModule, completeLesson, uncompleteLesson, completeModule, uncompleteModule, renderEducation,
  addShipment, updateShipmentStatus, trackShipment,
  approveCert, rejectCert, approveFinance, rejectFinance, adminUpdateShipment,
  searchMarkets, filterMarkets, searchPartners, filterPartners, initMarketsPage, initEcosystemPage,
  aiMarketFinder,
  showToast, toggleSidebar, closeSidebar, toggleSidebarDropdown, toggleNav, closeNav, pageInit,
  calcReadinessScore, initCounters, animateCounter, initScrollReveal
};