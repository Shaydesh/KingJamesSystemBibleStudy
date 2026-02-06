import React from 'react';
import styles from './UpdateToast.module.css';

interface UpdateToastProps {
  onRefresh: () => void;
  onDismiss: () => void;
}

const UpdateToast: React.FC<UpdateToastProps> = ({ onRefresh, onDismiss }) => {
  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <p className={styles.message}>
          A new version is available.
        </p>
        <div className={styles.actions}>
          <button className={styles.refreshButton} onClick={onRefresh}>
            Refresh
          </button>
          <button className={styles.dismissButton} onClick={onDismiss}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateToast;
