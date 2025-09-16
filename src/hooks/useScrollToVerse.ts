import { useEffect, useRef, useState } from "react";
import { scrollToVerse } from "../utils/Book/scrollToVerse";

export const useScrollToVerse = (
  book: string,
  chapter: number,
  verse: string | number
) => {
  const previousVerseRef = useRef<string | number | null>(null);
  const [firstLoadState, setFirstLoadState] = useState<boolean>(false);

  useEffect(() => {
    if (firstLoadState || verse !== previousVerseRef.current) {
      previousVerseRef.current = verse;
      setFirstLoadState(false);

      setTimeout(() => {
        scrollToVerse(book, chapter, verse);
      }, 100);
    }
  }, [verse, firstLoadState, book, chapter]);
};
