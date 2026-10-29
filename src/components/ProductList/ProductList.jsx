import { ProductCard } from "../ProductCard/ProductCard.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types'
import { ProductSortCriteria } from "./ProductsSortCriteria/ProductSortCriteria.jsx";
import './ProductList.css'

export function ProductList ({products, setProducts, loadingProducts}) {

    if (loadingProducts) {
        return (
            <div className="product-list-loading" role="status" aria-label="Cargando productos">
                <CircularProgress sx={{ color: 'var(--accent)' }} />
            </div>
        )
    }

    const items = products.products
    const count = items.length

    return (
        <div className="product-list-main">
            {count === 0 ?
                <div className="not-elements-found">
                    <h3 className="not-elements-found-title">No hay productos para mostrar</h3>
                    <p className="not-elements-found-text">Probá con otra categoría o buscá por nombre.</p>
                </div>
                :
                <>
                    <div className="product-list-toolbar">
                        <p className="product-count tabular">{count} {count === 1 ? 'producto' : 'productos'}</p>
                        <ProductSortCriteria products={products} setProducts={setProducts}></ProductSortCriteria>
                    </div>
                    <div className="product-list-wrapper">
                        {items.map((item) => (
                            <ProductCard
                                key={item.id}
                                productId={item.id}
                                index={item.index}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                imagesURLs={item.images}>
                            </ProductCard>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.object,
    index: PropTypes.number,
    setProducts: PropTypes.func,
    loadingProducts: PropTypes.bool
}
