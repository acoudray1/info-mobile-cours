self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
});
self.addEventListener('activate', event => {
    console.log('Activation du Service Worker...');
});

// termine le précédent SW
// et active immédiatement un nouveau service worker
self.skipWaiting();

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
});