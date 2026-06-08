self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(data.title || 'Signal Bot', {
    body: data.body || 'New signal!',
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200]
  }));
});
