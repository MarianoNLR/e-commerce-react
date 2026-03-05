import './CheckoutConfirmationPage.css'
import { useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.jsx'
import { MercadoPagoButton } from "../../components/MercadoPagoButton.jsx"
import CircularProgress from '@mui/material/CircularProgress';

export function CheckoutConfirmationPage() {
    const location = useLocation();
    const { cart, setCart, loadingCart } = useCart();
    const { customerData, paymentMethod } = location.state || {};
    
    console.log('Datos del cliente en Confirmación:', customerData);
    console.log('Método de pago en Confirmación:', paymentMethod);
    console.log('Cart in Confirmación:', cart);
    console.log('Cart Count in Confirmación:', cart?.items?.length || 0);

    if (loadingCart) {
        return <CircularProgress />;
    }
    return (
        <>
            <h1>Resumen del Pedido</h1>
            <div className='customer-data-section'>
                <h2>Detalles del Cliente</h2>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Nombre: </p>
                    <p className='order-summary-group-value'>{customerData?.name}</p>
                </div>

                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Apellido: </p>
                    <p className='order-summary-group-value'>{customerData?.lastName}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Email: </p>
                    <p className='order-summary-group-value'>{customerData?.email}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Teléfono: </p>
                    <p className='order-summary-group-value'>{customerData?.phone}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Dirección: </p>
                    <p className='order-summary-group-value'>{customerData?.address}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Estado: </p>
                    <p className='order-summary-group-value'>{customerData?.state}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Ciudad: </p>
                    <p className='order-summary-group-value'>{customerData?.city}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Código Postal: </p>
                    <p className='order-summary-group-value'>{customerData?.zip}</p>
                </div>
            </div>
            {cart?.items?.length > 0 && <div className='payment-button-container'><MercadoPagoButton shipping_info={customerData}></MercadoPagoButton></div>}
        </>
    )
}