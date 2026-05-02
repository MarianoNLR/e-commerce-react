import React, {useState, useEffect, useRef, useCallback } from "react";
import api from "../api.js";
import { useAuthLogic } from "../hooks/useAuthLogic.jsx";
import { useAuthModal } from '../hooks/useAuthModal.jsx';
import { CartContext } from "../contexts/CartContext.jsx";

export const CartProvider = ({ children }) => {
    const { user } = useAuthLogic()
    //const user = JSON.parse(window.localStorage.getItem('user'))
    //const [cartCount, setCartCount] = useState([])
    const [cart, setCart] = useState({items: [], total: 0, userId: null})
    const [loadingCart, setLoadingCart] = useState(true)
    const [toastAlert, setToastAlert] = useState({message: '', variant: 'default'})
    const [toastVisible, setToastVisible] = useState(false)
    const { openModal } = useAuthModal();
    const toastTimer = useRef(null);

    const clearCart = () => {
        setCart({ items: [], total: 0, userId: user?.id || null });
    };

    const refreshCart = useCallback(async () => {
        if (!user?.id) {
            setCart({ items: [], total: 0, userId: null });
            setLoadingCart(false);
            return;
        }

        setLoadingCart(true);
        try {
            const res = await api.get(`/cart`);
            const data = res?.data || res;

            if (!data || !data.items) {
                setCart({ items: [], total: 0, userId: user.id });
                setLoadingCart(false);
                return;
            }

            setCart({ items: data.items, total: data.totalPrice, userId: user.id });
            setLoadingCart(false);
        } catch (err) {
            setLoadingCart(false);
            console.error(err);
        }
    }, [user?.id]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart])

    

    const handleAddToCart = async (productId, quantity) => {
        // Lógica para agregar el ítem al backend
        if (!window.localStorage.getItem('access_token')) {
            openModal();
            return;
        }
        try {
            const res = await api.post('/cart', { productId, quantity: Number(quantity) });
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
            clearCart,
            refreshCart,
            // hideToast
            }}>
            {children}
        </CartContext.Provider>
    )
}
