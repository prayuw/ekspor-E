const https = require('https');

const candidates = [
  // Netherlands
  { name: 'NL 1 (Amsterdam canal)', url: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=80' },
  { name: 'NL 2 (Amsterdam bridge)', url: 'https://images.unsplash.com/photo-1584003564911-a7a321c84e1c?auto=format&fit=crop&w=600&q=80' },
  { name: 'NL 3 (Amsterdam canal houses)', url: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&w=600&q=80' },
  { name: 'NL 4 (Netherlands windmill)', url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc398?auto=format&fit=crop&w=600&q=80' },
  { name: 'NL 5 (Amsterdam)', url: 'https://images.unsplash.com/photo-1576924542708-41dfa9e64e5c?auto=format&fit=crop&w=600&q=80' },

  // United Kingdom
  { name: 'UK 1 (London Big Ben)', url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&q=80' },
  { name: 'UK 2 (London Tower Bridge)', url: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&w=600&q=80' },
  { name: 'UK 3 (London Eye / River)', url: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=600&q=80' },
  { name: 'UK 4 (London Red Bus)', url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600&q=80' }
];

Promise.all(candidates.map(item => new Promise(resolve => {
  https.get(item.url, res => {
    resolve({ name: item.name, status: res.statusCode, url: item.url });
  }).on('error', err => {
    resolve({ name: item.name, status: 'ERR: ' + err.message, url: item.url });
  });
}))).then(results => {
  results.forEach(r => console.log(r.status, r.name, r.url));
});
