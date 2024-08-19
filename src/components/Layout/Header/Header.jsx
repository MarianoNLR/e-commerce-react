import './Header.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../AuthProvider.jsx'
import { useCart } from '../../CartProvider.jsx'
import { CartHeader } from '../../CartHeader/CartHeader.jsx'
export function Header () {
    const {user, loadingUser, logout} = useAuth()
    const localStorageUser = JSON.parse(window.localStorage.getItem('user'))
    const { cartCount, loadingCartCount } = useCart()

    if (loadingUser || loadingCartCount) {
        return <></>
    }

    return (
        <header className='header'>
            {localStorageUser ?
                <div className="header-main-wrapper">
                    <Link to='/'>Logo</Link>
                    <div className="user-options-wrapper">
                        <CartHeader></CartHeader>
                        <Link onClick={logout}>Cerrar sesion</Link>
                    </div>
                </div>   
                :
                <div className="header-main-wrapper">
                    <Link to='/' className='header-logo'>Logo</Link>
                    <Link to='/login' className='header-login-link'>Inciar Sesión</Link>
                </div>
            }
        </header>
    )
}