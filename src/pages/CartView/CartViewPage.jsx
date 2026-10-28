import { useAuth } from '../../hooks/useAuth.jsx'
import { useCart } from '../../hooks/useCart.jsx'
import { useParams } from "react-router-dom"
import './CartViewPage.css'
import { Cart } from "../../components/Cart/Cart.jsx"
import { SimpleToastAlert } from '../../components/SimpleToastAlert/SimpleToastAlert.jsx'

export function CartViewPage () {
    const { userId } = useParams()
    const {user, loadingUser} = useAuth()
    const {toastAlert, toastVisible, setToastVisible} = useCart()
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
            <h1 className="cart-wrapper-title">Carrito de compra</h1>
            <Cart userId={userId}></Cart>
        </>
    )
}