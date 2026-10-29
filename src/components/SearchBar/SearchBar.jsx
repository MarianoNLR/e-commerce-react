import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'
import './SearchBar.css'

export function SearchBar (props) {
    const [searchInput, setSearchInput] = useState(props.value || '')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/products/search/?q=${encodeURIComponent(searchInput)}`, {state: {searchQuery: searchInput}})
    }

    return (
        <form className="search-bar-wrapper" role="search" onSubmit={handleSubmit}>
            <input
                className="search-bar-input"
                type="search"
                name="q"
                placeholder="Buscar productos"
                aria-label="Buscar productos"
                autoComplete="off"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            <button type="submit" className="search-bar-submit" aria-label="Buscar">
                <FaSearch aria-hidden="true" />
            </button>
        </form>
    )
}

SearchBar.propTypes = {
    value: PropTypes.string
}
