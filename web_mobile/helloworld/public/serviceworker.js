"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CACHE_NAME = "v1";
self.oninstall = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Installing...");
    const cache = yield caches.open(CACHE_NAME);
    yield cache.addAll([
        "/",
        "index.html",
        "offline.html",
        "assets/dn.png",
        "assets/favicon.webp",
    ]);
});
self.onactivate = (event) => {
    console.log("Activating...");
};
self.onfetch = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const p = () => __awaiter(void 0, void 0, void 0, function* () {
        const cache = yield caches.open(CACHE_NAME);
        const cachedResponse = yield cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        if (event.request.mode === "navigate") {
            try {
                const networkResponse = yield fetch(event.request);
                return networkResponse;
            }
            catch (e) {
                console.log("Using cached offline page");
                const offlineResponse = yield cache.match("offline.html");
                return offlineResponse; // Cringe
            }
        }
        const networkResponse = yield fetch(event.request);
        return networkResponse;
        // if (new URL(event.request.url).origin === location.origin) {
        //   await cache.put(event.request, networkResponse.clone());
        // }
    });
    return event.respondWith(p());
});
