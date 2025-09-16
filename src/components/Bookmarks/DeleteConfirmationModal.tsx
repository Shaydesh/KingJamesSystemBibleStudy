import styles from '../Bookmarks/DeleteConfirmationModal.module.css';

export const DeleteConfirmationModal = ({
  onClose,
}: {
  onClose: () => void;
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
        <h2>Bookmark Deleted</h2>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

