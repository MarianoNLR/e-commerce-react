import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import styles from './ConfirmModal.module.css';
import propTypes from 'prop-types';

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Eliminar", cancelText = "Cancelar" }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button 
                    className={styles.closeButton}
                    onClick={onClose}
                    type="button"
                >
                    <FaTimes />
                </button>

                <div className={styles.iconWrapper}>
                    <FaExclamationTriangle />
                </div>

                <div className={styles.modalBody}>
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>

                <div className={styles.modalActions}>
                    <button
                        type="button"
                        className={styles.btnCancel}
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={styles.btnConfirm}
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
    confirmText: propTypes.string,
    cancelText: propTypes.string,
}