self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil((async () => {
    const targetUrl = event.notification.data && event.notification.data.url
      ? event.notification.data.url
      : "./";
    const allClients = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true
    });
    if(allClients.length){
      const client = allClients[0];
      await client.focus();
      client.postMessage({type: "focus15-notification-click"});
      return;
    }
    if(self.clients.openWindow){
      await self.clients.openWindow(targetUrl);
    }
  })());
});
