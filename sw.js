self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data.json(); } catch(err) { data = {title:'PAXG NW Bot', body: e.data ? e.data.text() : 'New signal!'}; }
  e.waitUntil(
    self.registration.showNotification(data.title || 'PAXG NW Bot', {
      body: data.body || 'New signal!',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      vibrate: [300,100,300,100,300],
      requireInteraction: true,
      tag: 'signal-' + Date.now()
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
      for(const client of list){
        if('focus' in client) return client.focus();
      }
      if(clients.openWindow) return clients.openWindow('./');
    })
  );
});
