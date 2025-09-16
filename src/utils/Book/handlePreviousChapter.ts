export const handlePreviousChapter = (
  currentChapter: number,
  setCurrentChapter: React.Dispatch<React.SetStateAction<number>>,
  setSelectedChapter: React.Dispatch<React.SetStateAction<number>>,
  book: string,
  setVerseContext: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (currentChapter > 0) {
    const newChapter = currentChapter - 1;
    setCurrentChapter(newChapter);
    setSelectedChapter(newChapter);
    setVerseContext(1);

    const verseId = `${book}_${currentChapter}_${1}`;
    const verseElement = document.getElementById(verseId);

    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.log(`Verse element not found for ID: ${verseId}`);
    }
  }
};
