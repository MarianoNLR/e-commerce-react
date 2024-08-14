import './Header.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthProvider.jsx'
import { useCart } from '../../CartProvider.jsx'
import { CartHeader } from '../../CartHeader/CartHeader.jsx'
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
                    <CartHeader></CartHeader>
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