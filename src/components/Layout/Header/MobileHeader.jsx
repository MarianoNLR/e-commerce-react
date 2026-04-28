import { useState } from 'react'
import './MobileHeader.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.jsx'
import { useCart } from '../../../hooks/useCart.jsx'
import { useAuthModal } from '../../../hooks/useAuthModal.jsx'

export function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const { user, logout } = useAuth()
    const { openModal } = useAuthModal() ?? {}
    const { cart } = useCart()

    const handleToogleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    }

    const closeMenu = () => {
        setMenuOpen(false);
        setHasInteracted(true);
    }

    const handleMenuAction = (action) => {
        action?.();
        closeMenu();
    }

    return (
        <header className='mobile-header'>
            <div className='header-closed-wrapper'>
                <button className='menu-toggle' onClick={handleToogleMenu}>☰</button>
                <a href='/' className='header-logo'>Logo</a>
            </div>
            
                {/* {menuOpen &&  */}
                    <div className={`header-dropdown ${hasInteracted && (menuOpen ? "open" : "closed")}`}>
                        {user && <Link to={`/cart/${user.id}`} onClick={closeMenu}>Carrito ({cart?.items?.length})</Link> }
                        {user && (
                            <Link to={'/my-orders'} onClick={closeMenu}>Ver mis ordenes</Link>
                        )}
                        {user?.role.includes('admin') && 
                            <>
                                <Link to={'/moderation/add_product'} onClick={closeMenu}>Agregar producto</Link>
                                <Link to={'/moderation/orders'} onClick={closeMenu}>Ordenes</Link>
                                <Link to={"/moderation/stock"} onClick={closeMenu}>Ver Stock</Link>
                                <Link to={"/moderation/products"} onClick={closeMenu}>Ver Productos</Link>
                            </>
                        }
                        {user ? 
                            <Link onClick={() => handleMenuAction(logout)}>Cerrar sesión</Link> 
                        :
                            <Link onClick={() => handleMenuAction(openModal)}>Iniciar sesión</Link>
                        }
                    </div>
                {/* } */}
        </header>
    )
}