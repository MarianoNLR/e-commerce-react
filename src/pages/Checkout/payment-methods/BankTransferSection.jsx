import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FeedbackModal } from '../../../components/FeedbackModal/FeedbackModal.jsx';
import { PaymentProofForm } from '../../../components/PaymentProofForm/PaymentProofForm.jsx';
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
	const orderId = orderData?.id || null;
	const orderTotal = orderData?.total;
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

	const handleProofUploaded = () => {
		setFeedbackModal({
			isOpen: true,
			title: 'Comprobante recibido',
			description: 'Recibimos tu comprobante y lo confirmaremos cuanto antes. Muchas gracias por tu compra.',
			type: 'success',
		});
	};

	const handleProofUploadFailed = () => {
		if (!orderId) {
			setFeedbackModal({
				isOpen: true,
				title: 'No se encontro la orden',
				description: 'No se pudo identificar la orden para asociar el comprobante. Vuelve a confirmar el pedido.',
				type: 'error',
			});
			return;
		}

		setFeedbackModal({
			isOpen: true,
			title: 'No se pudo enviar el comprobante',
			description: 'Ocurrio un error al subir el comprobante. Intenta nuevamente en unos minutos.',
			type: 'error',
		});
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

			<PaymentProofForm
				orderId={orderId}
				onSuccess={handleProofUploaded}
				onError={handleProofUploadFailed}
			/>

			<FeedbackModal
				isOpen={feedbackModal.isOpen}
				onClose={closeFeedbackModal}
				title={feedbackModal.title}
				description={feedbackModal.description}
				icon={feedbackModal.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
				buttonText='Entendido'
				variant={feedbackModal.type === 'success' ? 'success' : 'error'}
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
