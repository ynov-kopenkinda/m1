const CACHE_NAME = "V1";

/**
 * The install event is fired when the registration succeeds.
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
 */
this.addEventListener("install", async function () {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(["/", "/index.html", "/public/style.css", "/script.js"]);
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const getCustomResponsePromise = async () => {
    console.log(`URL ${event.request.url}`, `location origin ${location}`);
    try {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        console.log(`Cached response ${cachedResponse}`);
        return cachedResponse;
      }
      const netResponse = await fetch(event.request);
      console.log(`adding net response to cache`);
      let cache = await caches.open(CACHE_NAME);
      cache.put(event.request, netResponse.clone());
      return netResponse;
    } catch (err) {
      console.error(`Error ${err}`);
      throw err;
    }
  };

  //In order to override the default fetch behavior, we must provide the result of our custom behavoir to the
  //event.respondWith method
  event.respondWith(getCustomResponsePromise());
});
