import PropTypes from 'prop-types'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import placeholderImage from '../../assets/placeholder-product.svg'

const formatPrice = (price) => price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

export function ProductCard (props) {
    const inStock = props.quantity > 0
    const imageSrc = props.imagesURLs?.[0]?.secure_url || placeholderImage

    const handleImageError = (e) => {
        // evita un bucle si el placeholder también fallara
        e.currentTarget.onerror = null
        e.currentTarget.src = placeholderImage
    }

    return (
        <article className={`${styles.card} ${inStock ? '' : styles.outOfStock}`}>
            <div className={styles.media}>
                {/* alt vacío: el nombre del producto ya está en el link de abajo */}
                <img src={imageSrc} alt='' loading='lazy' onError={handleImageError} />
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>
                    <Link to={`/products/product/${props.productId}`} className={styles.titleLink}>
                        {props.name}
                    </Link>
                </h3>
                <p className={`${styles.price} tabular`}>{formatPrice(props.price)}</p>
                <p className={`${styles.stock} ${inStock ? styles.inStock : styles.noStock}`}>
                    {inStock ? 'En stock' : 'Sin stock'}
                </p>
            </div>
        </article>
    )
}

ProductCard.propTypes = {
    productId: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    imagesURLs: PropTypes.arrayOf(PropTypes.object)
}
