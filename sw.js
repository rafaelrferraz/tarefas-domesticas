const CACHE_NAME = 'tarefas-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// Não intercepta chamadas à API, só cache de assets
self.addEventListener('fetch', (e) => {
  // Se for API (Worker Cloudflare), deixa passar direto pra rede!
  if (
    e.request.url.startsWith('https://misty-rain-cbc7.rafaelrferraz.workers.dev')
    || e.request.url.includes('/exec')
  ) {
    return; // não responde com cache!
  }
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
