import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx"
import { FilterPanel } from "../../components/FilterPanel/FilterPanel.jsx"
import { ProductList } from "../../components/ProductList/ProductList.jsx"
import { useLocation } from "react-router-dom"
import api from "../../api.js"

export function SearchProduct () {
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [ loadingProducts, setLoadingProducts ] = useState(true)
    const location = useLocation()
    const searchQuery = location.state?.searchQuery || ''
    console.log('searchQuery: ', searchQuery)
    // console.log('searchQueryFromState: ', searchQueryFromState)
    // const [ searchQuery, setSearchQuery ] = useState('')
    useEffect(() => {
        api.get(`/products/search/?q=${searchParams.get('q')}`)
        .then(res => {
            setProducts(res.data)
            setLoadingProducts(false)
        })
        .catch(err => console.error(err))
    }, [loadingProducts, searchParams])

    if (loadingProducts) {
        return <>Loading...</>
    }

    return (
        <>
            <main>
                <SearchBar value={searchQuery}/>
                <FilterPanel></FilterPanel>
                {loadingProducts ? (<h2>Loading...</h2>) 
                : 
                <ProductList products={products}></ProductList>
                }
            </main>
        </>
    )
}