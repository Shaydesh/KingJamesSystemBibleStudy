export const scrollToVerse = (book: string, chapter: number, verse: string | number) => {
  const verseId = `${book}_${Number(chapter) + 1}_${verse}`;
  const verseElement = document.getElementById(verseId.toString());

  if (verseElement) {
    verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    console.log(`Verse element not found for ID: ${verseId}`);
  }
};