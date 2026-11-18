const fs = require('fs');
const vm = require('vm');

const script = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/script.js', 'utf8');

let stored = {};
const dom = {
  stepper: {
    steps: [
      { num: 1, classes: new Set(), circle: { textContent: '', classes: new Set() }, line: { classes: new Set() } },
      { num: 2, classes: new Set(), circle: { textContent: '', classes: new Set() }, line: { classes: new Set() } },
      { num: 3, classes: new Set(), circle: { textContent: '', classes: new Set() }, line: { classes: new Set() } },
      { num: 4, classes: new Set(), circle: { textContent: '', classes: new Set() }, line: { classes: new Set() } },
      { num: 5, classes: new Set(), circle: { textContent: '', classes: new Set() }, line: { classes: new Set() } },
      { num: 6, classes: new Set(), circle: { textContent: '', classes: new Set() }, line: null }
    ]
  },
  banner: {
    classes: new Set(),
    style: {},
    textEl: { innerHTML: '' },
    iconEl: { innerHTML: '', style: {} }
  }
};

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  localStorage: {
    getItem: (k) => stored[k] || null,
    setItem: (k, v) => stored[k] = v
  },
  window: {},
  document: {
    addEventListener: () => {},
    querySelector: (sel) => {
      if (sel.includes('stepper')) return {
        querySelectorAll: () => dom.stepper.steps.map(s => ({
          classList: {
            toggle: (cls, val) => val ? s.classes.add(cls) : s.classes.delete(cls)
          },
          querySelector: (sub) => {
            if (sub.includes('circle')) return {
              classList: { toggle: (cls, val) => val ? s.circle.classes.add(cls) : s.circle.classes.delete(cls) },
              set textContent(v) { s.circle.textContent = v; },
              get textContent() { return s.circle.textContent; }
            };
            if (sub.includes('line')) return s.line ? {
              classList: { toggle: (cls, val) => val ? s.line.classes.add(cls) : s.line.classes.delete(cls) }
            } : null;
            return null;
          }
        }))
      };
      if (sel.includes('banner')) return {
        style: dom.banner.style,
        querySelector: (sub) => {
          if (sub.includes('.ic')) return dom.banner.iconEl;
          return dom.banner.textEl;
        }
      };
      return null;
    },
    querySelectorAll: () => []
  }
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(script, sandbox);

const ExporE = sandbox.window.ExporE;
const state = ExporE.state;

console.log('=== TEST 1: Initial State Check ===');
console.log('Readiness score initial:', state.readiness.score);
const plan = state.readiness.plan;
let initialDone = 0;
plan.forEach(w => w.tasks.forEach(t => { if (t.done) initialDone++; }));
console.log('Initial plan tasks done:', initialDone, 'of 12');

sandbox.renderExportJourney();
console.log('\n[Initial Export Journey Status]');
dom.stepper.steps.forEach(s => {
  console.log(`Step ${s.num}: classes=[${[...s.classes].join(',')}], circle=[${[...s.circle.classes].join(',')}] text='${s.circle.textContent}'`);
});
console.log('Banner text:', dom.banner.textEl.innerHTML);

console.log('\n=== TEST 2: Setting all 12 tasks to done (100%) ===');
plan.forEach(w => w.tasks.forEach(t => t.done = true));
sandbox.updateDynamicReadinessScore();
console.log('New readiness score at 100% plan:', state.readiness.score);
sandbox.renderExportJourney();

console.log('\n[100% Export Journey Status]');
let allDone = true;
dom.stepper.steps.forEach(s => {
  console.log(`Step ${s.num}: classes=[${[...s.classes].join(',')}], circle=[${[...s.circle.classes].join(',')}] text='${s.circle.textContent}'`);
  if (!s.classes.has('done') || !s.circle.classes.has('done')) allDone = false;
});
console.log('Are all 6 steps marked done?', allDone);
console.log('Banner at 100%:', dom.banner.textEl.innerHTML);

console.log('\n=== TEST 3: Unchecking tasks (6 of 12 done) ===');
plan[2].tasks.forEach(t => t.done = false);
plan[3].tasks.forEach(t => t.done = false);
sandbox.updateDynamicReadinessScore();
console.log('Readiness score at 6 tasks done:', state.readiness.score);
sandbox.renderExportJourney();
console.log('\n[Partial Export Journey Status]');
dom.stepper.steps.forEach(s => {
  console.log(`Step ${s.num}: classes=[${[...s.classes].join(',')}], circle=[${[...s.circle.classes].join(',')}] text='${s.circle.textContent}'`);
});
console.log('Banner text:', dom.banner.textEl.innerHTML);
