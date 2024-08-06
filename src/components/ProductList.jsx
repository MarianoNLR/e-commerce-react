import { ProductCard } from "./ProductCard";
import PropTypes from 'prop-types'

export function ProductList ({products}) {
    return (
        <>
            <div className="product-list-wrapper">
                {products.products.length === 0 ? 
                    <h3>Not elements found.</h3>
                    :
                    products.products.map((item, index) => (
                        <ProductCard key={index} index={item.index} name={item.name} price={item.price} quantity={item.quantity}></ProductCard>
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