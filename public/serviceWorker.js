const CACHE_NAME = "bible-study-v109";

const urlsToCache = [
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
  "/books/Strong_Dict.json"
];

// Install event - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Cache open failed:", error);
      }),
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // Take control of all clients as soon as it activates
  self.clients.claim();
});

// Cache-first strategy fetch event handler
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((cachedResponse) => {
//         // Return cached response if found
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         // Otherwise try to fetch from network
//         return fetch(event.request).then((networkResponse) => {
//           // Check if we received a valid response
//           if (
//             !networkResponse ||
//             networkResponse.status !== 200 ||
//             networkResponse.type !== "basic"
//           ) {
//             return networkResponse;
//           }

//           // Clone the response to cache it
//           const responseToCache = networkResponse.clone();

//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseToCache);
//           });

//           return networkResponse;
//         });
//       })
//       .catch(() => {
//         // If both fail, just return with no response
//         // The browser will show its default offline page
//       }),
//   );
// });

// // Handle navigations to return index.html for SPA routing
// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       caches
//         .match("/index.html")
//         .then((response) => {
//           return response || fetch(event.request);
//         })
//         .catch(() => caches.match("/index.html")),
//     );
//   }
// });

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Handle navigation requests with SPA fallback
    event.respondWith(
      caches.match("/index.html").then((response) => {
        return response || fetch(event.request);
      }).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // Handle other requests (e.g., JSON, assets) with cache-first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    }).catch((error) => {
      console.warn("Fetch failed, and no cache match:", event.request.url);
      // Optional: You can return a fallback JSON file or a custom error here
    })
  );
});
