import { useState } from "react"
import { useAuth } from '../../components/AuthProvider.jsx'
import { useCart } from '../../components/CartProvider.jsx'
import { useParams } from "react-router-dom"
import './CartViewPage.css'
import { Cart } from "../../components/Cart/Cart.jsx"
import { MercadoPagoButton } from "../../components/MercadoPagoButton.jsx"
export function CartViewPage () {
    const { userId } = useParams()
    const [cart, setCart] = useState(null)
    const {user, loadingUser} = useAuth()
    const {setCartCount} = useCart()
    //TODO make a different component for cart
    
    if (loadingUser || !user) {
        return <></>
    }

    return (
        <>
            <main>
                <h1 className="cart-wrapper-title">Carrito de Compra</h1>
                <Cart cart={cart} setCart={setCart} setCartCount={setCartCount} userId={userId}></Cart>
                <MercadoPagoButton></MercadoPagoButton>
            </main>
        </>
    )
}