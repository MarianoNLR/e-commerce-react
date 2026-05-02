import PAYMENT_METHODS from '../constants/paymentMethods.js';
import { MercadoPagoSection } from './MercadoPagoSection.jsx';
import { BankTransferSection } from './BankTransferSection.jsx';
import styles from './PaymentMethods.module.css';

const PAYMENT_METHOD_COMPONENTS = {
    [PAYMENT_METHODS.MERCADO_PAGO]: MercadoPagoSection,
    [PAYMENT_METHODS.BANK_TRANSFER]: BankTransferSection,
};

export function PaymentMethodSection({ selectedMethod, customerData, orderData }) {
    const SelectedSection = PAYMENT_METHOD_COMPONENTS[selectedMethod];

    if (!selectedMethod) {
        return (
            <div className={styles.paymentMethodSection}>
                <p>No se selecciono un metodo de pago.</p>
            </div>
        );
    }

    if (!SelectedSection) {
        return (
            <div className={styles.paymentMethodSection}>
                <p>El metodo de pago seleccionado no esta soportado todavia.</p>
            </div>
        );
    }

    return (
        <div className={styles.paymentMethodSection}>
            <SelectedSection customerData={customerData} orderData={orderData} />
        </div>
    );
}