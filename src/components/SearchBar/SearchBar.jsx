import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SearchBar () {
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value)
        console.log(e.target.value)
    }

    const handleSearchClick = () => {
        //TODO
        navigate(`/products/search/?q=${searchInput}`)
    }

    return (
        <div className="search-bar-wrapper">
            <input type="text" name="q" id="" placeholder="Buscar producto" onChange={(e) => handleSearchInputChange(e)}/>
            <input type="button" value="Buscar" onClick={handleSearchClick}/>
        </div>    
    )
}