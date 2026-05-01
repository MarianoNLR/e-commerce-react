import { useEffect } from 'react';
import propTypes from 'prop-types';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import styles from './FeedbackModal.module.css';

export function FeedbackModal({
    isOpen,
    onClose,
    title,
    description,
    icon,
    isSpinningIcon = false,
    buttonText = 'Entendido',
    hideCloseButton = false,
    isActionDisabled = false,
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
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title">
                {!hideCloseButton && (
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        type="button"
                        aria-label="Cerrar"
                    >
                        <FaTimes />
                    </button>
                )}

                <div className={styles.visualWrapper}>
                    <div className={styles.iconWrapper}>
                        <span className={isSpinningIcon ? styles.spin : ''}>
                            {icon || <FaCheckCircle />}
                        </span>
                    </div>
                </div>

                <div className={styles.modalBody}>
                    <h2 id="feedback-modal-title">{title}</h2>
                    {description && <p>{description}</p>}
                </div>

                <button
                    type="button"
                    className={styles.btnAcknowledge}
                    onClick={onClose}
                    disabled={isActionDisabled}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

FeedbackModal.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string,
    icon: propTypes.node,
    isSpinningIcon: propTypes.bool,
    buttonText: propTypes.string,
    hideCloseButton: propTypes.bool,
    isActionDisabled: propTypes.bool,
};