import { StrongsData, Verse } from "../../types/BibleBook";
import styles from "../Book/StrongsDefinitionModal.module.css";

interface StrongsDefinitionModalProps {
  strongsModalOpen: boolean,
  strongsData: StrongsData[],
  setCurrentStrongsIndex: React.Dispatch<React.SetStateAction<number>>,
  setStrongsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setStrongsData: React.Dispatch<React.SetStateAction<StrongsData[]>>,
  currentStrongsIndex: number,
  selectedVerse: Verse | null,
  openBookmarkModal: (verse: Verse) => void
}

const StrongsDefinitionModal: React.FC<StrongsDefinitionModalProps> = ({
  strongsModalOpen,
  strongsData,
  setStrongsModalOpen,
  setStrongsData,
  setCurrentStrongsIndex,
  currentStrongsIndex,
  selectedVerse,
  openBookmarkModal
}) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.modal)) {
      closeStrongsModal();
    }
  };

  const closeStrongsModal = () => {
    setStrongsModalOpen(false);
    setStrongsData([]);
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

            <h2>{strongsData[currentStrongsIndex].k}</h2>
            <div className={styles.strongsContent}>
              <p lang={isHebrew ? "he" : "el"} className={isHebrew ? styles.hebrewText : styles.greekText}>
                {strongsData[currentStrongsIndex].v[0]}
              </p>
              <p>
                <strong>Transliteration:</strong>{" "}
                {strongsData[currentStrongsIndex].v[1]}
              </p>
              <p>
                <strong>Pronunciation:</strong>{" "}
                {strongsData[currentStrongsIndex].v[2]}
              </p>
              <p>
                <strong>Etymology:</strong>{" "}
                {strongsData[currentStrongsIndex].v[3].join(", ")}
              </p>
              <p>
                <strong>Definition:</strong>{" "}
                {strongsData[currentStrongsIndex].v[4].join(", ")}
              </p>
              <p>
                <strong>Usage:</strong>{" "}
                {strongsData[currentStrongsIndex].v[5].join(", ")}
              </p>
              <p>
                <strong>Strong's Num. First Appears:</strong>{" "}
                {strongsData[currentStrongsIndex].v[6].join(", ")}
              </p>
              <p>
                <strong>Times Strong's Num. Appears:</strong>{" "}
                {strongsData[currentStrongsIndex].v[7]}
              </p>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={() => {
                  if (selectedVerse !== null) {
                    console.log("Back button clicked.");
                    closeStrongsModal();
                    openBookmarkModal(selectedVerse);
                  }
                }}
                style={{ marginRight: "10px" }}
              >
                Back
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