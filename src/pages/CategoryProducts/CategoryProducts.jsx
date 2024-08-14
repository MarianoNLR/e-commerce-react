import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api.js'
import './CategoryProducts.css'
import { ProductList } from '../../components/ProductList/ProductList.jsx'
import { FilterPanel } from '../../components/FilterPanel/FilterPanel.jsx'
import { SearchBar } from '../../components/SearchBar/SearchBar.jsx'

export function CategoryProducts () {
    const {categoryId} = useParams()
    const [ loadingProducts, setLoadingProducts ] = useState(true)
    const [products, setProducts ] = useState([])
    useEffect(() => {
        api.get(`/products/${categoryId}`)
        .then(res => {
            setProducts(res.data)
            setLoadingProducts(false)
        })
    }, [categoryId])

    if (loadingProducts) {
        return <>Cargando Productos...</>
    }

    return (
        <>
            <main>
                <SearchBar></SearchBar>
                <FilterPanel></FilterPanel>
                <ProductList products={products}></ProductList>
            </main>
        </>
    )
}