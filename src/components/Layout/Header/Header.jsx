import './Header.css'
import { Link } from 'react-router-dom'
import cartIcon from '../../../assets/cart-icon/icons8-cart-50.png'
export function Header () {

    return (
        <>
            <div className="header-wrapper">
                <Link to='/'>Logo</Link>
                <Link><img className='cart-image' src={cartIcon} alt="" /></Link>
            </div>
        </>
    )
}