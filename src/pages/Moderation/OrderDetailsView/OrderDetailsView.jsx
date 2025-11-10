import React, { useEffect } from 'react';
import { useState } from "react";
import PropTypes from 'prop-types';
import './OrderDetailsView.css';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../../api.js';


export function OrderDetailsView({ order }) {
    const { id } = useParams();
    const location = useLocation();
    const [orderData, setOrderData] = useState(location.state?.order || null);
    const [loadingOrder, setLoadingOrder] = useState(!order);

    useEffect(() => {
        console.log(Boolean(orderData));
        if (!order) {
            api.get(`/orders/${id}`)
            .then(res => {
                setOrderData(res.data);
                setLoadingOrder(false);
            })
            .catch(err => {
                console.error(err); 
                setLoadingOrder(false);
            });
        }
    }, [id]);

    if (loadingOrder) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-details-view">
            {!loadingOrder && 
                
                <>
                    <p className='order-p'><strong>Order ID:</strong> {orderData.id}</p>
                    <p className='order-p'><strong>Customer Name:</strong> {orderData.user.username}</p>
                    
                   
                    <div className='order-details-products-container'>
                        <h2>Products:</h2>
                        <ul className='order-details-products-list'>
                            {orderData.products.map((productDetails) => (
                                <li key={productDetails.product.id}>
                                    {productDetails.product.name} x {productDetails.quantity} = ${productDetails.product.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className='order-p'><strong>Total Amount:</strong> ${orderData.total}</p>
                    <p className='order-p'><strong>Created At:</strong> {new Date(orderData.createdAt).toLocaleString()}</p>
                    <p className='order-p'><strong>Status:</strong> {orderData.status}</p>
                </>
                }
            

            
        </div>
    )
}

OrderDetailsView.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired,
        total: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired
        })).isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired
};