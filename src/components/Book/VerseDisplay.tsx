import React from "react";
import { BibleBook, StrongsData, StrongsDictionary, Verse } from "../../types/BibleBook";
import styles from "../Book/VerseDisplay.module.css";

interface VerseDisplayProps {
  bibleData: BibleBook | null,
  currentChapter: number,
  book: string,
  openBookmarkModal: (verse: Verse) => void,
  setStrongsData: React.Dispatch<React.SetStateAction<StrongsData[]>>,
  setStrongsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentStrongsIndex: React.Dispatch<React.SetStateAction<number>>,
  setSelectedVerse: React.Dispatch<React.SetStateAction<Verse | null>>,
  StrongsDict: StrongsDictionary
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({
  bibleData,
  book,
  currentChapter,
  openBookmarkModal,
  setStrongsData,
  setStrongsModalOpen,
  setCurrentStrongsIndex,
  setSelectedVerse,
  StrongsDict
}) => {

  const handleWordClick = (strongsRefs: string[], verse: Verse) => {
    const strongsEntries = strongsRefs
      .map((ref) => StrongsDict.dictionary.find((entry) => entry.k === ref))
      .filter((entry): entry is StrongsData => !!entry);

    if (strongsEntries.length > 0) {
      setSelectedVerse(verse);
      setStrongsData(strongsEntries);
      setCurrentStrongsIndex(0);
      setStrongsModalOpen(true);
    }
  };

  if (!bibleData || !bibleData.chapters || !bibleData.chapters[currentChapter]) {
    return <div>No data available</div>;
  }

  return (
    <>
      {bibleData.chapters[currentChapter].verses.map((verse, verseIndex) => {
        const isVerseOne = verse.verse === "1";

        return (
          <div
            className={styles.bibleVerseDiv}
            key={verseIndex}
            id={`${book}_${currentChapter + 1}_${verse.verse}`}
          >
            <div className={styles.bibleVerseContentDiv}>
              <p>
                <span
                  className={styles.bibleVerseNumber}
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
                  {verse.verse}
                </span>{" "}
                {verse.v && Array.isArray(verse.v) ? (
                  <>
                    {verse.v.map((phraseData, phraseIndex) => {
                      const phrase = phraseData[0];
                      const strongsRefs = phraseData[1];

                      // Apply uppercase to first 2 phrases of verse 1
                      const displayPhrase = isVerseOne && phraseIndex < 2
                        ? phrase.toUpperCase()
                        : phrase;

                      return (
                        <React.Fragment key={phraseIndex}>
                          <span
                            className={styles.clickableWord}
                            onClick={() => handleWordClick(strongsRefs, verse)}
                          >
                            {displayPhrase}
                          </span>
                          {phraseIndex < verse.v.length - 1 ? ' ' : ''}
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  // Fallback to plain text if no Strong's data
                  (() => {
                    const words = verse.text.split(" ");
                    return isVerseOne
                      ? `${words.slice(0, 2).join(" ").toUpperCase()} ${words.slice(2).join(" ")}`
                      : verse.text;
                  })()
                )}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default VerseDisplay;
