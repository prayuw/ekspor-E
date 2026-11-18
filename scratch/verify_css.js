const fs = require('fs');

// Simple DOM emulation to verify script.js logic on markets.html
const html = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/markets.html', 'utf8');
const scriptContent = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/script.js', 'utf8');

// Check that category-group has fadeIn animation in style.css
const css = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/style.css', 'utf8');
const hasAnimation = css.includes('.category-group') && css.includes('fadeIn');
console.log('Style.css has category-group fadeIn animation:', hasAnimation);

// Check tabs and tab-btn CSS
const hasTabBtn = css.includes('.tab-btn.active') && css.includes('background: var(--emerald)');
console.log('Style.css has .tab-btn.active emerald background:', hasTabBtn);
