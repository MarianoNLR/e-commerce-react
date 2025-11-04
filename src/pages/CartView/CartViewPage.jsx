import { useState } from "react"
import { useAuth } from '../../components/AuthProvider.jsx'
import { useCart } from '../../components/CartProvider.jsx'
import { useParams } from "react-router-dom"
import './CartViewPage.css'
import { Cart } from "../../components/Cart/Cart.jsx"
import { MercadoPagoButton } from "../../components/MercadoPagoButton.jsx"
import { Link } from "react-router-dom"
import { SimpleToastAlert } from '../../components/SimpleToastAlert/SimpleToastAlert.jsx'

export function CartViewPage () {
    const { userId } = useParams()
    const {user, loadingUser} = useAuth()
    const {cart, toastAlert} = useCart()
    const [toastVisible, setToastVisible] = useState(false)
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
            <Cart userId={userId} setToastVisible={setToastVisible}></Cart>
            {cart?.items?.length > 0 && <Link to="/checkout/customer">Ir a Checkout</Link>}
            {/* {cart?.items?.length > 0 && <MercadoPagoButton></MercadoPagoButton>} */}
        </>
    )
}