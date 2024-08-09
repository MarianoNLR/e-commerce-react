import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api.js'
import './CategoryProducts.css'
import { ProductList } from '../../components/ProductList/ProductList.jsx'

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
                {console.log(products)}
                <h1>Productos por categoria</h1>
                <ProductList products={products}></ProductList>
            </main>
        </>
    )
}