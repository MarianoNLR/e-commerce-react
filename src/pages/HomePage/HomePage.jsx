import { useEffect, useState } from "react"
import { useAuth } from "../../components/AuthProvider.jsx"
import api from "../../api.js"
import { ProductList } from "../../components/ProductList/ProductList.jsx"
import { FilterPanel } from "../../components/FilterPanel/FilterPanel.jsx"
import './HomePage.css'
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx"

export function HomePage () {
    const { user, loadingUser } = useAuth()
    const [ loadingProducts, setLoadingProducts ] = useState(true)
    const [products, setProducts ] = useState(null)
    useEffect(() => {
            api.get('/products/')
        .then(res => {
            setProducts(res.data)
            setLoadingProducts(false)
        })
    }, [])

    if (loadingUser) {
        return <></>
    }

    return (
        <>
            <main>
                <SearchBar></SearchBar>
                <FilterPanel></FilterPanel>
                <ProductList products={products} loadingProducts={loadingProducts}></ProductList>
            </main>
        </>
    )
}