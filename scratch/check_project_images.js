const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'c:/laragon/www/ekspor-e-prototipe';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let allUrls = [];
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_?&=]+/g) || [];
  matches.forEach(u => allUrls.push({ file: f, url: u }));
});

const uniqueUrls = [...new Set(allUrls.map(x => x.url))];
console.log(`Checking ${uniqueUrls.length} unique images across all HTML files...`);

Promise.all(uniqueUrls.map(url => new Promise(resolve => {
  https.get(url, res => {
    resolve({ url, status: res.statusCode });
  }).on('error', err => {
    resolve({ url, status: 'ERR' });
  });
}))).then(results => {
  const broken = results.filter(r => r.status !== 200);
  if (broken.length === 0) {
    console.log('All images across all HTML files return 200 OK!');
  } else {
    console.log('Broken images found:', broken);
  }
});
