import { useState } from "react"
import { useAuth } from '../../hooks/useAuth.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { useParams } from "react-router-dom"
import './CartViewPage.css'
import { Cart } from "../../components/Cart/Cart.jsx"
import { MercadoPagoButton } from "../../components/MercadoPagoButton.jsx"
import { Link } from "react-router-dom"
import { SimpleToastAlert } from '../../components/SimpleToastAlert/SimpleToastAlert.jsx'

export function CartViewPage () {
    const { userId } = useParams()
    const {user, loadingUser} = useAuth()
    const {cart, toastAlert, toastVisible, setToastVisible} = useCart()
    //TODO make a different component for cart
    
    if (loadingUser || !user) {
        return <></>
    }

    return (
        <>
            {toastVisible && (
                <SimpleToastAlert
                    message={toastAlert.message}
                    variant={toastAlert.variant}
                    onClose={setToastVisible}
                />
            )}
            <h1 className="cart-wrapper-title">Carrito de Compra</h1>
            <Cart userId={userId}></Cart>
            {cart?.items?.length > 0 && <Link to="/checkout/customer">Ir a Checkout</Link>}
            {/* {cart?.items?.length > 0 && <MercadoPagoButton></MercadoPagoButton>} */}
        </>
    )
}