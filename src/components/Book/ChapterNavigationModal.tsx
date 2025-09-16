import { BibleBook } from "../../types/BibleBook"; // Assuming you have a type for your bible data
import styles from "./ChapterNavigationModal.module.css";

interface ChapterNavigationModalProps {
  setInputChapter: React.Dispatch<React.SetStateAction<string>>,
  handleChapterChange: (
    currentChapter: number,
    setCurrentChapter: React.Dispatch<React.SetStateAction<number>>,
    setSelectedChapter: React.Dispatch<React.SetStateAction<number>>,
    book: string, bibleData: BibleBook | null, inputChapter: string, closeModal: () => void,
    setVerseContext: React.Dispatch<React.SetStateAction<number>>,) => void,
  modalOpen: boolean,
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  closeModal: () => void,
  inputChapter: string,
  currentChapter: number,
  setCurrentChapter: React.Dispatch<React.SetStateAction<number>>,
  setSelectedChapter: React.Dispatch<React.SetStateAction<number>>,
  book: string,
  bibleData: BibleBook | null,
  setVerseContext: React.Dispatch<React.SetStateAction<number>>,
}

const ChapterNavigationModal: React.FC<ChapterNavigationModalProps> = ({
  modalOpen,
  setInputChapter,
  handleChapterChange,
  handleKeyDown,
  closeModal,
  inputChapter,
  currentChapter,
  setCurrentChapter,
  setSelectedChapter,
  book,
  bibleData,
  setVerseContext

}) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.modal)) {
      closeModal();
    }
  };

  return (
    <>
      {modalOpen && (
        <div className={styles.modal} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h2>Enter Chapter Number</h2>
            <div className={styles.topicSearch}>
              <input
                type="number"
                value={inputChapter}
                onChange={(e) => setInputChapter(e.target.value)}
                placeholder="Chapter number"
                onKeyDown={handleKeyDown} // Add this line
              />
            </div>
            <button onClick={() => handleChapterChange(currentChapter, setCurrentChapter, setSelectedChapter, book, bibleData, inputChapter, closeModal, setVerseContext)}>Load Chapter</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChapterNavigationModal;