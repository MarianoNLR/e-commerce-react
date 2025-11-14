import React, {createContext, useState, useContext, useEffect, useRef } from "react";
import api from "../api.js";
import { useAuth } from "./AuthProvider.jsx";
import { set } from "react-hook-form";
import { useAuthModal } from '../context/AuthModalContext.jsx';
import { SimpleToastAlert } from './SimpleToastAlert/SimpleToastAlert.jsx';

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const { user } = useAuth()
    //const user = JSON.parse(window.localStorage.getItem('user'))
    //const [cartCount, setCartCount] = useState([])
    const [cart, setCart] = useState({items: [], total: 0, userId: null})
    const [loadingCart, setLoadingCart] = useState(true)
    const [toastAlert, setToastAlert] = useState({message: '', variant: 'default'})
    const [toastVisible, setToastVisible] = useState(false)
    const { openModal, closeModal } = useAuthModal();
    const toastTimer = useRef(null);

    useEffect(() => {
        
        if (user?.id) {
            api.get(`/cart/${user.id}`)
            .then(res => {
                //setCartCount(res.data.cart.items.length)
                setCart({items: res.data.cart.items, total: res.data.cart.total, userId: user.id})
                setLoadingCart(false)
            })
            .catch(err => {
                setLoadingCart(false)
                console.error(err)
            }) 
        }
        setLoadingCart(false)
    }, [user?.id])

    const handleAddToCart = async (productId, quantity) => {
        // Lógica para agregar el ítem al backend
        if (!window.localStorage.getItem('access_token')) {
            openModal();
            return;
        }
        try {
            const res = await api.post('/cart', { data: { productId, quantity } });
            // Actualiza el estado del carrito con la respuesta
            // hideToast();
            setCart(res.data.cart);
            setToastAlert({message: 'Producto agregado al carrito', variant: 'success'})
            handleShowToast();
        } catch (error) {
            console.error("Error adding to cart:", error);
            // hideToast();
            setToastAlert({message: 'Error al agregar el producto al carrito', variant: 'error'})
            handleShowToast();
        }
        
    }

    const handleShowToast = () => {
        
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
            // Force to remount the toast component
            setToastVisible(false);
        }

        // Force to remount the toast component
        setTimeout(() => setToastVisible(true), 5);

        toastTimer.current = setTimeout(() => {
            setToastVisible(false);
            toastTimer.current = null;
        }, 3000);
    }

    // const hideToast = () => {
    //     setToastAlert(prev => ({ ...prev, show: false }));
    // }

    const handleRemoveFromCart = async (productId) => { 
        // Lógica para eliminar el ítem del backend
        const res = await api.patch(`/cart/item/${productId}`);
        // Actualiza el estado del carrito con la respuesta
        // hideToast();
        setCart(res.data.cart);
        setToastAlert({message: 'Producto eliminado del carrito', variant: 'success'})
        handleShowToast();
    }

    return (
        <CartContext.Provider value={
            {cart, 
            setCart, 
            loadingCart, 
            handleAddToCart, 
            handleRemoveFromCart, 
            toastAlert,
            toastVisible, 
            setToastVisible,
            handleShowToast,
            // hideToast
            }}>
            {children}
        </CartContext.Provider>
    )
}
