import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBook } from "../../context/BookContext";
import { StrongsData, StrongsDictionary, Verse } from "../../types/BibleBook";
import styles from "../Book/StrongsDefinitionModal.module.css";

interface StrongsDefinitionModalProps {
  strongsModalOpen: boolean,
  strongsData: StrongsData[],
  setCurrentStrongsIndex: React.Dispatch<React.SetStateAction<number>>,
  setStrongsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setStrongsData: React.Dispatch<React.SetStateAction<StrongsData[]>>,
  currentStrongsIndex: number,
  selectedVerse: Verse | null,
  openBookmarkModal: (verse: Verse) => void,
  StrongsDict: StrongsDictionary
}

const StrongsDefinitionModal: React.FC<StrongsDefinitionModalProps> = ({
  strongsModalOpen,
  strongsData,
  setStrongsModalOpen,
  setStrongsData,
  setCurrentStrongsIndex,
  currentStrongsIndex,
  selectedVerse,
  openBookmarkModal,
  StrongsDict
}) => {
  const navigate = useNavigate();
  const {
    setBookTheme,
    setSelectedChapter,
    setVerseContext,
  } = useBook();

  // History stack for back navigation
  const [strongsHistory, setStrongsHistory] = useState<StrongsData[][]>([]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.modal)) {
      closeStrongsModal();
    }
  };

  const closeStrongsModal = () => {
    setStrongsModalOpen(false);
    setStrongsData([]);
    setStrongsHistory([]);
  };

  // Parse reference string like "Genesis 1:1" and navigate to the book
  const handleNavigateToReference = (reference: string) => {
    // Match pattern: "Book Name Chapter:Verse"
    const match = reference.match(/^(.+?)\s+(\d+):(\d+)$/);
    if (match) {
      const [, bookName, chapter, verse] = match;
      setBookTheme(bookName);
      setSelectedChapter(parseInt(chapter) - 1);
      setVerseContext(parseInt(verse));
      closeStrongsModal();
      navigate(`/Book/${bookName}`);
    }
  };

  // Navigate to a Strong's number from etymology
  const handleStrongsNumberClick = (strongsNum: string) => {
    const entry = StrongsDict.dictionary.find((e) => e.k === strongsNum);
    if (entry) {
      // Save current data to history
      setStrongsHistory((prev) => [...prev, strongsData]);
      // Show the new Strong's entry
      setStrongsData([entry]);
      setCurrentStrongsIndex(0);
    }
  };

  // Go back to previous Strong's entry
  const handleStrongsBack = () => {
    if (strongsHistory.length > 0) {
      const previousData = strongsHistory[strongsHistory.length - 1];
      setStrongsHistory((prev) => prev.slice(0, -1));
      setStrongsData(previousData);
      setCurrentStrongsIndex(0);
    }
  };

  // Parse etymology text and make Strong's numbers clickable
  const renderEtymologyWithLinks = (etymologyArray: string[] | undefined) => {
    if (!etymologyArray) return null;

    const text = etymologyArray.join(", ");
    // Match H#### or G#### patterns
    const strongsPattern = /([HG]\d+)/g;
    const parts = text.split(strongsPattern);

    return parts.map((part, index) => {
      // Check if this part is a Strong's number (H or G followed by digits)
      if (/^[HG]\d+$/.test(part)) {
        return (
          <span
            key={index}
            className={styles.referenceLink}
            onClick={() => handleStrongsNumberClick(part)}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handlePreviousDefinition = () => {
    setCurrentStrongsIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextDefinition = () => {
    setCurrentStrongsIndex((prevIndex) =>
      Math.min(prevIndex + 1, strongsData.length - 1),
    );
  };

  // Safely get current entry (guard against empty array)
  const currentEntry = strongsData?.[currentStrongsIndex];
  const originalWord = currentEntry?.v?.[0] || "";

  // Check for Hebrew characters
  const isHebrew = /[\u0590-\u05FF]/.test(originalWord);

  return (
    <>
      {strongsModalOpen && strongsData && (
        <div className={styles.modal} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            {strongsData.length === 1 && (
              <span className={styles.close} onClick={closeStrongsModal}>
                &times;
              </span>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>

              {strongsData.length > 1 && (

                <button
                  onClick={handlePreviousDefinition}
                  disabled={currentStrongsIndex === 0}
                  style={{
                    cursor: "pointer",
                    marginRight: "20px",
                    marginTop: "-20px",
                    padding: "5px 0px",
                    backgroundColor: "white",
                    verticalAlign: "top",
                    border: "none",
                  }}
                >
                  &#10094;{" "}
                  {/* Previous Arrow Glyph (HTML entity for left arrow) */}
                </button>
              )}

              <h2 style={{ whiteSpace: "nowrap" }}>Strong's Definition</h2>

              {strongsData.length > 1 && (
                <button
                  onClick={handleNextDefinition}
                  disabled={currentStrongsIndex === strongsData.length - 1}
                  style={{
                    cursor: "pointer",
                    marginLeft: "20px",
                    marginTop: "-20px",
                    padding: "5px 0px",
                    backgroundColor: "white",
                    verticalAlign: "top",
                    border: "none",
                  }}
                >
                  &#10095;{" "}
                  {/* Next Arrow Glyph (HTML entity for right arrow) */}
                </button>
              )}

            </div>

            {currentEntry && (
              <>
                <h2>{currentEntry.k}</h2>
                <div className={styles.strongsContent}>
                  <p lang={isHebrew ? "he" : "el"} className={isHebrew ? styles.hebrewText : styles.greekText}>
                    {currentEntry.v[0]}
                  </p>
                  <p>
                    <strong>Transliteration:</strong>{" "}
                    {currentEntry.v[1]}
                  </p>
                  <p>
                    <strong>Pronunciation:</strong>{" "}
                    {currentEntry.v[2]}
                  </p>
                  <p>
                    <strong>Etymology:</strong>{" "}
                    {renderEtymologyWithLinks(currentEntry.v[3])}
                  </p>
                  <p>
                    <strong>Definition:</strong>{" "}
                    {currentEntry.v[4]?.join(", ")}
                  </p>
                  <p>
                    <strong>Usage:</strong>{" "}
                    {currentEntry.v[5]?.join(", ")}
                  </p>
                  <p>
                    <strong>Strong's Num. First Appears:</strong>{" "}
                    {currentEntry.v[6]?.map((ref, index) => (
                      <span key={index}>
                        <span
                          className={styles.referenceLink}
                          onClick={() => handleNavigateToReference(ref)}
                        >
                          {ref}
                        </span>
                        {index < (currentEntry.v[6]?.length || 0) - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong>Times Strong's Num. Appears:</strong>{" "}
                    {currentEntry.v[7]}
                  </p>
                </div>
              </>
            )}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={() => {
                  if (strongsHistory.length > 0) {
                    // Go back to previous Strong's entry
                    handleStrongsBack();
                  } else if (selectedVerse !== null) {
                    // Go back to bookmark modal
                    console.log("Back button clicked.");
                    closeStrongsModal();
                    openBookmarkModal(selectedVerse);
                  }
                }}
                style={{ marginRight: "10px" }}
              >
                Back {strongsHistory.length > 0 && `(${strongsHistory.length})`}
              </button>
              <button onClick={closeStrongsModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StrongsDefinitionModal