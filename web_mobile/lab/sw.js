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
const CACHE_NAME = "V1";
/**
 * The install event is fired when the registration succeeds.
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
 */
this.addEventListener("install", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const cache = yield caches.open(CACHE_NAME);
        cache.addAll(["/", "/index.html", "/public/style.css", "/script.js"]);
    });
});
self.addEventListener("fetch", (event) => {
    const getCustomResponsePromise = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`URL ${event.request.url}`, `location origin ${location}`);
        try {
            const cachedResponse = yield caches.match(event.request);
            if (cachedResponse) {
                console.log(`Cached response ${cachedResponse}`);
                return cachedResponse;
            }
            const netResponse = yield fetch(event.request);
            console.log(`adding net response to cache`);
            let cache = yield caches.open(CACHE_NAME);
            cache.put(event.request, netResponse.clone());
            return netResponse;
        }
        catch (err) {
            console.error(`Error ${err}`);
            throw err;
        }
    });
    //In order to override the default fetch behavior, we must provide the result of our custom behavoir to the
    //event.respondWith method
    event.respondWith(getCustomResponsePromise());
});
