const CACHE_NAME = "v1";

self.oninstall = async (event) => {
  console.log("Installing...");
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll([
    "/",
    "index.html",
    "offline.html",
    "assets/dn.png",
    "assets/favicon.webp",
  ]);
};

self.onactivate = (event) => {
  console.log("Activating...");
};

self.onfetch = async (event) => {
  const p = async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    if (event.request.mode === "navigate") {
      try {
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (e) {
        console.log("Using cached offline page");
        const offlineResponse = await cache.match("offline.html");
        return offlineResponse!; // Cringe
      }
    }
    const networkResponse = await fetch(event.request);
    return networkResponse;
    // if (new URL(event.request.url).origin === location.origin) {
    //   await cache.put(event.request, networkResponse.clone());
    // }
  };
  return event.respondWith(p());
};
