import { Link } from "react-router-dom"
import { useAuth } from "../AuthProvider.jsx"
import { useCart } from "../CartProvider.jsx"
import cartIcon from '../../assets/cart-icon/icons8-cart-50.png'
export function CartHeader () {
    const {user, loadingUser} = useAuth()
    const localStorageUser = JSON.parse(window.localStorage.getItem('user'))
    const { cartCount, loadingCartCount } = useCart()

    if (loadingUser) {
        return null
    }

    if (loadingCartCount) {
        return <>Loading...</>
    }

    return (
        <div className='cart-icon-wrapper'>
            <Link to={`/cart/${localStorageUser.user.id}`}><img className='cart-image' src={cartIcon} alt="" />
            </Link>
            <span className='cart-products-number'>{cartCount}</span>
        </div>
    )
}