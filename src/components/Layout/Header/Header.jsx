import './Header.css'
import { Link } from 'react-router-dom'

export function Header () {

    return (
        <>
            <div className="header-wrapper">
                <Link to='/'>Logo</Link>
            </div>
        </>
    )
}