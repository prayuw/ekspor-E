const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/script.js', 'utf8');

const badges = {};
const mockNode = {
  innerHTML: '',
  style: {},
  classList: { add: () => {}, remove: () => {} },
  remove: () => {},
  querySelector: () => mockNode,
  querySelectorAll: () => [],
  nextSibling: null,
  parentNode: {
    querySelector: () => mockNode,
    appendChild: () => {},
    insertBefore: () => {}
  }
};

const mockDoc = {
  getElementById: () => mockNode,
  querySelectorAll: () => [],
  querySelector: (selector) => {
    if (selector.includes('data-article-badge')) {
      const match = selector.match(/data-article-badge="([^"]+)"/);
      if (match) {
        const key = match[1];
        if (!badges[key]) badges[key] = { className: '', textContent: '' };
        return badges[key];
      }
    }
    return mockNode;
  },
  createElement: () => mockNode,
  addEventListener: () => {}
};

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

context.completeModule('hs');

console.log('HS badge text:', badges['hs'] ? badges['hs'].textContent : 'none');
console.log('HS badge class:', badges['hs'] ? badges['hs'].className : 'none');
console.log('Education progress:', context.state.education.progress);
console.log('Completed modules:', context.state.education.completedModules);
