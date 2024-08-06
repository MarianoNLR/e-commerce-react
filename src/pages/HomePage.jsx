import { useEffect, useState } from "react"
import { useAuth } from "../components/AuthProvider.jsx"
import api from '../api.js'
import { ProductList } from "../components/ProductList.jsx"

export function HomePage () {
    const { user, loadingUser } = useAuth()
    const [ loadingProducts, setLoadingProducts ] = useState(true)
    const [products, setProducts ] = useState([])
    useEffect(() => {
        api.get('/products')
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
            <h1>Home Page</h1>
            <p>Welcome {user.username}</p>
            {loadingProducts ? (<h2>Loading...</h2>) 
            : 
            <ProductList products={products}></ProductList>
            }
        </>
    )
}