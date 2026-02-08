const CACHE_NAME = "bible-study-v146";

const optionalCoreAssets = [
  "/manifest.json",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/favicon.svg",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
];

const bookAssets = [
  "/books/Genesis.json",
  "/books/Exodus.json",
  "/books/Leviticus.json",
  "/books/Numbers.json",
  "/books/Deuteronomy.json",
  "/books/Joshua.json",
  "/books/Judges.json",
  "/books/Ruth.json",
  "/books/1Samuel.json",
  "/books/2Samuel.json",
  "/books/1Kings.json",
  "/books/2Kings.json",
  "/books/1Chronicles.json",
  "/books/2Chronicles.json",
  "/books/Ezra.json",
  "/books/Nehemiah.json",
  "/books/Esther.json",
  "/books/Job.json",
  "/books/Psalms.json",
  "/books/Proverbs.json",
  "/books/Ecclesiastes.json",
  "/books/SongofSolomon.json",
  "/books/Isaiah.json",
  "/books/Jeremiah.json",
  "/books/Lamentations.json",
  "/books/Ezekiel.json",
  "/books/Daniel.json",
  "/books/Hosea.json",
  "/books/Joel.json",
  "/books/Amos.json",
  "/books/Obadiah.json",
  "/books/Jonah.json",
  "/books/Micah.json",
  "/books/Nahum.json",
  "/books/Habakkuk.json",
  "/books/Zephaniah.json",
  "/books/Haggai.json",
  "/books/Zechariah.json",
  "/books/Malachi.json",
  "/books/Matthew.json",
  "/books/Mark.json",
  "/books/Luke.json",
  "/books/John.json",
  "/books/Acts.json",
  "/books/Romans.json",
  "/books/1Corinthians.json",
  "/books/2Corinthians.json",
  "/books/Galatians.json",
  "/books/Ephesians.json",
  "/books/Philippians.json",
  "/books/Colossians.json",
  "/books/1Thessalonians.json",
  "/books/2Thessalonians.json",
  "/books/1Timothy.json",
  "/books/2Timothy.json",
  "/books/Titus.json",
  "/books/Philemon.json",
  "/books/Hebrews.json",
  "/books/James.json",
  "/books/1Peter.json",
  "/books/2Peter.json",
  "/books/1John.json",
  "/books/2John.json",
  "/books/3John.json",
  "/books/Jude.json",
  "/books/Revelation.json",
  "/books/Strong_Dict.json",
  "/map/countries-110m.json",
  "/miracles/miracles.json"
];

// Install event - cache essential assets first, then optional assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Cache index.html first - this MUST succeed
      try {
        await cache.add("/index.html");
        await cache.add("/");
        console.log("✅ Essential assets cached");
      } catch (err) {
        console.error("❌ Failed to cache essential assets:", err);
        throw err; // Fail install if index.html can't be cached
      }

      // Cache other core assets individually (failures are OK)
      for (const asset of optionalCoreAssets) {
        try {
          await cache.add(asset);
          console.log(`✅ Cached: ${asset}`);
        } catch (err) {
          console.warn(`⚠️ Optional asset not cached: ${asset}`, err);
        }
      }

      // Cache book assets in parallel - these can fail individually
      const bookCachePromises = bookAssets.map((url) =>
        cache.add(url).then(
          () => console.log(`✅ Cached: ${url}`),
          (err) => console.warn(`⚠️ Failed to cache ${url}:`, err)
        )
      );

      await Promise.allSettled(bookCachePromises);
      console.log("✅ Book caching completed");

      // Notify clients
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage("books-cached");
      });
    })()
  );
  // Don't skipWaiting - let user decide via toast
});

// Listen for skip waiting message from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Activate event - clean up old caches and take control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      // Take control of all clients immediately
      await self.clients.claim();
      console.log("✅ Service worker activated and claimed clients");
    })()
  );
});

// Check if URL should be cached
const shouldCacheUrl = (url) => {
  const pathname = new URL(url).pathname;
  return (
    pathname.startsWith("/books/") ||
    pathname.startsWith("/map/") ||
    pathname.startsWith("/miracles/") ||
    pathname.startsWith("/assets/") ||
    pathname.endsWith(".json") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".ttf") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".svg")
  );
};

// Fetch event - OFFLINE FIRST (cache-first strategy)
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Handle navigation requests (SPA routing) - always serve index.html
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        // Try cache first
        const cachedIndex = await caches.match("/index.html");
        if (cachedIndex) {
          return cachedIndex;
        }
        // Fallback to network only if not in cache
        try {
          const networkResponse = await fetch(request);
          return networkResponse;
        } catch (error) {
          // If both fail, try root path as last resort
          const cachedRoot = await caches.match("/");
          if (cachedRoot) {
            return cachedRoot;
          }
          // Return a basic offline response
          return new Response(
            "<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your connection and try again.</p></body></html>",
            { headers: { "Content-Type": "text/html" } }
          );
        }
      })()
    );
    return;
  }

  // Handle all other requests - cache first, network fallback
  event.respondWith(
    (async () => {
      // Always check cache first
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // Not in cache - try network
      try {
        const networkResponse = await fetch(request);

        // Cache successful responses for known asset types
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic" &&
          shouldCacheUrl(request.url)
        ) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        // Network failed and not in cache
        console.warn("Offline - no cache for:", request.url);

        // Return appropriate fallback based on request type
        const url = new URL(request.url);

        // For JSON requests, return empty object/array
        if (url.pathname.endsWith(".json")) {
          return new Response("{}", {
            headers: { "Content-Type": "application/json" }
          });
        }

        // For other assets, return 503 Service Unavailable
        return new Response("Offline - resource not cached", {
          status: 503,
          statusText: "Service Unavailable"
        });
      }
    })()
  );
});
