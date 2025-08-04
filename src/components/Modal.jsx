import styles from "../styles/Modal.module.css"; //

import { useState, useEffect } from "react";

const Modal = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);

  // Handle Escape key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [index]);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
        <button onClick={goPrev} className={styles.arrowLeft}>
          ‹
        </button>
        <img src={images[index]} alt="modal content" className={styles.image} />
        <button onClick={goNext} className={styles.arrowRight}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Modal;
