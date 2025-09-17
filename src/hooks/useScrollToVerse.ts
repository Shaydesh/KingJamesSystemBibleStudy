import { useEffect, useRef } from "react";
import { scrollToVerse } from "../utils/Book/scrollToVerse";

export const useScrollToVerse = (
  book: string,
  chapter: number,
  verse: string | number | null,
  ready: boolean
) => {
  const prevVerseRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!ready || !verse) return;

    // Only scroll if the verse has changed
    if (verse !== prevVerseRef.current) {
      prevVerseRef.current = verse;

      // Delay scroll to ensure DOM elements exist
      const timeout = setTimeout(() => {
        scrollToVerse(book, chapter, verse);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [book, chapter, verse, ready]);
};
