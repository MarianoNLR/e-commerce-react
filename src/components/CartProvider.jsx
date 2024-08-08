import React, {createContext, useState, useContext, useEffect } from "react";
import api from "../api.js";
import { useAuth } from "./AuthProvider.jsx";

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const {user} = useAuth()
    const [cartCount, setCartCount] = useState([])
    const [loadingCartCount, setLoadingCartCount] = useState(true)

    useEffect(() => {
        if (user?.id) {
            api.get(`/cart/${user.id}`)
            .then(res => {
                setCartCount(res.data.cart.items)
                setLoadingCartCount(false)
            })
            .catch(err => {
                console.error(err)
            }) 
        }
        
    }, [user])

    return (
        <CartContext.Provider value={{cartCount, setCartCount, loadingCartCount}}>
            {children}
        </CartContext.Provider>
    )
}
