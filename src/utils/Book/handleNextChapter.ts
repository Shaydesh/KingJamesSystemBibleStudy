import { BibleBook } from "../../types/BibleBook";

export const handleNextChapter = (
  currentChapter: number,
  setCurrentChapter: React.Dispatch<React.SetStateAction<number>>,
  setSelectedChapter: React.Dispatch<React.SetStateAction<number>>,
  book: string,
  bibleData: BibleBook | null,
  setVerseContext: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (!bibleData || !bibleData.chapters) return;

  if (currentChapter < bibleData.chapters.length - 1) {
    const newChapter = currentChapter + 1;
    setCurrentChapter(newChapter);
    setSelectedChapter(newChapter);
    setVerseContext(1);

    const verseId = `${book}_${newChapter + 1}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.log(`Verse element not found for ID: ${verseId}`);
    }
  }
}