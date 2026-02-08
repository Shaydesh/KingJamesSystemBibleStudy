const CACHE_NAME = "bible-study-v149";
const APP_SHELL = ["/", "/index.html"];

// Install: Cache app shell and essential assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing:", CACHE_NAME);
  self.skipWaiting(); // Take over immediately

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache app shell from network (fresh copy)
      for (const url of APP_SHELL) {
        try {
          const response = await fetch(url, { cache: "no-store" });
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (err) {
          console.warn("[SW] Failed to cache:", url);
        }
      }
    })
  );
});

// Activate: Clean old caches, claim clients
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating:", CACHE_NAME);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network-first for HTML, cache-first for assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Navigation requests (HTML pages) - NETWORK FIRST
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Hashed assets (/assets/*) - CACHE FIRST (immutable)
  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Static data (books, maps, etc.) - CACHE FIRST
  if (url.pathname.startsWith("/books/") ||
      url.pathname.startsWith("/map/") ||
      url.pathname.startsWith("/miracles/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else - NETWORK FIRST with cache fallback
  event.respondWith(networkFirst(request));
});

// Network-first: Try network, fall back to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;

    // For navigation, return cached index.html
    if (request.mode === "navigate") {
      const index = await caches.match("/index.html");
      if (index) return index;
    }

    return new Response("Offline", { status: 503 });
  }
}

// Cache-first: Try cache, fall back to network
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
  } catch (err) {
    return new Response("Offline", { status: 503 });
  }
}
