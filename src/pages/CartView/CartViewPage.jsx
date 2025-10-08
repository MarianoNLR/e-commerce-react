import { useState } from "react"
import { useAuth } from '../../components/AuthProvider.jsx'
import { useCart } from '../../components/CartProvider.jsx'
import { useParams } from "react-router-dom"
import './CartViewPage.css'
import { Cart } from "../../components/Cart/Cart.jsx"
import { MercadoPagoButton } from "../../components/MercadoPagoButton.jsx"
import { Link } from "react-router-dom"
export function CartViewPage () {
    const { userId } = useParams()
    const {user, loadingUser} = useAuth()
    const {cart} = useCart()
    //TODO make a different component for cart
    
    if (loadingUser || !user) {
        return <></>
    }

    return (
        <>
            <main>
                <h1 className="cart-wrapper-title">Carrito de Compra</h1>
                <Cart userId={userId}></Cart>
                {cart?.items?.length > 0 && <Link to="/checkout/customer">Ir a Checkout</Link>}
                {/* {cart?.items?.length > 0 && <MercadoPagoButton></MercadoPagoButton>} */}
            </main>
        </>
    )
}