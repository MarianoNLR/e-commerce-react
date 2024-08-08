import { useEffect, useState } from "react"
import { useAuth } from '../../components/AuthProvider.jsx'
import { useParams } from "react-router-dom"
import api from '../../api.js'
import { CartProductCard } from "../../components/CartProductCard/CartProductCard.jsx"
import './CartViewPage.css'
export function CartViewPage () {
    const { userId } = useParams()
    const [cart, setCart] = useState([])
    const [loadingCart, setLoadingCart] = useState(true)
    const {user, loadingUser} = useAuth()

    useEffect(() => {
        api.get(`/cart/${userId}`)
        .then(res => {
            setCart(res.data.cart)
            setLoadingCart(false)
            console.log(res.data.cart)
        })
        .catch(err => {
            console.error(err)
        })
    }, [userId])

    if (loadingUser || !user) {
        return <></>
    }

    if (loadingCart) {
        return <></>
    }

    return (
        <>
            <main>
                <h1 className="cart-wrapper-title">Carrito de Compra</h1>
                <div className="cart-details-wrapper">
                    {cart.items.map((item, index) => (
                            <CartProductCard key={index} productId={item.product.id} name={item.product.name} price={item.product.price} quantity={item.quantity} imageURL={item.product.imageURL}></CartProductCard>
                    ))}
                </div>
            </main>
        </>
    )
}