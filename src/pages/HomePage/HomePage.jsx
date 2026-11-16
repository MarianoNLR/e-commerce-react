import { useEffect, useState } from "react"
import api from "../../api.js"
import { ProductList } from "../../components/ProductList/ProductList.jsx"
import { FilterPanel } from "../../components/FilterPanel/FilterPanel.jsx"
import './HomePage.css'
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx"

export function HomePage () {
    const [ loadingProducts, setLoadingProducts ] = useState(true)
    const [products, setProducts ] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
            api.get('/products/')
        .then(res => {
            setProducts(res.data)
            setLoadingProducts(false)
        })
        .catch(err => {
            console.error(err)
            setError(err)
            setLoadingProducts(false)
        })
    }, [])

    return (
        <>
            <SearchBar></SearchBar>
            <FilterPanel></FilterPanel>
            {error ?
                <p className='filters-status' role='alert'>No se pudieron cargar los productos. Recargá la página para intentar de nuevo.</p>
                :
                <ProductList products={products} setProducts={setProducts} loadingProducts={loadingProducts}></ProductList>
            }
        </>
    )
}