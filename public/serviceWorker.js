const CACHE_NAME = "bible-study-v152";

const ALL_BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1Samuel","2Samuel","1Kings","2Kings","1Chronicles","2Chronicles","Ezra","Nehemiah",
  "Esther","Job","Psalms","Proverbs","Ecclesiastes","SongofSolomon","Isaiah","Jeremiah",
  "Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah",
  "Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke",
  "John","Acts","Romans","1Corinthians","2Corinthians","Galatians","Ephesians",
  "Philippians","Colossians","1Thessalonians","2Thessalonians","1Timothy","2Timothy",
  "Titus","Philemon","Hebrews","James","1Peter","2Peter","1John","2John","3John",
  "Jude","Revelation"
];

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

  // Skip service worker file - must not cache itself
  if (request.url.endsWith('/serviceWorker.js')) return;

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

// Background prefetch: cache all Bible books that aren't already cached
async function prefetchBooks() {
  const cache = await caches.open(CACHE_NAME);
  let cached = 0;
  let skipped = 0;

  for (const book of ALL_BOOKS) {
    const url = `/books/${book}.json`;
    const existing = await cache.match(url);
    if (existing) {
      skipped++;
      continue;
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
        cached++;
      }
    } catch (e) {
      // Offline or failed — stop prefetching, user can retry later
      console.log("[SW] Prefetch stopped (offline?), cached", cached, "books");
      return;
    }
  }

  console.log("[SW] Prefetch complete:", cached, "new,", skipped, "already cached");
}

// Listen for prefetch message from the client
self.addEventListener("message", (event) => {
  if (event.data === "PREFETCH_BOOKS") {
    event.waitUntil(prefetchBooks());
  }
});

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
