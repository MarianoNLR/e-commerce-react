import {CartProductCard} from '../CartProductCard/CartProductCard.jsx'
import PropTypes from 'prop-types'
import './Cart.css'
import { Link } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { useCart } from "../../hooks/useCart.jsx"

const formatPrice = (price) => {
    if (!price) {
        return
    }

    return price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})
}

export function Cart () {
    const {cart, loadingCart, handleRemoveFromCart} = useCart()

    if (loadingCart) {
        return (
            <div className="cart-loading" role="status" aria-label="Cargando carrito">
                <CircularProgress sx={{ color: 'var(--accent)' }} />
            </div>
        )
    }

    const hasItems = cart?.items?.length > 0

    if (!hasItems) {
        return (
            <div className="empty-cart-text">
                <h2>Tu carrito está vacío</h2>
                <p>Cuando agregues productos, los vas a ver acá.</p>
                <Link to={'/'} className="btn btn-primary">Ver productos</Link>
            </div>
        )
    }

    return (
        <div className="cart-layout">
            <div className="cart-details-wrapper">
                {cart.items.map((item) => (
                    <CartProductCard
                        key={item.product.id}
                        productId={item.product.id}
                        name={item.product.name}
                        price={item.product.price}
                        quantity={item.quantity}
                        images={item.product.images}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                ))}
            </div>
            <aside className="cart-summary" aria-label="Resumen de la compra">
                <h2 className="cart-summary-title">Resumen</h2>
                <div className="cart-total_price-wrapper">
                    <span>Total</span>
                    <span className="cart-total_price tabular">{formatPrice(cart.totalPrice)}</span>
                </div>
                <Link to="/checkout/customer" className="btn btn-primary btn-block">Continuar con la compra</Link>
            </aside>
        </div>
    )
}

Cart.propTypes = {
    cart: PropTypes.object,
    setCart: PropTypes.func,
    setCartCount: PropTypes.func,
    userId: PropTypes.string
}
