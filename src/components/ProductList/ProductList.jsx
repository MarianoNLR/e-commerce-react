import { ProductCard } from "../ProductCard/ProductCard.jsx";
import PropTypes from 'prop-types'
import './ProductList.css'

export function ProductList ({products}) {
    return (
        <>
            <div className="product-list-wrapper">
                {products.products.length === 0 ? 
                    <h3>Not elements found.</h3>
                    :
                    products.products.map((item, index) => (
                        <ProductCard key={index} productId={item.id} index={item.index} name={item.name} price={item.price} quantity={item.quantity} imageURL={item.imageURL}></ProductCard>
                    ))
                }

                   
            </div>
        </>
    )
}

ProductList.propTypes = {
    products: PropTypes.object,
    index: PropTypes.number
}