import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.jsx"
import { useCart } from "../../hooks/useCart.jsx"
import { FaShoppingCart } from 'react-icons/fa'

export function CartHeader () {
    const { user, loadingUser } = useAuth()
    const { cart, loadingCart } = useCart()

    if (loadingUser) {
        return null
    }

    // Mientras carga se muestra el ícono sin contador, así el header no "salta".
    const itemsCount = loadingCart ? 0 : (cart?.items?.length || 0)

    return (
        <div className='cart-icon-wrapper'>
            <Link
                to={`/cart/${user?.id}`}
                aria-label={itemsCount > 0 ? `Ver carrito, ${itemsCount} productos` : 'Ver carrito'}
            >
                <FaShoppingCart className='cart-icon' aria-hidden="true" />
            </Link>
            {itemsCount > 0 && (
                <div className='cart-products-badge' aria-hidden="true">
                    <span className='cart-products-number'>{itemsCount}</span>
                </div>
            )}
        </div>
    )
}
