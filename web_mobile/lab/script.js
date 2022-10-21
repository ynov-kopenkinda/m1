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
var _a, _b;
function installServiceWorkerAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        if ("serviceWorker" in navigator) {
            try {
                let serviceWorker = yield navigator.serviceWorker.register("/sw.js");
                console.log(`Service worker registered`, serviceWorker);
            }
            catch (err) {
                console.error(`Failed to register service worker`, err);
            }
        }
    });
}
if ("serviceWorker" in navigator) {
    installServiceWorkerAsync();
}
const $counter = document.querySelector("#counter");
if ($counter !== null) {
    (_a = document
        .querySelector("#counter-inc")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            $counter.textContent = (parseInt((_a = $counter.textContent) !== null && _a !== void 0 ? _a : "0") + 1).toString();
        });
    });
    (_b = document
        .querySelector("#counter-dec")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            $counter.textContent = (parseInt((_a = $counter.textContent) !== null && _a !== void 0 ? _a : "0") - 1).toString();
        });
    });
}
