import { useEffect, useState } from "react"
import { useAuth } from '../../components/AuthProvider.jsx'
import { useCart } from '../../components/CartProvider.jsx'
import { useParams } from "react-router-dom"
import api from '../../api.js'
import { CartProductCard } from "../../components/CartProductCard/CartProductCard.jsx"
import './CartViewPage.css'
export function CartViewPage () {
    const { userId } = useParams()
    const [cart, setCart] = useState([])
    const [loadingCart, setLoadingCart] = useState(true)
    const {user, loadingUser} = useAuth()
    const {setCartCount} = useCart()
    //TODO make a different component for cart
    useEffect(() => {
        api.get(`/cart/${userId}`)
        .then(res => {
            setCart(res.data.cart)
            setLoadingCart(false)
        })
        .catch(err => {
            console.error(err)
        })
    }, [userId, loadingCart])

    if (loadingUser || !user) {
        return <></>
    }

    if (loadingCart) {
        return <></>
    }

    const handleDeleteItem = (e, product) => {
        e.preventDefault()
        setLoadingCart(true)
        api.patch(`/cart/item/${product}`)
        .then(res => {
            //setCart(res.data.cart)
            setCartCount(prev => prev - 1)
            setLoadingCart(false)
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <>
            <main>
                <h1 className="cart-wrapper-title">Carrito de Compra</h1>
                <div className="cart-details-wrapper">
                    {cart.items.map((item, index) => (
                            <CartProductCard 
                            key={index} 
                            productId={item.product.id} 
                            name={item.product.name} 
                            price={item.product.price} 
                            quantity={item.quantity} 
                            imageURL={item.product.imageURL} 
                            handleDeleteItem={handleDeleteItem}>
                            </CartProductCard>
                    ))}
                </div>
            </main>
        </>
    )
}