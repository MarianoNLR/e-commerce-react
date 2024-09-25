import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthProvider.jsx'
import { useCart } from '../../CartProvider.jsx'
import { CartHeader } from '../../CartHeader/CartHeader.jsx'
export function Header () {
    const {user, loadingUser, logout} = useAuth()
    const localStorageUser = JSON.parse(window.localStorage.getItem('user'))
    const { cartCount, loadingCartCount } = useCart()
    const navigate = useNavigate()
    if (loadingUser || loadingCartCount) {
        return <></>
    }

    const handleLogout = async () => {
        await logout().then(res => {
            console.log(res)
            navigate('/login')
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
                    <Link to='/login' className='header-login-link'>Inciar Sesión</Link>
                </div>
            }
        </header>
    )
}