import React, {createContext, useState, useContext, useEffect } from "react";
import api from "../api.js";
import { useAuth } from "./AuthProvider.jsx";

const CartContext = createContext()

export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    //const {user} = useAuth()
    const user = JSON.parse(window.localStorage.getItem('user'))
    const [cartCount, setCartCount] = useState([])
    const [loadingCartCount, setLoadingCartCount] = useState(true)

    useEffect(() => {
        
        if (user?.user.id) {
            api.get(`/cart/${user.user.id}`)
            .then(res => {
                setCartCount(res.data.cart.items.length)
                setLoadingCartCount(false)
            })
            .catch(err => {
                setLoadingCartCount(false)
                console.error(err)
            }) 
        }
        setLoadingCartCount(false)
    }, [user, cartCount])

    return (
        <CartContext.Provider value={{cartCount, setCartCount, loadingCartCount}}>
            {children}
        </CartContext.Provider>
    )
}
