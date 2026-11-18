const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('c:/laragon/www/ekspor-e-prototipe/markets.html', 'utf8');
const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_?&=]+/g;
const urls = [...new Set(html.match(regex) || [])];
console.log('Testing', urls.length, 'unique Unsplash URLs from markets.html:');

Promise.all(urls.map(url => new Promise(resolve => {
  https.get(url, (res) => {
    resolve({ url, status: res.statusCode });
  }).on('error', (err) => {
    resolve({ url, status: 'ERR: ' + err.message });
  });
}))).then(results => {
  results.forEach(r => console.log(r.status, r.url));
});
