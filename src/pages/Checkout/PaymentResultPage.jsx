import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../api.js';
import { PaymentSuccess } from '../../components/PaymentStatus/PaymentSuccess.jsx';
import { PaymentPending } from '../../components/PaymentStatus/PaymentPending.jsx';
import { PaymentFailed } from '../../components/PaymentStatus/PaymentFailed.jsx';
import '../../components/PaymentStatus/PaymentStatus.css';
import { ORDER_STATUSES, isOrderFailureStatus } from '../../utils/orderStatuses.js';

export function PaymentResultPage() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const paymentId = searchParams.get('payment_id');
        const orderId = searchParams.get('external_reference');
        if (!paymentId) {
            setStatus('failure');
            return;
        }

        let attempts = 0;
        const MAX_ATTEMPTS = 10;
        const INTERVAL_MS = 2000;
        const poll = async () => {
            try {
                const res = await api.get(`/orders/${orderId}`);
                const orderStatus = res.data.status;

                if (orderStatus === ORDER_STATUSES.PAID || isOrderFailureStatus(orderStatus)) {
                    setStatus(orderStatus === ORDER_STATUSES.PAID ? 'paid' : 'failure');
                    setOrder(res.data);
                    return;
                }

                attempts++;
                if (attempts < MAX_ATTEMPTS) {
                    setTimeout(poll, INTERVAL_MS);
                } else {
                    setStatus('pending');
                }
            } catch (err) {
                console.error('Error fetching order:', err);
                setStatus('failure');
                return;
            }
        }
        // Primero se verifica el pago directamente con el backend, sin esperar al webhook.
        // Si falla, el polling sigue funcionando como respaldo.
        const verifyThenPoll = async () => {
            try {
                await api.post('/checkout/verify-payment', { payment_id: paymentId, order_id: orderId });
            } catch (err) {
                console.error('No se pudo verificar el pago al volver de la pasarela:', err);
            }
            poll();
        };
        verifyThenPoll();
    }, []);

    if (status === 'loading') {
        return (
            <section className="payment-status">
                <CircularProgress />
                <p className="payment-status-message">Estamos verificando tu pago. Esto puede tardar unos segundos.</p>
            </section>
        );
    }

    if (status === 'paid') {
        return <PaymentSuccess order={order} />;
    }

    if (status === 'pending') {
        return <PaymentPending />;
    }

    return <PaymentFailed />;
}
