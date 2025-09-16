import React from "react";
import styles from "./BookmarkSelectModal.module.css";

interface BookmarkSelectModalProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVerse: number;
  verseFromContext: number;
  onClose: () => void;
  onNavigate: () => void;
  onDelete: () => void;
}

export const BookmarkSelectModal: React.FC<BookmarkSelectModalProps> = ({
  selectedBook,
  selectedChapter,
  selectedVerse,
  verseFromContext,
  onClose,
  onNavigate,
  onDelete,
}) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.modal)) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Bookmark Menu</h2>
        <p>What would you like to do with this Bookmark?</p>
        <p>
          {selectedBook}, Chapter {selectedChapter}, Verse {verseFromContext}
        </p>
        <button onClick={onNavigate}>Navigate to</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

