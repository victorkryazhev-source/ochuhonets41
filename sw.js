// Простой service worker: страница открывается и без интернета после первого визита
var CACHE = 'och41-v1', FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function(e) { e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }).then(function() { return self.skipWaiting(); })); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); }));
});
