async function installServiceWorkerAsync() {
  if ("serviceWorker" in navigator) {
    try {
      let serviceWorker = await navigator.serviceWorker.register("/sw.js");
      console.log(`Service worker registered`, serviceWorker);
    } catch (err) {
      console.error(`Failed to register service worker`, err);
    }
  }
}

if ("serviceWorker" in navigator) {
  installServiceWorkerAsync();
}

const $counter = document.querySelector("#counter");

if ($counter !== null) {
  document
    .querySelector("#counter-inc")
    ?.addEventListener("click", async function (e) {
      $counter.textContent = (
        parseInt($counter.textContent ?? "0") + 1
      ).toString();
    });
  document
    .querySelector("#counter-dec")
    ?.addEventListener("click", async function (e) {
      $counter.textContent = (
        parseInt($counter.textContent ?? "0") - 1
      ).toString();
    });
}
