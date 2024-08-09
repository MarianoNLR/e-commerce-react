import './Header.css'
import { Link } from 'react-router-dom'
import cartIcon from '../../../assets/cart-icon/icons8-cart-50.png'
import { useAuth } from '../../AuthProvider.jsx'
import { useEffect, useState } from 'react'
import { useCart } from '../../CartProvider.jsx'
export function Header () {
    const {user, loadingUser} = useAuth()
    const { cartCount, loadingCartCount } = useCart()

    if (loadingUser || loadingCartCount) {
        return <></>
    }

    return (
        <>
            {user ? 
                <div className="header-wrapper">
                    <Link to='/'>Logo</Link>
                    <div className='cart-icon-wrapper'>
                        <Link to={`/cart/${user.id}`}><img className='cart-image' src={cartIcon} alt="" />
                        </Link>
                        <span className='cart-products-number'>{cartCount.length}</span>
                    </div>
                </div>
                :
                <div className="header-wrapper">
                    <Link to='/' className='header-logo'>Logo</Link>
                    <Link to='/login' className='header-login-link'>Inciar Sesión</Link>
                </div>
            }
            
        </>
    )
}