import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { PaymentProofForm } from '../PaymentProofForm/PaymentProofForm.jsx';
import styles from './UploadProofModal.module.css';

export function UploadProofModal({
    isOpen,
    orderId,
    totalText,
    deadlineText,
    onClose,
    onSuccess,
    onError,
}) {
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

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div
                className={styles.content}
                role='dialog'
                aria-modal='true'
                aria-labelledby='upload-proof-modal-title'
            >
                <button
                    type='button'
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label='Cerrar'
                >
                    <FaTimes />
                </button>

                <h2 id='upload-proof-modal-title' className={styles.title}>Subir comprobante</h2>

                <div className={styles.orderInfo}>
                    <p className={styles.orderId}>Pedido #{orderId}</p>
                    {totalText && <p><strong>Total:</strong> {totalText}</p>}
                    {deadlineText && <p className={styles.deadline}>{deadlineText}</p>}
                </div>

                <PaymentProofForm orderId={orderId} onSuccess={onSuccess} onError={onError} />
            </div>
        </div>
    );
}

UploadProofModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalText: PropTypes.string,
    deadlineText: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
};
