import { MercadoPagoButton } from '../../../components/MercadoPagoButton.jsx';
import styles from './PaymentMethods.module.css';

export function MercadoPagoSection({ customerData, orderData }) {
	return (
		<div className={styles.paymentMethodCard}>
			<h2 className={styles.paymentMethodTitle}>Pagar con Mercado Pago</h2>
			<p className={styles.paymentMethodDescription}>
				Presiona el boton para continuar el pago en la pasarela de Mercado Pago.
			</p>
			<div className={styles.paymentButtonContainer}>
				<MercadoPagoButton shipping_info={customerData} order_data={orderData} />
			</div>
		</div>
	);
}
