import styles from "./ConfirmBookmarkSavedModal.module.css";

interface ConfirmBookmarkSavedModalProps {
  confirmBookmarkSavedModalOpen: boolean,
  closeConfirmModal: () => void,

}

const ConfirmBookmarkSavedModal: React.FC<ConfirmBookmarkSavedModalProps> = ({
  confirmBookmarkSavedModalOpen,
  closeConfirmModal,
}) => {

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains(styles.modal)) {
      closeConfirmModal();
    }
  };

  const handleConfirmModal = () => {
    closeConfirmModal();
  };

  return (
    <>
      {confirmBookmarkSavedModalOpen && (
        <div className={styles.modal} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeConfirmModal}>
              &times;
            </span>
            <h2>Boomark Saved</h2>
            <button onClick={handleConfirmModal}>Ok</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmBookmarkSavedModal;