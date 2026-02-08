const CACHE_NAME = "bible-study-v150";

// Install: Take over immediately
self.addEventListener("install", (event) => {
  console.log("[SW] Installing:", CACHE_NAME);
  self.skipWaiting();
});

// Activate: Clean old caches, take control
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating:", CACHE_NAME);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => {
          console.log("[SW] Removing old cache:", k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Network-first, cache as fallback for offline
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  // Hashed assets are immutable - cache-first is safe
  if (url.pathname.startsWith("/assets/")) {
    return cacheFirst(request);
  }

  // Everything else: network-first
  return networkFirst(request);
}

// Network-first: Always try live version, cache for offline
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    // Cache successful responses for offline use
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Offline - try cache
    const cached = await caches.match(request);
    if (cached) return cached;

    // For navigation, serve cached index.html (SPA)
    if (request.mode === "navigate") {
      const index = await caches.match("/index.html");
      if (index) return index;
    }

    return new Response("Offline", { status: 503 });
  }
}

// Cache-first: For immutable hashed assets only
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    return new Response("Offline", { status: 503 });
  }
}
