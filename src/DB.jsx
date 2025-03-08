let db;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("SystemBibleStudy", 1);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      const objectStore = db.createObjectStore("Bookmarks", { keyPath: "id" });
      objectStore.createIndex(
        "bookmark",
        ["book", "chapter", "verse", "topic", "verseId", "date"],
        { unique: false },
      );
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Database opened successfully");
      resolve(); // Resolve the promise
    };

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
      reject(event.target.errorCode); // Reject the promise on error
    };
  });
};

export const saveBookmark = (book, chapter, verse, topic, verseId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["Bookmarks"], "readwrite");
    const objectStore = transaction.objectStore("Bookmarks");

    const bookmark = {
      id: Date.now(), // Unique ID for the bookmark
      book,
      chapter,
      verse,
      topic,
      verseId,
      date: new Date(), // Date of bookmark
    };

    const request = objectStore.add(bookmark);

    request.onsuccess = () => {
      console.log("Bookmark saved successfully:", bookmark);
      // alert('Bookmark saved successfully!');
      resolve(bookmark); // Resolve with the bookmark data
    };

    request.onerror = (event) => {
      console.error("Error saving bookmark:", event.target.errorCode);
      reject(new Error("Error saving bookmark: " + event.target.errorCode)); // Reject with an error message
    };
  });
};

export const getAllBookmarks = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized"); // Reject if db is not defined
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const request = objectStore.getAll(); // Get all records

    request.onsuccess = (event) => {
      resolve(event.target.result); // Resolve with the data
    };

    request.onerror = (event) => {
      console.error("Error retrieving bookmarks:", event.target.errorCode);
      reject(event.target.errorCode); // Reject with the error
    };
  });
};

export const deleteBookmark = (id) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized"); // Reject if db is not defined
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readwrite"); // 'readwrite' to modify data
    const objectStore = transaction.objectStore("Bookmarks");

    const request = objectStore.delete(id); // Use delete method with the unique 'id'

    request.onsuccess = () => {
      console.log("Bookmark deleted successfully:", id);
      //  alert('Bookmark deleted successfully!');
      resolve(id); // Resolve with the deleted id (or any relevant data)
    };

    request.onerror = (event) => {
      console.error("Error deleting bookmark:", event.target.errorCode);
      reject(event.target.errorCode); // Reject with the error code
    };
  });
};

export const getSuggestions = (query) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const index = objectStore.index("bookmark"); // Use the 'bookmark' index for searching
    const keyRange = IDBKeyRange.bound(query, query + "\uffff"); // Match topics starting with query

    const suggestions = [];
    const request = index.openCursor(keyRange);

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        suggestions.push(cursor.value.topic);
        cursor.continue();
      } else {
        resolve(suggestions); // Resolve with the list of topics
      }
    };

    request.onerror = (event) => {
      console.error("Error fetching suggestions:", event.target.errorCode);
      reject(event.target.errorCode); // Reject with error if the request fails
    };
  });
};

export const getDistinctTopics = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const request = objectStore.getAll(); // Get all records

    request.onsuccess = (event) => {
      const bookmarks = event.target.result;
      const topics = new Set(); // Use Set to ensure uniqueness
      bookmarks.forEach((bookmark) => {
        if (bookmark.topic) topics.add(bookmark.topic);
      });
      resolve(Array.from(topics)); // Return unique topics as an array
    };

    request.onerror = (event) => {
      console.error("Error fetching bookmarks:", event.target.errorCode);
      reject(event.target.errorCode); // Reject with the error
    };
  });
};
