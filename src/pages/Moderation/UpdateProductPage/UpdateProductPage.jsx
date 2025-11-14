import './UpdateProductPage.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api.js';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { SimpleToastAlert } from '../../../components/SimpleToastAlert/SimpleToastAlert.jsx';
import { useForm } from 'react-hook-form';

export function UpdateProductPage() {
    const { productId } = useParams();
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const {register, 
        handleSubmit,
        formState: {errors},
        reset
       } = useForm() 
    const { user } = useAuth() || {};
    const [formData, setFormData] = useState(null);
    const [toastAlert, setToastAlert] = useState({ visible: false, message: '', type: '' });

    useEffect(() => {
        Promise.all([
            api.get(`/products/product/${productId}`),
            api.get('/category')
        ])
        .then(([productRes, categoryRes]) => {
            setProductData(productRes.data.product);
            setCategories(categoryRes.data.categories);
            setLoadingProduct(false);
            setLoadingCategories(false);
            reset({
                name: productRes.data.product.name,
                price: productRes.data.product.price,
                quantity: productRes.data.product.quantity,
                description: productRes.data.product.description,
                category: productRes.data.product.categoryId
            });
        })
        .catch(err => console.error(err));
    }, [productId, reset]);

    const onSubmit = (data) => {
    //     api.put(`/products/product/${productId}`, data, {
    //         headers: {
    //             Authorization: `Bearer ${user.token}`
    //         }
    //     })
    //     .then(res => {
    //         setToastAlert({ visible: true, message: 'Producto actualizado con éxito', type: 'success' });
    //     })
    //     .catch(err => {
    //         setToastAlert({ visible: true, message: 'Error al actualizar el producto', type: 'error' });
    //     });
    return data;
    };

    return (
        <main className='update-product-page-main'>
            <h1>Actualización de Producto</h1>
                {/* {(loadingProduct || loadingCategories) ? (
                    <p>Cargando...</p>
                ) : ( */}
                    <form className='update-product-form' onSubmit={handleSubmit(onSubmit)}>
                        <div className='update-product-input-group'>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" {...register("name", { required: true })}/>
                            {errors.name && <span>Este campo es obligatorio</span>}
                        </div>
                        
                        <div className='update-product-input-group'>
                            <label htmlFor="price">Precio</label>
                            <input type="number" {...register("price", { required: true })}/>
                            {errors.price && <span>Este campo es obligatorio</span>}
                        </div>
                        
                        <div className='update-product-input-group'>
                            <label htmlFor="quantity">Cantidad</label>
                            <input type="number" {...register("quantity", { required: true })}/>
                            {errors.quantity && <span>Este campo es obligatorio</span>}
                        </div>
                        
                        <div className='update-product-input-group'>
                            <label htmlFor="description">Descripción</label>
                            <textarea {...register("description", { required: true })} />
                            {errors.description && <span>Este campo es obligatorio</span>}
                        </div>
                        
                        {/* <div className='update-product-input-group'>
                            <label htmlFor="image">Imagen</label> */}
                            {/* Vista personalizada para imagen actual */}
                            {/* <input type="file" {...register("image", { required: false })} />
                            {errors.image && <span>Este campo es obligatorio</span>}
                        </div> */}
                        
                        <div className='update-product-input-group'>
                            <label htmlFor="category">Categoría</label>
                            {/* Cargar categorias de la bd */}
                            <select {...register("category", { required: true })}>
                               
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.category && <span>Este campo es obligatorio</span>}
                        </div>
                        
                        <button type="submit">Actualizar</button>
                    </form>
                {/* )} */}
        </main>
    );
}