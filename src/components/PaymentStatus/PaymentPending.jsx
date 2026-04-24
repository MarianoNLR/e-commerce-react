import './PaymentStatus.css';

export function PaymentPending() {
    return (
        <section className="payment-status payment-status-pending">
            <h1 className="payment-status-title">Pago pendiente</h1>
            <p className="payment-status-message">Estamos esperando la confirmacion de tu pago. Te avisaremos cuando se acredite.</p>
        </section>
    );
}
