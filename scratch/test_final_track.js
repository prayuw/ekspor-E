const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/script.js', 'utf8');

const mockElement = {
  innerHTML: '',
  setAttribute: () => {},
  getAttribute: () => null,
  querySelectorAll: () => [],
  classList: { add: () => {}, remove: () => {} }
};

const mockDoc = {
  getElementById: (id) => {
    if (id === 'tracking-panel') return mockElement;
    return mockElement;
  },
  querySelectorAll: () => [],
  querySelector: () => mockElement,
  addEventListener: () => {}
};

const mockWindow = {
  localStorage: {
    getItem: () => null,
    setItem: () => {}
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

context.trackShipment('EXP-001');

console.log('Panel innerHTML length:', mockElement.innerHTML.length);
console.log('Includes SVG:', mockElement.innerHTML.includes('<svg viewBox="0 0 900 440"'));
console.log('Includes AIS:', mockElement.innerHTML.includes('LIVE AIS MARITIME TRACKING'));
console.log('Includes Tanjung Perak:', mockElement.innerHTML.includes('Tanjung Perak Port'));
console.log('Includes Port of Tokyo:', mockElement.innerHTML.includes('Port of Tokyo'));
console.log('Includes MV Meratus:', mockElement.innerHTML.includes('MV Meratus Nusantara'));
console.log('Includes Stepper:', mockElement.innerHTML.includes('Shipping Progress'));

// Test track other shipments
context.trackShipment('EXP-002');
console.log('EXP-002 (Germany) dest included:', mockElement.innerHTML.includes('Port of Hamburg'));

context.trackShipment('EXP-003');
console.log('EXP-003 (Netherlands) dest included:', mockElement.innerHTML.includes('Port of Rotterdam'));

context.trackShipment('EXP-004');
console.log('EXP-004 (India) dest included:', mockElement.innerHTML.includes('JNPT Mumbai Port'));
