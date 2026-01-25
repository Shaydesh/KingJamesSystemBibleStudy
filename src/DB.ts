import { Bookmark } from "./types/BibleBook";

let db: IDBDatabase | null = null;

// Input validation constants
const MAX_QUERY_LENGTH = 200;
const MAX_TOPIC_LENGTH = 100;
const MAX_BOOK_NAME_LENGTH = 50;
const MAX_VERSE_ID_LENGTH = 50;

// Sanitize string input - remove potentially dangerous characters
const sanitizeString = (input: string, maxLength: number): string => {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .trim();
};

// Validate bookmark data
const validateBookmarkData = (
  book: string,
  chapter: number,
  verse: number | string,
  topic: string,
  verseId: string
): { valid: boolean; error?: string } => {
  if (!book || typeof book !== 'string') {
    return { valid: false, error: 'Invalid book name' };
  }
  if (typeof chapter !== 'number' || chapter < 0 || chapter > 200) {
    return { valid: false, error: 'Invalid chapter number' };
  }
  if (verse === undefined || verse === null) {
    return { valid: false, error: 'Invalid verse' };
  }
  if (typeof topic !== 'string') {
    return { valid: false, error: 'Invalid topic' };
  }
  if (!verseId || typeof verseId !== 'string') {
    return { valid: false, error: 'Invalid verse ID' };
  }
  return { valid: true };
};

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
    // Validate inputs
    const validation = validateBookmarkData(book, chapter, verse, topic, verseId);
    if (!validation.valid) {
      reject(new Error(validation.error || "Invalid bookmark data"));
      return;
    }

    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    // Sanitize string inputs
    const sanitizedBook = sanitizeString(book, MAX_BOOK_NAME_LENGTH);
    const sanitizedTopic = sanitizeString(topic, MAX_TOPIC_LENGTH);
    const sanitizedVerseId = sanitizeString(verseId, MAX_VERSE_ID_LENGTH);

    const transaction = db.transaction(["Bookmarks"], "readwrite");
    const objectStore = transaction.objectStore("Bookmarks");

    const bookmark: Bookmark = {
      id: Date.now(),
      book: sanitizedBook,
      chapter,
      verse,
      topic: sanitizedTopic,
      verseId: sanitizedVerseId,
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
    // Validate ID
    if (typeof id !== 'number' || !Number.isFinite(id) || id < 0) {
      reject(new Error("Invalid bookmark ID"));
      return;
    }

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
    // Validate and sanitize query
    if (typeof query !== 'string') {
      resolve([]);
      return;
    }

    const sanitizedQuery = sanitizeString(query, MAX_QUERY_LENGTH);
    if (sanitizedQuery.length === 0) {
      resolve([]);
      return;
    }

    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction(["Bookmarks"], "readonly");
    const objectStore = transaction.objectStore("Bookmarks");
    const index = objectStore.index("bookmark");

    const keyRange = IDBKeyRange.bound(sanitizedQuery, sanitizedQuery + "\uffff");

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