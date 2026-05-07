import React, { useEffect } from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import './OrderDetailsView.css';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../api.js';
import { UpdateStatusModal } from './UpdateStatusModal.jsx';
import { ImageModal } from '../../../components/ImageModal/ImageModal.jsx';


export function OrderDetailsView() {
    const { orderId } = useParams();
    const location = useLocation();
    const [orderData, setOrderData] = useState(location.state?.order || null);
    const [loadingOrder, setLoadingOrder] = useState(true);
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
    const [showProofModal, setShowProofModal] = useState(false);
    const orderPossibleStatus = {
        pending_payment: "Pendiente",
        pending_validation: "Pendiente de validación",
        paid: "Pagado",
        shipped: "Enviado",
        delivered: "Entregado",
        cancelled: "Cancelado"
    }

    useEffect(() => {
            api.get(`/orders/${orderId}`)
            .then(res => {
                setOrderData(res.data);
                setLoadingOrder(false);
            })
            .catch(err => {
                console.error(err); 
                setLoadingOrder(false);
            }); 
    }, [orderId]);

    if (loadingOrder) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-details-view">
            {!loadingOrder && 
                
                <>
                    <p className='order-p'><strong>Orden ID:</strong> {orderData.id}</p>
                    <p className='order-p'><strong>Nombre del Cliente:</strong> {orderData.user.name}</p>
                    
                   
                    <div className='order-details-products-container'>
                        <h2>Productos:</h2>
                        <ul className='order-details-products-list'>
                            {orderData.items.map((productDetails, index) => (
                                <li key={index}>
                                    {productDetails.name} x {productDetails.quantity} = ${productDetails.priceAtPurchase}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className='order-p'><strong>Total:</strong> ${orderData.total}</p>
                    <p className='order-p'><strong>Fecha de pedido:</strong> {new Date(orderData.createdAt).toLocaleString()}</p>

                    <div className='order-details-products-container'>
                        <h2>Comprobante de pago:</h2>
                        {orderData.proof_of_payment_url ? (
                            <button
                                type='button'
                                onClick={() => setShowProofModal(true)}
                                className='order-proof-link'
                                title='Ver comprobante de pago'
                            >
                                <img
                                    src={orderData.proof_of_payment_url}
                                    alt='Comprobante de pago'
                                    className='order-proof-preview'
                                    loading='lazy'
                                />
                                <span className='order-proof-hint'>Click para ampliar imagen</span>
                            </button>
                        ) : (
                            <p className='order-p'>No hay comprobante de pago disponible.</p>
                        )}
                    </div>

                    {showProofModal && (
                        <ImageModal imageUrl={orderData.proof_of_payment_url} onClose={() => setShowProofModal(false)} />
                    )}

                    <div className='order-status-wrapper'>
                        <p className='order-p'><strong>Estado:</strong> {orderPossibleStatus[orderData.status]}</p>
                        <button onClick={() => setShowUpdateStatusModal(true)} type="button">Actualizar Estado</button>
                        {showUpdateStatusModal && <UpdateStatusModal 
                        orderPossibleStatus={orderPossibleStatus} 
                        setOrderData={setOrderData} 
                        orderData={orderData} 
                        setShowUpdateStatusModal={setShowUpdateStatusModal} />}
                    </div>
                </>
                }
            

            
        </div>
    )
}

// OrderDetailsView.propTypes = {
//     order: PropTypes.shape({
//         orderId: PropTypes.string.isRequired,
//         user: PropTypes.shape({
//             username: PropTypes.string.isRequired
//         }).isRequired,
//         total: PropTypes.number.isRequired,
//         status: PropTypes.string.isRequired,
//         products: PropTypes.arrayOf(PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//             price: PropTypes.number.isRequired,
//             quantity: PropTypes.number.isRequired
//         })).isRequired,
//         createdAt: PropTypes.string.isRequired
//     }).isRequired
// };