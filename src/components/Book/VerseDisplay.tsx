import React from "react";
import { BibleBook, Verse } from "../../types/BibleBook";
import styles from "../Book/VerseDisplay.module.css";

interface VerseDisplayProps {
  bibleData: BibleBook | null,
  currentChapter: number,
  book: string,
  openBookmarkModal: (verse: Verse) => void
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({
  bibleData,
  book,
  currentChapter,
  openBookmarkModal
}) => {

  if (!bibleData || !bibleData.chapters || !bibleData.chapters[currentChapter]) {
    return <div>No data available</div>;
  }

  return (
    <>
      {bibleData.chapters[currentChapter].verses.map((verse, verseIndex) => {
        const isVerseOne = verse.verse === "1";
        const words = verse.text.split(" ");
        const formattedText = isVerseOne
          ? `${words.slice(0, 2).join(" ").toUpperCase()} ${words.slice(2).join(" ")}`
          : verse.text;

        return (
          <div
            className={styles.bibleVerseDiv}
            key={verseIndex}
            id={`${book}_${currentChapter + 1}_${verse.verse}`}
            onClick={() => openBookmarkModal(verse)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBookmarkModal(verse);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Bookmark ${book} chapter ${currentChapter + 1} verse ${verse.verse}`}
          >
            <div className={styles.bibleVerseContentDiv}>
              <p>
                <span className={styles.bibleVerseNumber}>{verse.verse}</span>{" "}
                {formattedText}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default VerseDisplay;

