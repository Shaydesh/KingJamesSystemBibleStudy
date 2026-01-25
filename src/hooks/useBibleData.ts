import { useEffect, useState } from "react";
import { loadBook } from "../../src/utils/Book/loadBook"; // new lazy loader
import bookNameToFileName from "../data/bookMap"; // updated to only map book names to filenames
import { BibleBook } from "../types/BibleBook";

export const useBibleData = (book: string, chapter: number) => {
  const [bibleData, setBibleData] = useState<BibleBook | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(chapter);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);

      const fileName = bookNameToFileName[book];
      if (!fileName) {
        setError(`Unknown book: ${book}`);
        setBibleData(null);
        setIsLoading(false);
        return;
      }

      try {
        const data = await loadBook(fileName);
        setBibleData(data);
        setCurrentChapter(chapter);
        setError(null);
      } catch (err) {
        console.error(`Failed to load book "${book}":`, err);
        setError(`Failed to load ${book}. Please try again.`);
        setBibleData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [book, chapter]);

  return {
    bibleData,
    currentChapter,
    setCurrentChapter,
    isLoading,
    error,
  };
};
