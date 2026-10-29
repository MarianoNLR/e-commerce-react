import { useEffect } from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import styles from './ConfirmModal.module.css';
import propTypes from 'prop-types';

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, highlightedText, confirmText = "Eliminar", cancelText = "Cancelar" }) {
    useEffect(() => {
        if (!isOpen) return undefined;

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                    type="button"
                    aria-label="Cerrar"
                >
                    <FaTimes />
                </button>

                <div className={styles.iconWrapper}>
                    <FaExclamationTriangle />
                </div>

                <div className={styles.modalBody}>
                    <h2 id="confirm-modal-title">{title}</h2>
                    <p>{message}</p>
                    {highlightedText && (
                        <p className={styles.highlightedText}>{highlightedText}</p>
                    )}
                </div>

                <div className={styles.modalActions}>
                    <button
                        type="button"
                        className={`${styles.btnCancel} btn btn-secondary`}
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`${styles.btnConfirm} btn btn-danger`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

ConfirmModal.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    onConfirm: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    message: propTypes.string.isRequired,
    highlightedText: propTypes.string,
    confirmText: propTypes.string,
    cancelText: propTypes.string,
}