// The app never registers a service worker; this removes one left behind by
// an earlier build so returning visitors are not served stale cached assets.
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch(() => {});
  }
}
