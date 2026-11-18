const fs = require('fs');

const html = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/markets.html', 'utf8');

console.log('=== TEST 1: Checking Filter Tabs ===');
const tabMatches = html.match(/data-market-filter="([^"]+)"/g) || [];
console.log('Found filter tabs:', tabMatches);
const expectedTabs = ['all', 'agriculture', 'food', 'textile', 'handicraft', 'other'];
expectedTabs.forEach(tab => {
  if (html.includes(`data-market-filter="${tab}"`)) {
    console.log(`  [OK] Tab data-market-filter="${tab}" exists`);
  } else {
    console.error(`  [FAIL] Missing tab for "${tab}"`);
  }
});

console.log('\n=== TEST 2: Checking Category Groups ===');
const groupMatches = html.match(/data-market-group="([^"]+)"/g) || [];
console.log('Found category groups:', groupMatches);
const expectedGroups = ['agriculture', 'food', 'textile', 'handicraft', 'other'];
expectedGroups.forEach(grp => {
  if (html.includes(`data-market-group="${grp}"`)) {
    console.log(`  [OK] Group data-market-group="${grp}" exists`);
  } else {
    console.error(`  [FAIL] Missing group for "${grp}"`);
  }
});

console.log('\n=== TEST 3: Checking Modals for all View Details buttons ===');
const modalOpenCalls = [...html.matchAll(/openModal\('([^']+)'\)/g)].map(m => m[1]);
const uniqueModalCalls = [...new Set(modalOpenCalls)];
console.log('Modals invoked by cards/links:', uniqueModalCalls);

uniqueModalCalls.forEach(modalId => {
  if (html.includes(`id="${modalId}"`)) {
    console.log(`  [OK] Modal #${modalId} exists in HTML`);
  } else {
    console.error(`  [FAIL] Modal #${modalId} referenced but NOT FOUND in HTML!`);
  }
});

console.log('\n=== TEST 4: Script tag and pageInit ===');
console.log('Has script.js?v=2.0:', html.includes('script.js?v=2.0'));
console.log('Has pageInit(\'markets\'):', html.includes("pageInit('markets')"));

console.log('\nAll checks complete!');
