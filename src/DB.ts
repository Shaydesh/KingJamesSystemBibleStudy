import { Bookmark } from "./types/BibleBook";

let db: IDBDatabase | null = null;

// Initialize the database
export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open("SystemBibleStudy", 1);

    request.onupgradeneeded = (event) => {
      const target = event.target as IDBOpenDBRequest;
      db = target.result;

      if (!db.objectStoreNames.contains("Bookmarks")) {
        const objectStore = db.createObjectStore("Bookmarks", { keyPath: "id" });
        objectStore.createIndex(
          "bookmark",
          ["book", "chapter", "verse", "topic", "verseId", "date"],
          { unique: false }
        );
      }
    };

    request.onsuccess = (event) => {
      const target = event.target as IDBOpenDBRequest;
      db = target.result;
      console.log("Database opened successfully");
      resolve();
    };

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;
      console.error("Database error:", target.error);
      reject(target.error);
    };
  });
};

// Save a bookmark
export const saveBookmark = (
  book: string,
  chapter: number,
  verse: number | string,
  topic: string,
  verseId: string
): Promise<Bookmark> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readwrite");
    const objectStore = transaction.objectStore("Bookmarks");

    const bookmark: Bookmark = {
      id: Date.now(),
      book,
      chapter,
      verse,
      topic,
      verseId,
      date: new Date(),
    };

    const request = objectStore.add(bookmark);

    request.onsuccess = () => {
      console.log("Bookmark saved successfully:", bookmark);
      resolve(bookmark);
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error("Error saving bookmark:", target.error);
      reject(new Error("Error saving bookmark: " + target.error));
    };
  });
};

// Get all bookmarks
export const getAllBookmarks = (): Promise<Bookmark[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const target = event.target as IDBRequest;
      resolve(target.result as Bookmark[]);
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error("Error retrieving bookmarks:", target.error);
      reject(target.error);
    };
  });
};

// Delete a bookmark by ID
export const deleteBookmark = (id: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readwrite");
    const objectStore = transaction.objectStore("Bookmarks");

    const request = objectStore.delete(id);

    request.onsuccess = () => {
      console.log("Bookmark deleted successfully:", id);
      resolve(id);
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error("Error deleting bookmark:", target.error);
      reject(target.error);
    };
  });
};

// Get suggestions (topics starting with query)
export const getSuggestions = (query: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const index = objectStore.index("bookmark");

    const keyRange = IDBKeyRange.bound(query, query + "\uffff");

    const suggestions: string[] = [];
    const request = index.openCursor(keyRange);

    request.onsuccess = (event) => {
      const target = event.target as IDBRequest;
      const cursor = target.result as IDBCursorWithValue | null;

      if (cursor) {
        if (cursor.value.topic) {
          suggestions.push(cursor.value.topic);
        }
        cursor.continue();
      } else {
        resolve(suggestions);
      }
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error("Error fetching suggestions:", target.error);
      reject(target.error);
    };
  });
};

// Get distinct topics from bookmarks
export const getDistinctTopics = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const target = event.target as IDBRequest;
      const bookmarks = target.result as Bookmark[];
      const topics = new Set<string>();
      bookmarks.forEach((bookmark) => {
        if (bookmark.topic) topics.add(bookmark.topic);
      });
      resolve(Array.from(topics));
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error("Error fetching bookmarks:", target.error);
      reject(target.error);
    };
  });
};