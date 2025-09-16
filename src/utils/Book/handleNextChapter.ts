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
    setCurrentChapter(currentChapter + 1);
    setSelectedChapter(currentChapter + 1);
    setVerseContext(1);


    const verseId = `${book}_${currentChapter + 1}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.log(`Verse element not found for ID: ${verseId}`);
    }
  }
}