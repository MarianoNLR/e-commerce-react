import { useState } from 'react'
import './MobileHeader.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.jsx'
import { useCart } from '../../../hooks/useCart.jsx'
import { useAuthModal } from '../../../hooks/useAuthModal.jsx'

export function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth()
    const { openModal } = useAuthModal() ?? {}
    const { cart } = useCart()

    const closeMenu = () => setMenuOpen(false)

    const handleMenuAction = (action) => {
        action?.();
        closeMenu();
    }

    return (
        <header className='mobile-header'>
            <div className='mobile-header-bar'>
                <Link to='/' className='header-logo' onClick={closeMenu}>Logo</Link>
                <button
                    type='button'
                    className='menu-toggle'
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuOpen}
                    aria-controls='mobile-menu'
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>
            <nav
                id='mobile-menu'
                className={`header-dropdown ${menuOpen ? 'open' : ''}`}
                aria-label='Menú principal'
            >
                {user && <Link to={`/cart/${user.id}`} onClick={closeMenu}>Carrito ({cart?.items?.length || 0})</Link>}
                {user && <Link to='/my-orders' onClick={closeMenu}>Mis órdenes</Link>}
                {user?.role.includes('admin') &&
                    <>
                        <Link to='/moderation/add_product' onClick={closeMenu}>Agregar producto</Link>
                        <Link to='/moderation/orders' onClick={closeMenu}>Órdenes</Link>
                        <Link to='/moderation/stock' onClick={closeMenu}>Ver stock</Link>
                        <Link to='/moderation/products' onClick={closeMenu}>Ver productos</Link>
                    </>
                }
                {user ?
                    <button type='button' className='header-dropdown-action' onClick={() => handleMenuAction(logout)}>Cerrar sesión</button>
                    :
                    <button type='button' className='header-dropdown-action' onClick={() => handleMenuAction(openModal)}>Iniciar sesión</button>
                }
            </nav>
        </header>
    )
}
