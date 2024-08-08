import './Header.css'
import { Link } from 'react-router-dom'
import cartIcon from '../../../assets/cart-icon/icons8-cart-50.png'
import { useAuth } from '../../AuthProvider.jsx'
export function Header () {
    const {user, loadingUser} = useAuth()

    if (loadingUser) {
        return <></>
    }

    return (
        <>
            {user ? 
                <div className="header-wrapper">
                    <Link to='/'>Logo</Link>
                    <Link to={`/cart/${user.id}`}><img className='cart-image' src={cartIcon} alt="" /></Link>
                </div>
                :
                <div className="header-wrapper">
                    <Link to='/'>Logo</Link>
                </div>
            }
            
        </>
    )
}