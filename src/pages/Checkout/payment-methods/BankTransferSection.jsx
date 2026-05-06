import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import api from '../../../api.js';
import { FeedbackModal } from '../../../components/FeedbackModal/FeedbackModal.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentMethods.module.css';

const formatPrice = (value) => {
	const numericValue = Number(value);
	if (Number.isNaN(numericValue)) {
		return 'No disponible';
	}

	return new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS',
		maximumFractionDigits: 2,
	}).format(numericValue);
};

export function BankTransferSection({ orderData }) {
	const [proofFile, setProofFile] = useState(null);
	const orderId = orderData?.id || null;
	const orderTotal = orderData?.total;
	const [isSubmittingProof, setIsSubmittingProof] = useState(false);
    const navigate = useNavigate();
	const [feedbackModal, setFeedbackModal] = useState({
		isOpen: false,
		title: '',
		description: '',
		type: 'success',
	});

	const closeFeedbackModal = () => {
		setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
        navigate('/my-orders');
	};

	const handleProofChange = (event) => {
		const selectedFile = event.target.files?.[0] || null;
		setProofFile(selectedFile);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!proofFile) {
			return;
		}

		if (!orderId) {
			setFeedbackModal({
				isOpen: true,
				title: 'No se encontro la orden',
				description: 'No se pudo identificar la orden para asociar el comprobante. Vuelve a confirmar el pedido.',
				type: 'error',
			});
			return;
		}

        if (isSubmittingProof) {
            return;
        }

		setIsSubmittingProof(true);

		try {
			const formData = new FormData();
			formData.append('image', proofFile);

			const response = await api.post(`/orders/${orderId}/payment_proof`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (!response?.success) {
				throw new Error('No se pudo registrar el comprobante.');
			}

			setFeedbackModal({
				isOpen: true,
				title: 'Comprobante recibido',
				description: 'Recibimos tu comprobante y lo confirmaremos cuanto antes. Muchas gracias por tu compra.',
				type: 'success',
			});
			setProofFile(null);
			event.target.reset();
		} catch (error) {
			setFeedbackModal({
				isOpen: true,
				title: 'No se pudo enviar el comprobante',
				description: 'Ocurrio un error al subir la imagen. Intenta nuevamente en unos minutos.',
				type: 'error',
			});
		} finally {
			setIsSubmittingProof(false);
		}
	};

	return (
		<section className={styles.paymentMethodCard}>
			<h2 className={styles.paymentMethodTitle}>Pago por transferencia</h2>
			<p className={styles.paymentMethodDescription}>
				Realiza la transferencia y luego sube el comprobante para validar tu pedido.
			</p>
			<p className={styles.demoWarning}>
				Este sitio web y el flujo de pago son una demo. No realices transferencias reales.
			</p>
			<p className={styles.orderTotalText}>
				<strong>Total de la orden:</strong> {formatPrice(orderTotal)}
			</p>

			<form className={styles.bankTransferForm} onSubmit={handleSubmit}>
				<label className={styles.proofUploadLabel} htmlFor='proof-image'>
					Comprobante de pago (imagen)
				</label>
				<input
					id='proof-image'
					type='file'
					accept='image/*'
					onChange={handleProofChange}
					required
				/>

				{proofFile && (
					<p className={styles.proofFileName}>Archivo seleccionado: {proofFile.name}</p>
				)}

				<button type='submit' className={styles.proofSubmitButton}>
					{isSubmittingProof ? 'Enviando comprobante...' : 'Enviar comprobante'}
				</button>
			</form>

			<FeedbackModal
				isOpen={feedbackModal.isOpen}
				onClose={closeFeedbackModal}
				title={feedbackModal.title}
				description={feedbackModal.description}
				icon={feedbackModal.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
				buttonText='Entendido'
			/>
		</section>
	);
}

BankTransferSection.propTypes = {
	orderData: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
};
