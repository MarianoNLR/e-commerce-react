import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './SearchBar.css'

export function SearchBar () {
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchClick = () => {
        //TODO
        navigate(`/products/search/?q=${searchInput}`)
    }

    return (
        <div className="search-bar-wrapper">
            <input className="search-bar-input" type="text" name="q" id="" placeholder="Buscar producto" onChange={(e) => handleSearchInputChange(e)}/>
            <div className="search-bar-submit" onClick={handleSearchClick}>
                <svg  width="30px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>    
    )
}