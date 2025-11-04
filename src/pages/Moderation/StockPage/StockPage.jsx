import React from 'react';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import api from '../../../api.js';
import { EditStockModal } from '../../../components/EditStockModal/EditStockModal.jsx';
import './StockPage.css';

export function StockPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editStockModalOpened, setEditStockModalOpened] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Aquí podrías cargar los datos de stock desde la API si es necesario
        const fetchStockData = async () => {
            try {
                const response = await api.get('products/');
                console.log(response.data);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchStockData();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(price);
    }

    const handleStockEdit = (product) => {
        setSelectedProduct(product);
        setEditStockModalOpened(true);
    }

    const handleStockUpdated = (updatedProduct) => {
        setProducts(prev => prev.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod));
    }

    if (loading) {
        return <main className="stock-page-main">Cargando datos de stock...</main>;
    }

    return (
        <main className="stock-page-main">
            <h1 className='stock-page-title'>Gestión de Stock</h1>
            {/* Aquí puedes agregar la tabla o lista de productos en stock */}
            {loading ? (
                <p>Cargando datos de stock...</p>
            ) : (
                <table className='products-table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            {/* <th>Precio</th> */}
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr className='product-row' key={product.id}>
                                <td className='product-name'>{product.name}</td>
                                {/* <td className='product-price'>{formatPrice(product.price)}</td> */}
                                <td className='product-quantity'>{product.quantity}</td>
                                <td className='product-actions'><button onClick={() => handleStockEdit(product)}><FaEdit /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {editStockModalOpened && selectedProduct && (
                <EditStockModal 
                setEditStockModalOpened={setEditStockModalOpened} 
                product={selectedProduct} 
                onStockUpdated={handleStockUpdated} />
            )}
        </main>
    );
}
