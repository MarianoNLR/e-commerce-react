import './CheckoutConfirmationPage.css'
import { useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.jsx'
import CircularProgress from '@mui/material/CircularProgress';
import { PaymentMethodSection } from './payment-methods/PaymentMethodSection.jsx';
import { OrderSummaryCard } from './OrderSummaryCard.jsx';

export function CheckoutConfirmationPage() {
    const location = useLocation();
    const { cart, loadingCart } = useCart();
    const { customerData, paymentMethod, orderData } = location.state || {};

    if (loadingCart) {
        return <CircularProgress />;
    }
    return (
        <div className='checkout-confirmation-page'>
            <h1>Confirmación de pago</h1>
            <div className='checkout-confirmation-layout'>
                <PaymentMethodSection selectedMethod={paymentMethod} customerData={customerData} orderData={orderData} cart={cart} />
                <OrderSummaryCard orderData={orderData} customerData={customerData} paymentMethod={paymentMethod} />
            </div>
        </div>
    )
}
