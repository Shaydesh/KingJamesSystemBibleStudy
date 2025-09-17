import { useEffect, useState } from "react";
import { loadBook } from "../../src/utils/Book/loadBook"; // new lazy loader
import bookNameToFileName from "../data/bookMap"; // updated to only map book names to filenames
import { BibleBook } from "../types/BibleBook";

export const useBibleData = (book: string, chapter: number) => {
  const [bibleData, setBibleData] = useState<BibleBook | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(chapter);

  useEffect(() => {
    const fetchBook = async () => {
      const fileName = bookNameToFileName[book];
      if (!fileName) {
        console.warn(`No file mapping for book: ${book}`);
        setBibleData(null);
        return;
      }

      try {
        const data = await loadBook(fileName);
        setBibleData(data);
        setCurrentChapter(chapter);

      } catch (error) {
        console.error(`Failed to load book "${book}":`, error);
        setBibleData(null);
      }

      setCurrentChapter(chapter); // Sync chapter
    };

    fetchBook();
  }, [book, chapter]);

  return {
    bibleData,
    currentChapter,
    setCurrentChapter,
  };
};
