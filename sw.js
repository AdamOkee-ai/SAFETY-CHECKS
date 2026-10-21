/* Site Safety Checks offline layer: keeps the app, its libraries and fonts on the phone.
   Site data is cached by Firestore; this file never touches it. Bump VERSION on every change. */
const VERSION = 'ssc-2026-10-21-6';
const SHELL = ['./', 'index.html', 'app.js', 'report.js', 'firebase-shim.js', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-180.png'];
const FB = 'https://www.gstatic.com/firebasejs/10.14.1/';
const CDN = [FB + 'firebase-app.js', FB + 'firebase-auth.js', FB + 'firebase-firestore.js',
  'https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/pdfmake.min.js', 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/vfs_fonts.js',
  'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap'];
const RUNTIME = 'ssc-runtime';
const CACHED_HOSTS = ['www.gstatic.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })));
    const r = await caches.open(RUNTIME);
    await Promise.all(CDN.map(async u => { try { const res = await fetch(u, { mode: 'cors' }); if (res.ok) await r.put(u, res); } catch (x) {} }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION && k !== RUNTIME) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('/sw.js')) return;
    // the app: use the network when there is signal so updates arrive, the phone copy when there isn't
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      // always ask GitHub for the latest copy (skips the browser's 10-minute cache), so updates show straight away
      try { const res = await fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })); if (res.ok) c.put(req.mode === 'navigate' ? 'index.html' : new URL(req.url).pathname.split('/').pop() || 'index.html', res.clone()); return res; }
      catch (x) { return (await c.match(req.mode === 'navigate' ? 'index.html' : req, { ignoreSearch: true })) || (await c.match('index.html')) || Response.error(); }
    })());
    return;
  }
  if (CACHED_HOSTS.includes(url.hostname)) {
    e.respondWith((async () => {
      const r = await caches.open(RUNTIME); const hit = await r.match(req);
      if (hit) return hit;
      const res = await fetch(req); if (res.ok || res.type === 'opaque') r.put(req, res.clone()); return res;
    })());
  }
});
