const CACHE_NAME = "bible-study-v142";

const coreAssets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/src/styles/globals.css",
  "/src/fonts/LibreBaskerville-Regular.ttf",
  "/src/fonts/LibreBaskerville-Italic.ttf",
];

// List ALL book JSON files here explicitly:
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

// Install event - cache core assets first, then cache books one by one
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Cache core assets in bulk
      try {
        await cache.addAll(coreAssets);
        console.log("✅ Core assets cached");
      } catch (err) {
        console.error("❌ Error caching core assets:", err);
      }

      // Cache book assets in parallel using Promise.allSettled
      const bookCachePromises = bookAssets.map((url) =>
        cache.add(url).then(
          () => console.log(`✅ Cached book: ${url}`),
          (err) => console.warn(`⚠️ Failed to cache book ${url}:`, err)
        )
      );

      await Promise.allSettled(bookCachePromises);
      console.log("✅ All books caching completed, sending message to clients");

      const clients = await self.clients.matchAll();
      console.log(`✅ Found ${clients.length} clients to notify`);

      clients.forEach((client, index) => {
        console.log(`✅ Sending 'books-cached' message to client ${index + 1}`);
        client.postMessage("books-cached");  // Send message to the clients
      });
    })()
  );

  self.skipWaiting(); // Activate the new service worker immediately
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// URLs that should be cached on-demand (when fetched)
const shouldCacheUrl = (url) => {
  const pathname = new URL(url).pathname;
  return (
    pathname.startsWith("/books/") ||
    pathname.startsWith("/map/") ||
    pathname.startsWith("/miracles/") ||
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

// Fetch event - cache-first with selective caching
self.addEventListener("fetch", (event) => {
  // Handle navigation requests (SPA routing)
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((response) => response || fetch(event.request)).catch(() => caches.match("/index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Only cache valid responses for known asset types
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic" ||
          !shouldCacheUrl(event.request.url)
        ) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    }).catch(() => {
      console.warn("Fetch failed, and no cache match:", event.request.url);
    })
  );
});
