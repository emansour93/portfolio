import styles from "../styles/Modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles["close-btn"]} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
