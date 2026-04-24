import { Link } from 'react-router-dom';
import './PaymentStatus.css';

export function PaymentSuccess({ order }) {
    const formatPrice = (value) => {
        if (typeof value !== 'number') {
            return '-';
        }
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(value);
    };

    return (
        <section className="payment-status payment-status-success">
            <h1 className="payment-status-title">Pago efectuado correctamente</h1>
            <p className="payment-status-message">
                Tu pago fue acreditado. A continuacion te dejamos el resumen del pedido.
            </p>
            <div className="payment-status-summary">
                <p className="payment-status-summary-title">Resumen del pedido</p>
                <div className="payment-status-summary-line">
                    <span>Orden</span>
                    <span>{order?.id ?? order?.orderId ?? 'Sin numero'}</span>
                </div>
                <div className="payment-status-divider" />
                <div className="payment-status-summary-list">
                    {order?.items?.length ? (
                        order.items.map((item, index) => (
                            <div className="payment-status-summary-item" key={`${item?.id ?? item?.name ?? 'item'}-${index}`}>
                                <span>{item?.name ?? 'Producto'}</span>
                                <span>x{item?.quantity ?? item?.qty ?? 1}</span>
                            </div>
                        ))
                    ) : (
                        <div className="payment-status-summary-item">
                            <span>No hay items para mostrar.</span>
                        </div>
                    )}
                </div>
                <div className="payment-status-divider" />
                <div className="payment-status-summary-total">
                    <span>Total</span>
                    <span>{formatPrice(order?.total)}</span>
                </div>
            </div>
            <p className="payment-status-message">
                Enviaremos los detalles del pedido al correo asociado a tu compra.
            </p>
            <Link className="payment-status-cta" to="/">Volver al inicio</Link>
        </section>
    );
}
