import React, { useEffect } from 'react';
import { useState } from "react";
import './OrderDetailsView.css';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../api.js';
import { UpdateStatusModal } from './UpdateStatusModal.jsx';
import { ImageModal } from '../../../components/ImageModal/ImageModal.jsx';
import { OrderStatusBadge } from '../../../components/OrderStatusBadge/OrderStatusBadge.jsx';
import { ORDER_STATUS_LABELS } from '../../../utils/orderStatuses.js';


export function OrderDetailsView() {
    const { orderId } = useParams();
    const location = useLocation();
    const [orderData, setOrderData] = useState(location.state?.order || null);
    const [loadingOrder, setLoadingOrder] = useState(true);
    const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
    const [showProofModal, setShowProofModal] = useState(false);

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
        return <section className="admin-page admin-page-status" role="status">Cargando pedido…</section>;
    }

    if (!orderData) {
        return <section className="admin-page admin-page-status" role="alert">No se pudo cargar el pedido.</section>;
    }

    const formatPrice = (price) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

    return (
        <section className="admin-page order-details-view">
            <div className="admin-page-header">
                <h1>Pedido #{orderData.id}</h1>
                <OrderStatusBadge status={orderData.status} />
            </div>

            <div className="detail-card">
                <dl className="order-details-summary">
                    <div className="detail-row"><dt>Cliente</dt><dd>{orderData.user?.name}</dd></div>
                    <div className="detail-row"><dt>Fecha del pedido</dt><dd>{new Date(orderData.createdAt).toLocaleString('es-AR')}</dd></div>
                </dl>

                <div>
                    <h2>Productos</h2>
                    <ul className="order-details-products-list">
                        {orderData.items.map((productDetails, index) => (
                            <li key={index}>
                                <span>{productDetails.name} <span className="order-details-qty">× {productDetails.quantity}</span></span>
                                <span className="tabular">{formatPrice(productDetails.priceAtPurchase)}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="order-details-total"><span>Total</span><strong className="tabular">{formatPrice(orderData.total)}</strong></p>
                </div>

                <div>
                    <h2>Comprobante de pago</h2>
                    {orderData.proof_of_payment_url ? (
                        <button
                            type="button"
                            onClick={() => setShowProofModal(true)}
                            className="order-proof-link"
                            title="Ver comprobante de pago"
                        >
                            <img
                                src={orderData.proof_of_payment_url}
                                alt="Comprobante de pago"
                                className="order-proof-preview"
                                loading="lazy"
                            />
                            <span className="order-proof-hint">Click para ampliar</span>
                        </button>
                    ) : (
                        <p className="order-details-empty">No hay comprobante de pago disponible.</p>
                    )}
                </div>

                <div className="order-status-wrapper">
                    <button onClick={() => setShowUpdateStatusModal(true)} type="button" className="btn btn-primary">Actualizar estado</button>
                </div>
            </div>

            {showProofModal && (
                <ImageModal imageUrl={orderData.proof_of_payment_url} onClose={() => setShowProofModal(false)} />
            )}

            {showUpdateStatusModal && (
                <UpdateStatusModal
                    orderPossibleStatus={ORDER_STATUS_LABELS}
                    setOrderData={setOrderData}
                    orderData={orderData}
                    setShowUpdateStatusModal={setShowUpdateStatusModal} />
            )}
        </section>
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