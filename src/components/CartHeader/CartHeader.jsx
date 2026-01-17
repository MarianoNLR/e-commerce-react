import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.jsx"
import { useCart } from "../../hooks/useCart.jsx"
import cartIcon from '../../assets/cart-icon/icons8-cart-50.png'
import { useEffect } from "react"
export function CartHeader () {
    const {user, loadingUser} = useAuth()
    const localStorageUser = window.localStorage.getItem('access_token')
    const { cart, loadingCart} = useCart()


    if (loadingUser) {
        return null
    }

    if (loadingCart) {
        return <>Loading...</>
    }
    
    return (
        <div className='cart-icon-wrapper'>
            <Link to={`/cart/${user?.id}`}><img className='cart-image' src={cartIcon} alt="" />
            </Link>
            <span className='cart-products-number'>{cart?.items?.length || 0}</span>
        </div>
    )
}