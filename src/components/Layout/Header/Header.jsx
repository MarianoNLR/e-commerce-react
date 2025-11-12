import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthProvider.jsx'
import { useCart } from '../../CartProvider.jsx'
import { CartHeader } from '../../CartHeader/CartHeader.jsx'
import { useAuthModal } from '../../../context/AuthModalContext.jsx'
export function Header () {
    const { openModal } = useAuthModal()
    const {user, loadingUser, logout} = useAuth()
    const localStorageUser = window.localStorage.getItem('access_token') ? JSON.parse(window.localStorage.getItem('access_token')) : null
    const { cartCount, loadingCartCount } = useCart()
    const navigate = useNavigate()
    if (loadingUser || loadingCartCount) {
        return <></>
    }

    const handleLogout = async () => {
        await logout().then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <header className='header'>
            {localStorageUser ?
                <div className="header-main-wrapper">
                    <Link to='/'>Logo</Link>
                    <div className="user-options-wrapper">
                        <CartHeader></CartHeader>
                        <Link onClick={handleLogout}>Cerrar sesion</Link>
                    </div>
                </div>   
                :
                <div className="header-main-wrapper">
                    <Link to='/' className='header-logo'>Logo</Link>
                    <Link to='#' onClick={openModal} className='header-login-link'>Iniciar Sesión</Link>
                </div>
            }
        </header>
    )
}