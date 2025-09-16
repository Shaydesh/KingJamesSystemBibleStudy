import { useEffect, useState } from "react";
import bookMap from "../data/bookMap"; // Source of all books
import { BibleBook } from "../types/BibleBook"; // TypeScript interface

export const useBibleData = (book: string, chapter: number) => {
  const [bibleData, setBibleData] = useState<BibleBook | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(chapter);

  useEffect(() => {
    const selectedBook = bookMap[book]; // Get data from bookMap
    setBibleData(selectedBook || null); // Set data (or null if not found)
    setCurrentChapter(chapter); // Keep internal chapter in sync
  }, [book, chapter]); // 🔁 Re-run when book or chapter changes

  return {
    bibleData,
    currentChapter,
    setCurrentChapter,
  };
};