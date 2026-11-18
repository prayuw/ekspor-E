const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/script.js', 'utf8');

const badges = {};
const footers = {};

function createMockNode(name = '') {
  return {
    innerHTML: '',
    className: '',
    style: {},
    classList: { add: () => {}, remove: () => {} },
    remove: () => {},
    getAttribute: (attr) => null,
    setAttribute: () => {},
    querySelector: () => createMockNode('sub'),
    querySelectorAll: () => [],
    nextSibling: null,
    parentNode: {
      querySelector: () => createMockNode('parentSub'),
      appendChild: () => {},
      insertBefore: () => {}
    }
  };
}

const mockDoc = {
  getElementById: () => createMockNode('id'),
  querySelectorAll: (selector) => {
    if (selector === '[data-article-badge]') {
      return Object.keys(badges).map(k => ({
        getAttribute: (attr) => attr === 'data-article-badge' ? k : null,
        get innerHTML() { return badges[k].innerHTML; },
        set innerHTML(v) { badges[k].innerHTML = v; },
        get className() { return badges[k].className; },
        set className(v) { badges[k].className = v; }
      }));
    }
    return [];
  },
  querySelector: (selector) => {
    if (selector.includes('data-article-badge')) {
      const match = selector.match(/data-article-badge="([^"]+)"/);
      if (match) {
        const k = match[1];
        if (!badges[k]) badges[k] = { className: '', innerHTML: '' };
        return badges[k];
      }
    }
    if (selector.includes('data-article-footer')) {
      const match = selector.match(/data-article-footer="([^"]+)"/);
      if (match) {
        const k = match[1];
        if (!footers[k]) footers[k] = { className: '', innerHTML: '' };
        return footers[k];
      }
    }
    return createMockNode(selector);
  },
  createElement: () => createMockNode('el'),
  addEventListener: () => {}
};

badges['hs'] = { className: '', innerHTML: '' };
badges['sps'] = { className: '', innerHTML: '' };
badges['incoterms'] = { className: '', innerHTML: '' };
badges['docs'] = { className: '', innerHTML: '' };
footers['hs'] = { className: '', innerHTML: '' };
footers['sps'] = { className: '', innerHTML: '' };

const mockWindow = {
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; }
  },
  location: { reload: () => {} },
  document: mockDoc,
  addEventListener: () => {}
};

const context = vm.createContext({
  window: mockWindow,
  document: mockDoc,
  localStorage: mockWindow.localStorage,
  console: console,
  setTimeout: setTimeout
});

vm.runInContext(code, context);

// Test 1: Complete module 'hs'
console.log('--- TEST 1: Complete hs ---');
context.completeModule('hs');
console.log('Badge hs HTML:', badges['hs'].innerHTML);
console.log('Footer hs HTML:', footers['hs'].innerHTML);
console.log('Completed articles:', context.window.ExporE.state.education.completedArticles);
console.log('Progress:', context.window.ExporE.state.education.progress);

// Test 2: Uncomplete module 'hs'
console.log('\n--- TEST 2: Uncomplete hs ---');
context.uncompleteModule('hs');
console.log('Badge hs HTML after uncomplete:', badges['hs'].innerHTML);
console.log('Badge hs className after uncomplete:', badges['hs'].className);
console.log('Footer hs HTML after uncomplete:', footers['hs'].innerHTML);
console.log('Completed articles after uncomplete:', context.window.ExporE.state.education.completedArticles);
console.log('Progress after uncomplete:', context.window.ExporE.state.education.progress);
console.log('Module 3 status:', context.window.ExporE.state.education.path.find(p => p.num === 3).status);
