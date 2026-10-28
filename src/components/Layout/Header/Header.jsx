import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth.jsx'
import { useCart } from '../../../hooks/useCart.jsx'
import { CartHeader } from '../../CartHeader/CartHeader.jsx'
import { useAuthModal } from '../../../hooks/useAuthModal.jsx'
import { FaUserCircle } from 'react-icons/fa'

export function Header () {
    const { openModal } = useAuthModal() ?? {}
    const { loadingUser, logout } = useAuth()
    const isLoggedIn = Boolean(window.localStorage.getItem('access_token'))
    const { loadingCartCount } = useCart()
    const navigate = useNavigate()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const userMenuRef = useRef(null)

    // Los hooks van siempre antes de cualquier return condicional.
    useEffect(() => {
        if (!isUserMenuOpen) {
            return
        }

        const handleOutsideClick = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isUserMenuOpen])

    if (loadingUser || loadingCartCount) {
        return <></>
    }

    const handleLogout = async () => {
        setIsUserMenuOpen(false)
        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header className='header'>
            <div className='header-main-wrapper'>
                <Link to='/' className='header-logo'>Logo</Link>
                {isLoggedIn ?
                    <div className='user-options-wrapper'>
                        <CartHeader></CartHeader>
                        <div className='user-menu-wrapper' ref={userMenuRef}>
                            <button
                                className='user-menu-button'
                                type='button'
                                aria-label='Menú de usuario'
                                aria-haspopup='menu'
                                aria-expanded={isUserMenuOpen}
                                onClick={() => setIsUserMenuOpen(prev => !prev)}
                            >
                                <FaUserCircle aria-hidden='true' />
                            </button>
                            {isUserMenuOpen && (
                                <div className='user-menu' role='menu'>
                                    <Link
                                        to='/my-orders'
                                        className='user-menu-item'
                                        role='menuitem'
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Mis órdenes
                                    </Link>
                                    <button
                                        className='user-menu-item'
                                        type='button'
                                        role='menuitem'
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <Link to='#' onClick={openModal} className='header-login-link'>Iniciar sesión</Link>
                }
            </div>
        </header>
    )
}
