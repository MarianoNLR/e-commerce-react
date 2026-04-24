import './PaymentStatus.css';

export function PaymentFailed() {
    return (
        <section className="payment-status payment-status-failure">
            <h1 className="payment-status-title">Pago rechazado</h1>
            <p className="payment-status-message">No pudimos procesar el pago. Por favor, intenta nuevamente o usa otro medio.</p>
        </section>
    );
}
