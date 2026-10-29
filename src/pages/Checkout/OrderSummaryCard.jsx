import PropTypes from 'prop-types';
import PAYMENT_METHODS from './constants/paymentMethods.js';
import './OrderSummaryCard.css';

const formatPrice = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(value) || 0);

const PAYMENT_LABELS = {
    [PAYMENT_METHODS.MERCADO_PAGO]: 'Mercado Pago',
    [PAYMENT_METHODS.BANK_TRANSFER]: 'Transferencia bancaria',
};

// Resumen de la compra visible junto al botón de pago
export function OrderSummaryCard({ orderData, customerData, paymentMethod }) {
    const items = orderData?.items || [];

    return (
        <aside className='order-summary-card' aria-label='Resumen de la compra'>
            <h2>Resumen de la compra</h2>

            {items.length > 0 && (
                <ul className='order-summary-items'>
                    {items.map((item, index) => (
                        <li key={item.productId ?? item.id ?? index}>
                            <span className='order-summary-item-name'>
                                {item.name} <span className='order-summary-item-qty'>× {item.quantity}</span>
                            </span>
                            <span className='tabular'>{formatPrice(item.priceAtPurchase ?? item.price)}</span>
                        </li>
                    ))}
                </ul>
            )}

            <p className='order-summary-total'>
                <span>Total</span>
                <strong className='tabular'>{formatPrice(orderData?.total)}</strong>
            </p>

            {customerData && (
                <dl className='order-summary-details'>
                    <div>
                        <dt>Enviar a</dt>
                        <dd>
                            {customerData.name} {customerData.lastName}<br />
                            {customerData.address}, {customerData.city}, {customerData.state} ({customerData.zip})
                        </dd>
                    </div>
                    <div>
                        <dt>Contacto</dt>
                        <dd>{customerData.email}<br />{customerData.phone}</dd>
                    </div>
                    {paymentMethod && (
                        <div>
                            <dt>Método de pago</dt>
                            <dd>{PAYMENT_LABELS[paymentMethod] || paymentMethod}</dd>
                        </div>
                    )}
                </dl>
            )}
        </aside>
    );
}

OrderSummaryCard.propTypes = {
    orderData: PropTypes.object,
    customerData: PropTypes.object,
    paymentMethod: PropTypes.string,
};
