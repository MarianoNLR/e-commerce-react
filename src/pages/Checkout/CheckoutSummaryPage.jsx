import './CheckoutSummaryPage.css'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import api from '../../api.js';
import { FeedbackModal } from '../../components/FeedbackModal/FeedbackModal.jsx';
import { useCart } from '../../hooks/useCart.jsx';

export function CheckoutSummaryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { customerData, paymentMethod } = location.state || {};
    const [isProcessingOrder, setIsProcessingOrder] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState({
        isOpen: false,
        title: '',
        description: '',
        type: 'error',
    });

    const closeFeedbackModal = () => {
        setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
    };

    const handleConfirmOrder = async () => {
        setIsProcessingOrder(true);

        try {
            const response = await api.post('/orders', {
                shipping_info: customerData,
                payment_method: paymentMethod,
            });

            if (!response?.success) {
                throw new Error('No se pudo crear la orden.');
            }

            clearCart();
            console.log('Respuesta de creación de orden:', response);
            navigate('/checkout/confirmation', {
                state: {
                    customerData,
                    paymentMethod,
                    orderData: response?.data.newOrder || null,
                },
            });
        } catch (error) {
            setFeedbackModal({
                isOpen: true,
                title: 'No se pudo confirmar el pedido',
                description: 'Ocurrio un error al crear la orden. Intenta nuevamente en unos minutos.',
                type: 'error',
            });
        } finally {
            setIsProcessingOrder(false);
        }
    };

    if (!customerData) {
        return (
            <main className='checkout-summary-page'>
                <p>No se encontraron datos del pedido para mostrar el resumen.</p>
            </main>
        );
    }

    return (
        <main className='checkout-summary-page'>
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
                    <p className='order-summary-group-label'>Telefono: </p>
                    <p className='order-summary-group-value'>{customerData?.phone}</p>
                </div>
                <div className='order-summary-group'>
                    <p className='order-summary-group-label'>Direccion: </p>
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
                    <p className='order-summary-group-label'>Codigo Postal: </p>
                    <p className='order-summary-group-value'>{customerData?.zip}</p>
                </div>
            </div>
            <div className='payment-method-section'>
                <h2>Método de Pago</h2>
                <p>{paymentMethod}</p>
            </div>
            <button className='confirm-order-button' type='button' onClick={handleConfirmOrder}>
                {isProcessingOrder ? 'Procesando...' : 'Confirmar pedido'}
            </button>

            <FeedbackModal
                isOpen={isProcessingOrder || feedbackModal.isOpen}
                onClose={isProcessingOrder ? () => {} : closeFeedbackModal}
                title={isProcessingOrder ? 'Procesando pedido' : feedbackModal.title}
                description={
                    isProcessingOrder
                        ? 'Estamos creando tu orden. Esto puede tardar unos segundos.'
                        : feedbackModal.description
                }
                icon={isProcessingOrder ? <FaSpinner /> : <FaExclamationCircle />}
                isSpinningIcon={isProcessingOrder}
                buttonText={isProcessingOrder ? 'Procesando...' : 'Entendido'}
                hideCloseButton={isProcessingOrder}
                isActionDisabled={isProcessingOrder}
            />
            
        </main>
    )
}