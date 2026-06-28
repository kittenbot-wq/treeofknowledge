const CACHE = 'kittenbot-peptide-v3'; // <-- BUMPED TO v3
const ASSETS = [
  './',              // <-- ADDED THIS SO THE ROOT IS CACHED
  './index.html',
  './banner.png',
  './icon192.png',
  './icon512.png',
  './manifest.json'
];

self.addEventListener('install', e => { 
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); 
});

self.addEventListener('activate', e => { 
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); 
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(url.hostname.includes('youtube') || url.hostname.includes('ytimg') || url.hostname.includes('google')) return; 
  
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});