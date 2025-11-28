import React, { useEffect, useState } from 'react'
import './MobileHeader.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.jsx'
import { useCart } from '../../../hooks/useCart.jsx'
import { CartHeader } from '../../CartHeader/CartHeader.jsx'
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

    return (
        <header className='mobile-header'>
            <div className='header-closed-wrapper'>
                <button className='menu-toggle' onClick={handleToogleMenu}>☰</button>
                <a href='/' className='header-logo'>Logo</a>
            </div>
            
                {/* {menuOpen &&  */}
                    <div className={`header-dropdown ${hasInteracted && (menuOpen ? "open" : "closed")}`}>
                        {user && <Link to={'/cart'}>Carrito ({cart?.items?.length})</Link> }
                        {user?.role.includes('admin') && 
                            <>
                                <Link to={'/moderation/add_product'}>Agregar producto</Link>
                                <Link to={'/moderation/orders'}>Ordenes</Link>
                                <Link to={"/moderation/stock"} >Ver Stock</Link>
                                <Link to={"/moderation/products"} >Ver Productos</Link>
                            </>
                        }
                        {user ? 
                            <Link onClick={logout}>Cerrar sesión</Link> 
                        :
                            <Link onClick={openModal}>Iniciar sesión</Link>
                        }
                    </div>
                {/* } */}
        </header>
    )
}