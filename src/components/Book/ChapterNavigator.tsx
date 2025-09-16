import React from "react";
import { BibleBook } from "../../types/BibleBook"; // Assuming you have a type for your bible data
import { handleNextChapter } from "../../utils/Book/handleNextChapter"; // Adjust if you put them in specific files
import { handlePreviousChapter } from "../../utils/Book/handlePreviousChapter";
import styles from "./ChapterNavigator.module.css";

interface ChapterNavigatorProps {
  setCurrentChapter: React.Dispatch<React.SetStateAction<number>>,
  setSelectedChapter: React.Dispatch<React.SetStateAction<number>>,
  book: string,
  currentChapter: number,
  bibleData: BibleBook | null,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setVerseContext: React.Dispatch<React.SetStateAction<number>>,
}

const ChapterNavigator: React.FC<ChapterNavigatorProps> = ({
  setCurrentChapter,
  setSelectedChapter,
  book,
  currentChapter,
  bibleData,
  setModalOpen,
  setVerseContext

}) => {
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.bibleChapterDiv}>

      {bibleData && bibleData.chapters && bibleData.chapters.length > 0 ? (
        <>
          <button
            className={styles.previousChapterButton}
            onClick={() => handlePreviousChapter(currentChapter, setCurrentChapter, setSelectedChapter, book, setVerseContext)}
            disabled={currentChapter === 0}
          >
            Prev
          </button>

          <h2 className={styles.bibleChapterHeader} onClick={openModal}>
            Chapter {bibleData.chapters[currentChapter].chapter}
          </h2>

          <button
            className={styles.nextChapterButton}
            onClick={() => handleNextChapter(currentChapter, setCurrentChapter, setSelectedChapter, book, bibleData, setVerseContext)}
            disabled={currentChapter >= bibleData.chapters.length - 1}
          >
            Next
          </button>
        </>
      ) : null}

    </div>
  );
};

export default ChapterNavigator;