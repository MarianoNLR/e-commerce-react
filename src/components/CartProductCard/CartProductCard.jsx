import PropTypes from 'prop-types'
import './CartProductCard.css'
import { Link } from 'react-router-dom'
import placeholderImage from '../../assets/placeholder-product.svg'

const formatPrice = (price) => {
    if (!price) {
        return
    }

    return price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})
}

export function CartProductCard (props) {
    const handleImageError = (e) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = placeholderImage
    }

    return (
        <article className="product-cart-wrapper">
            <div className="product-cart-media">
                <img src={props.images?.[0]?.secure_url || placeholderImage} alt="" onError={handleImageError}/>
            </div>
            <div className="product-cart-info">
                <Link to={`/products/product/${props.productId}`} className="product-cart-name">{props.name}</Link>
                <p className="product-cart-meta tabular">
                    {formatPrice(props.price)} × {props.quantity} {props.quantity === 1 ? 'unidad' : 'unidades'}
                </p>
            </div>
            <div className="product-cart-side">
                <p className="product-cart-subtotal tabular">{formatPrice(props.price * props.quantity)}</p>
                <button
                    type="button"
                    className="btn-text"
                    onClick={() => {props.handleRemoveFromCart(props.productId)}}
                    aria-label={`Eliminar ${props.name} del carrito`}
                >
                    Eliminar
                </button>
            </div>
        </article>
    )
}

CartProductCard.propTypes = {
    productId: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.shape({
        public_id: PropTypes.string.isRequired,
        secure_url: PropTypes.string.isRequired,
    })),
    handleRemoveFromCart: PropTypes.func
}
