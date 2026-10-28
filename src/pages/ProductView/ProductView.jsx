import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCart } from '../../hooks/useCart.jsx';
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import './ProductView.css'
import { QuantityInput } from "../../components/QuantityInput/QuantityInput.jsx";
import { useAuth } from "../../hooks/useAuth.jsx";
import { SimpleToastAlert } from '../../components/SimpleToastAlert/SimpleToastAlert.jsx'
import placeholderImage from '../../assets/placeholder-product.svg'

export function ProductView () {
    const {user} = useAuth() || {};
    const {productId} = useParams()
    const [productData, setProductData] = useState(null)
    const [loadingProduct, setLoadingProduct] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const { handleAddToCart, toastAlert, toastVisible, setToastVisible } = useCart()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const [toastVisible, setToastVisible] = useState(false)
    const navigate = useNavigate()
    const toastTimer = useRef(null);
    
    useEffect(() => {
        api.get(`/products/product/${productId}`)
        .then(res => {
            setProductData(res.data.product)
            setLoadingProduct(false)
        })
        .catch(err => console.error(err))
    }, [productId])

    if (loadingProduct) {
        return null
    }

    const handleImageError = (e) => {
        // evita un bucle si el placeholder también fallara
        e.currentTarget.onerror = null
        e.currentTarget.src = placeholderImage
    }

    const formatPrice = (price) => {
        const formatted = price.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})

        return formatted
    }

    // const handleAddToCart = (e) => {
    //     e.preventDefault()
    //     if (!user) {
    //         // Redirect to login or show a message
    //         navigate('/login', {state: {from: location.pathname}})
    //         return
    //     }
    //     api.post('/cart', {
    //         data: {
    //             productId: productId,
    //             quantity: quantity
    //         }
    //     })
    //     .then(res => {
    //         setCartCount(prev => prev + 1)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    // const handleShowToast = () => {
        
    //     if (toastTimer.current) {
    //         clearTimeout(toastTimer.current);
    //         // Force to remount the toast component
    //         setToastVisible(false);
    //     }

    //     // Force to remount the toast component
    //     setTimeout(() => setToastVisible(true), 5);

    //     toastTimer.current = setTimeout(() => {
    //         setToastVisible(false);
    //         toastTimer.current = null;
    //     }, 3000);
    // }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? productData.imagesURLs.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === productData.imagesURLs.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            { !loadingProduct ? (
                <>
                    {toastVisible && 
                        <SimpleToastAlert 
                            message={toastAlert.message}
                            variant={toastAlert.variant}
                            onClose={setToastVisible}
                            toastVisible={toastVisible}
                        />
                    }
                    <div className="product-wrapper">
                        <div className="product-wrapper-row">
                            {/* <img className="product-image" src={`https://e-commerce-api-gpfg.onrender.com/uploads/${productData.imageURL}`} alt="Imagen del productos" onError={handleImageError}/> */}

                            <div className="product-image-carousel">
                                {productData.images.length > 1 && 
                                    <button 
                                    className="carousel-button prev" 
                                    onClick={handlePrevImage}
                                    disabled={productData.images.length <= 1}
                                    aria-label="Imagen anterior"
                                >
                                    &#8249;
                                </button>
                                }
                                
                                <img 
                                    className="product-image" 
                                    src={productData.images[currentImageIndex]?.secure_url || placeholderImage} 
                                    alt={`${productData.name} (imagen ${currentImageIndex + 1} de ${productData.images.length || 1})`} 
                                    onError={handleImageError}
                                />
                                {productData.images.length > 1 && 
                                    <button 
                                    className="carousel-button next" 
                                    onClick={handleNextImage}
                                    disabled={productData.images.length <= 1}
                                    aria-label="Imagen siguiente"
                                    >
                                        &#8250;
                                    </button>
                                }
                                {productData.images.length > 1 &&
                                <div className="carousel-indicators">
                                    {productData.images.map((_, index) => (
                                        <button 
                                            type="button"
                                            key={index}
                                            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                            aria-label={`Ver imagen ${index + 1}`}
                                            aria-current={index === currentImageIndex}
                                        />
                                    ))}
                                </div>
                                }
                            </div>
                            <div className="product-details">
                                <div className="product-details-header">
                                    <h1 className="product-name">{productData.name}</h1>
                                </div>
                                
                                <div className="product-price-section">
                                    <h2 className="product-price">{formatPrice(productData.price)}</h2>
                                    {productData.quantity > 0 && (
                                        <p className="product-stock-info">
                                            <span className="stock-icon" aria-hidden="true">✓</span>
                                            Stock disponible: <strong>{productData.quantity}</strong> unidades
                                        </p>
                                    )}
                                </div>

                                {productData.quantity <= 0 ? (
                                    <div className="purchase-section">
                                        <div className="out-of-stock-container">
                                            <h3 className="out-of-stock-message">Producto sin stock</h3>
                                            <p className="out-of-stock-help">Volvé a revisar más adelante.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="purchase-section">
                                        <div className="quantity-section">
                                            <label className="quantity-label">Cantidad:</label>
                                            <QuantityInput 
                                                quantity={quantity} 
                                                setQuantity={setQuantity} 
                                                stock={productData.quantity}
                                            />
                                        </div>
                                        
                                        <button 
                                            className="add-to-cart-button" 
                                            onClick={() => {handleAddToCart(productId, quantity)}}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="product-description-row">
                            <div className="product-description-wrapper">
                                <h2 className="product-description-title">Detalles del producto</h2>
                                <p className="product-description">{productData.description}</p>
                            </div>
                        </div>
                    </div>
                    
                    
                </>
            ) 
            : 
            (null)
            }
        </>
    )
    
}