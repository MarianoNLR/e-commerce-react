import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api.js'
import styles from './ProductsModerationPage.module.css';
import { EditStockModal } from '../../../components/EditStockModal/EditStockModal.jsx';

export function ProductsModerationPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      api.get('/products')
      .then(({data}) => {
        setProducts(data.products);
        setLoading(false);
      })
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/moderation/update_product/${productId}`);
  };

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
    return <div className={styles.loadingContainer}>Cargando productos...</div>;
  }

  return (
    // <div className={styles.placeholderContainer}>
    //   <h2 className={styles.placeholderText}>Página de Gestión de Productos en Construcción</h2>
    // </div>
    <div className={styles.productsModerationPage}>
      <div className={styles.pageHeader}>
        <h1>Gestión de Productos</h1>
        <button className={styles.btnPrimary} onClick={() => navigate('/moderation/products/new')}>
          <span className={styles.icon}>+</span> Nuevo Producto
        </button>
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterButtons}>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {products?.length === 0 ? (
          <div className={styles.noProducts}>
            <p>No se encontraron productos</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={`http://localhost:3000/uploads/${product.imagesURLs[0]}`} alt={product.name} />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productCategory}>{product.category}</p>
                
                <div className={styles.productDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Precio:</span>
                    <span className={`${styles.value} ${styles.price}`}>${product.price}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Stock:</span>
                    <span className={`${styles.value} ${styles.stock} ${product.quantity === 0 ? styles.outOfStock : ''}`}>
                      {product.quantity} unidades
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.productActions}>
                <button 
                  className={styles.btnEdit} 
                  onClick={() => handleEditProduct(product.id)}
                >
                  Editar
                </button>
                <button className={styles.btnView}
                  onClick={() => navigate(`/products/product/${product.id}`)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}