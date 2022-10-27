import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { offlineFallback } from "workbox-recipes";
import { StaleWhileRevalidate } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(() => true, new StaleWhileRevalidate());
offlineFallback({ pageFallback: "/offline.html" });
