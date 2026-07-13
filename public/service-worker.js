// Kill-switch service worker. A previous release registered a Workbox worker
// that precached every HTML page and served stale content after deploys.
// Browsers that still have it will fetch this file on their next visit,
// install it, and it unregisters itself and clears all caches.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
