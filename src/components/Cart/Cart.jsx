import { useState, useEffect } from "react"
import api from "../../api.js"
import {CartProductCard} from '../CartProductCard/CartProductCard.jsx'
import PropTypes from 'prop-types'
import './Cart.css'
import { Link } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { useCart } from "../../hooks/useCart.jsx"

export function Cart (props) {
    //const [loadingCart, setLoadingCart] = useState(true)
    const {cart, loadingCart, handleRemoveFromCart} = useCart()
    
    // useEffect(() => {
    //     api.get(`/cart/${userId}`)
    //     .then(res => {
    //         setCart(res.data.cart)
    //         setLoadingCart(false)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })  
    // }, [userId, loadingCart])

    const formatPrice = (price) => {
        if (!price) {
            return
        }

        const formatted = price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})

        return formatted
    }

    // const handleDeleteItem = (e, product) => {
    //     e.preventDefault()
    //     setLoadingCart(true)
    //     api.patch(`/cart/item/${product}`)
    //     .then(res => {
    //         setCart(res.data.cart)
    //         setCartCount(prev => prev - 1)
    //         setLoadingCart(false)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    if (loadingCart) {
        return <CircularProgress></CircularProgress>
    }
    
    return (
        <>  
                {!cart || cart?.items?.length <= 0 && 
                <div className="empty-cart-text">
                    <h3>Tu carrito de compra se encuentra vacío.</h3>
                    <Link to={'/'}>Agrega algunos productos!</Link>
                </div>
                }
                <div className="cart-details-wrapper">
                    {cart?.items?.map((item, index) => (
                        console.log(item),
                            <CartProductCard 
                            key={index} 
                            productId={item.product.id} 
                            name={item.product.name} 
                            price={item.product.price} 
                            quantity={item.quantity} 
                            images={item.product.images} 
                            handleRemoveFromCart={handleRemoveFromCart}
                            >
                            </CartProductCard>
                    ))}
                </div>
                {cart?.totalPrice > 0 ?
                <div className="cart-total_price-wrapper">
                    <p>Precio Total:</p><span className="cart-total_price">{formatPrice(cart.totalPrice)}</span>
                </div>
                : null
                }
        </>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
    setCart: PropTypes.func,
    setCartCount: PropTypes.func,
    userId: PropTypes.string
}