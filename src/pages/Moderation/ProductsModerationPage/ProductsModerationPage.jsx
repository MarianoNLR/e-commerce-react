import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api.js'
import styles from './ProductsModerationPage.module.css';
import { EditStockModal } from '../../../components/EditStockModal/EditStockModal.jsx';
import { FaEdit, FaBox, FaEye, FaSearch, FaPlus } from 'react-icons/fa';
import placeholder from '../../../assets/placeholder-product.svg';

export function ProductsModerationPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editStockModalOpened, setEditStockModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      api.get('/products')
      .then(({data}) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      })
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // temporary client-side filtering
  const filterProducts = (term) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  }

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
    return <div className={styles.loadingContainer} role="status">Cargando productos…</div>;
  }

  return (
    <div className={styles.productsModerationPage}>
      <div className={styles.pageHeader}>
        <h1>Gestión de productos</h1>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/moderation/add_product')}>
          <FaPlus aria-hidden="true" /> Nuevo producto
        </button>
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            aria-label="Buscar productos"
            placeholder="Buscar productos…"
            value={searchTerm}
            onChange={(e) => filterProducts(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.length === 0 ? (
          <div className={styles.noProducts}>
            <p>No se encontraron productos</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.images?.[0]?.secure_url || placeholder} alt={product.name} loading="lazy" />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productCategory}>{product.categoryId?.name}</p>
                
                <div className={styles.productDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Precio</span>
                    <span className={`${styles.value} ${styles.price}`}>{formatPrice(product.price)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Stock</span>
                    <span className={`${styles.value} ${styles.stock} ${product.quantity === 0 ? styles.outOfStock : ''}`}>
                      {product.quantity} {product.quantity === 1 ? 'unidad' : 'unidades'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.productActions}>
                <div className={styles.productEditActions}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit aria-hidden="true" /> Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleStockEdit(product)}
                  >
                    <FaBox aria-hidden="true" /> Stock
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-text btn-sm"
                  onClick={() => navigate(`/products/product/${product.id}`)}
                >
                  <FaEye aria-hidden="true" /> Ver en la tienda
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {editStockModalOpened && selectedProduct && (
        <EditStockModal 
        setEditStockModalOpened={setEditStockModalOpened} 
        product={selectedProduct} 
        onStockUpdated={handleStockUpdated} />
      )}
    </div>
    
  );
}