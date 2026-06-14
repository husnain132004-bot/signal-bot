self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window'}).then(clientList=>{
      for(const client of clientList){ if('focus' in client) return client.focus(); }
      if(clients.openWindow) return clients.openWindow('./');
    })
  );
});
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(data.title || 'SignalPro Classic', {
    body: data.body || 'New signal!', icon: 'icon-192.png', badge: 'icon-192.png',
    vibrate: [300,100,300,100,300], requireInteraction: true
  }));
});
