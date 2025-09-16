import { useEffect, useState } from "react";
import { getAllBookmarks, initDB } from "../DB"; // Update as needed
import type { Bookmark } from "../types/BibleBook"; // Update as needed

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        await initDB(); // Wait for the database to initialize
        const allBookmarks = await getAllBookmarks(); // Get all bookmarks
        setBookmarks(allBookmarks);
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      } finally {
        setLoading(false); // Done loading
      }
    };

    loadBookmarks(); // Run once on mount
  }, []);

  return {
    bookmarks,
    setBookmarks, // so you can manually update if needed
    loading,
    setLoading, // if your component depends on this
  };
};
