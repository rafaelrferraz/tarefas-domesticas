const CACHE_NAME = 'tarefas-v1';
const ASSETS = [
  './',               // <--- IMPORTANTE: Adicionei isso. Representa a "raiz" do site.
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

self.addEventListener('fetch', (e) => {
  // Estratégia: Tenta o Cache primeiro, se não tiver, vai pra Internet
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
