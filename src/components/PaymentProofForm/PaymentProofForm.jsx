import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../api.js';
import styles from './PaymentProofForm.module.css';

// Same file rules the API enforces on POST /orders/:orderId/payment_proof.
const ACCEPTED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function PaymentProofForm({ orderId, onSuccess, onError }) {
    const inputId = useId();
    const [proofFile, setProofFile] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const rejectFile = (event, message) => {
        event.target.value = '';
        setProofFile(null);
        setValidationError(message);
    };

    const handleProofChange = (event) => {
        const selectedFile = event.target.files?.[0] || null;
        setValidationError('');

        if (selectedFile && !ACCEPTED_MIMETYPES.includes(selectedFile.type)) {
            rejectFile(event, 'El archivo debe ser una imagen (JPG, PNG o WebP) o un PDF.');
            return;
        }

        if (selectedFile && selectedFile.size > MAX_FILE_SIZE_BYTES) {
            rejectFile(event, 'El archivo supera el máximo de 10 MB.');
            return;
        }

        setProofFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!proofFile || isSubmitting) {
            return;
        }

        if (!orderId) {
            onError?.(new Error('Missing order id.'));
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('image', proofFile);

            const response = await api.post(`/orders/${orderId}/payment_proof`, formData);

            if (!response?.success) {
                throw new Error('No se pudo registrar el comprobante.');
            }

            setProofFile(null);
            form.reset();
            onSuccess?.(response);
        } catch (error) {
            console.error(error);
            onError?.(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.proofForm} onSubmit={handleSubmit}>
            <label className={styles.proofUploadLabel} htmlFor={inputId}>
                Comprobante de pago (imagen o PDF)
            </label>
            <input
                id={inputId}
                type='file'
                accept={ACCEPTED_MIMETYPES.join(',')}
                onChange={handleProofChange}
                disabled={isSubmitting}
                required
            />

            {proofFile && (
                <p className={styles.proofFileName}>Archivo seleccionado: {proofFile.name}</p>
            )}

            {validationError && (
                <p className={styles.proofError} role='alert'>{validationError}</p>
            )}

            <button type='submit' className={`${styles.proofSubmitButton} btn btn-primary`} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando comprobante…' : 'Enviar comprobante'}
            </button>
        </form>
    );
}

PaymentProofForm.propTypes = {
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
};
