import React from 'react';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import api from '../../../api.js';
import { EditStockModal } from '../../../components/EditStockModal/EditStockModal.jsx';

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
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchStockData();
    }, []);

    const handleStockEdit = (product) => {
        setSelectedProduct(product);
        setEditStockModalOpened(true);
    }

    const handleStockUpdated = (updatedProduct) => {
        setProducts(prev => prev.map(prod => prod.id === updatedProduct.id ? updatedProduct : prod));
    }

    if (loading) {
        return <section className="admin-page admin-page-status" role="status">Cargando datos de stock…</section>;
    }

    return (
        <section className="admin-page">
            <h1>Gestión de stock</h1>
            <div className="admin-table-wrapper">
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th className="is-actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td className={`is-numeric${product.quantity === 0 ? ' is-danger' : ''}`}>{product.quantity}</td>
                                <td className='is-actions'>
                                    <button
                                        type='button'
                                        className='btn btn-secondary btn-icon'
                                        aria-label={`Editar stock de ${product.name}`}
                                        onClick={() => handleStockEdit(product)}
                                    ><FaEdit aria-hidden='true' /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editStockModalOpened && selectedProduct && (
                <EditStockModal 
                setEditStockModalOpened={setEditStockModalOpened} 
                product={selectedProduct} 
                onStockUpdated={handleStockUpdated} />
            )}
        </section>
    );
}
