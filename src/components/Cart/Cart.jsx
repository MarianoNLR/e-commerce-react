import { useState, useEffect } from "react"
import api from "../../api.js"
import {CartProductCard} from '../CartProductCard/CartProductCard.jsx'
import PropTypes from 'prop-types'

export function Cart ({cart, setCart, setCartCount, userId}) {
    const [loadingCart, setLoadingCart] = useState(true)

    useEffect(() => {
        api.get(`/cart/${userId}`)
        .then(res => {
            setCart(res.data.cart)
            setLoadingCart(false)
        })
        .catch(err => {
            console.error(err)
        })
    }, [userId, loadingCart])

    const formatPrice = (price) => {
        if (!price) {
            return
        }

        const formatted = price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})

        return formatted
    }

    const handleDeleteItem = (e, product) => {
        e.preventDefault()
        setLoadingCart(true)
        api.patch(`/cart/item/${product}`)
        .then(res => {
            setCart(res.data.cart)
            setCartCount(prev => prev - 1)
            setLoadingCart(false)
        })
        .catch(err => {
            console.error(err)
        })
    }

    if (loadingCart) {
        return <></>
    }

    return (
        <>
            <h1 className="cart-wrapper-title">Carrito de Compra</h1>
                <div className="cart-details-wrapper">
                    {cart.items.map((item, index) => (
                            <CartProductCard 
                            key={index} 
                            productId={item.product.id} 
                            name={item.product.name} 
                            price={item.product.price} 
                            quantity={item.quantity} 
                            imageURL={item.product.imageURL} 
                            handleDeleteItem={handleDeleteItem}>
                            </CartProductCard>
                    ))}
                </div>
                <div className="cart-total_price-wrapper">
                    {cart.totalPrice > 0 ? <p className="cart-total_price">Precio Total: <span>{formatPrice(cart.totalPrice)}</span></p> : null}
                </div>
        </>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
    setCart: PropTypes.func,
    setCartCount: PropTypes.func,
    userId: PropTypes.string
}