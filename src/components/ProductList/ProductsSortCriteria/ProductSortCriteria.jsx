import { useState } from 'react';
import {PropTypes} from 'prop-types';
import './ProductSortCriteria.css'

export function ProductSortCriteria ({ products, setProducts }) {
        const [selectSortOption, setSelectSortOption] = useState('price-desc');

        const handleSortChange = (criteria) => {
            const sortedProducts = [...products.products].sort((a, b) => {
                switch (criteria) {
                case 'price-asc':
                    setSelectSortOption('price-asc');
                    return a.price - b.price;
                case 'price-desc':
                    setSelectSortOption('price-desc');
                    return b.price - a.price;
                case 'name-asc':
                    setSelectSortOption('name-asc');
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    setSelectSortOption('name-desc');
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        })
            setProducts({...products, products: sortedProducts});
        }

    return (
        <div className='product-sort-criteria-wrapper'>
            <label className='product-sort-criteria-label'>Ordenar por:</label>
            <select defaultValue='price-desc' name="order-criteria" onChange={(e) => handleSortChange(e.target.value)} className="product-sort-criteria-select">
                <option value="price-desc">Mayor Precio</option>
                <option value="price-asc">Menor Precio</option>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
            </select>
        </div>
    )
}

ProductSortCriteria.propTypes = {
    products: PropTypes.object,
    setProducts: PropTypes.func
}
