import { BibleBook } from "../../types/BibleBook";


export const handleChapterChange = (
  currentChapter: number,
  setCurrentChapter: React.Dispatch<React.SetStateAction<number>>,
  setSelectedChapter: React.Dispatch<React.SetStateAction<number>>,
  book: string,
  bibleData: BibleBook | null,
  inputChapter: string,
  closeModal: () => void,
  setVerseContext: React.Dispatch<React.SetStateAction<number>>,

) => {
  if (!bibleData || !bibleData.chapters) return;

  const chapterNum = Number(inputChapter);
  if (chapterNum >= 1 && chapterNum <= bibleData.chapters.length) {
    setCurrentChapter(chapterNum - 1); // Adjust for zero-indexed
    setSelectedChapter(chapterNum - 1);
    closeModal();

    setVerseContext(1);
    const verseId = `${book}_${chapterNum}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.log(`Verse element not found for ID: ${verseId}`);
    }
  } else {
    alert("Invalid chapter number.");
  }
}