import './UpdateProductPage.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api.js';
import { useAuth } from '../../../hooks/useAuth.jsx';
import { SimpleToastAlert } from '../../../components/SimpleToastAlert/SimpleToastAlert.jsx';
import { useForm, Controller } from 'react-hook-form';
import {ImageUpload} from '../../../components/ImageUpload/ImageUpload.jsx';
import { PreviewImages } from '../../../components/PreviewImages/PreviewImages.jsx';

export function UpdateProductPage() {
    const { productId } = useParams();
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const {register, 
        handleSubmit,
        formState: {errors},
        reset,
        control
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
            const preloadedImages = (productRes.data.product.images || []).map(img => ({
                name: img.secure_url,
                preview: `${img.secure_url}`,
                public_id: img.public_id,
                exists: true
            }));
            setCategories(categoryRes.data.categories);
            setLoadingProduct(false);
            setLoadingCategories(false);
            reset({
                name: productRes.data.product.name,
                price: productRes.data.product.price,
                quantity: productRes.data.product.quantity,
                description: productRes.data.product.description,
                category: productRes.data.product.categoryId,
                images: preloadedImages
            });
        })
        .catch(err => console.error(err));
    }, [productId, reset]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        formData.append('category', data.category);
        data.images.forEach((img) => {
            if (img.exists) {
                formData.append('imagesToKeep', JSON.stringify([{ public_id: img.public_id }]));
            } else if (img.file) {
                formData.append('newImages', img.file);
            }
        });
        api.put(`/products/${productId}`, formData, {
            // headers: {
            //     Authorization: `Bearer ${user.token}`
            // }
        })
        .then(res => {
            console.log(res);
            setToastAlert({ visible: true, message: 'Producto actualizado con éxito', type: 'success' });
        })
        .catch(err => {
            console.log(err)
            setToastAlert({ visible: true, message: 'Error al actualizar el producto', type: 'error' });
        });
    console.log('Submitted data:', data);
    return data;
    };

    return (
        <>
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
                        
                        <div className='update-product-input-group'>
                            <label htmlFor="image">Imagen</label>
                            {/* Image Upload Controller and Preview */}
                            <Controller
                                name="images"
                                control={control}
                                rules={{ required: false }}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <>
                                        <ImageUpload images={field.value || []} onChange={field.onChange} />
                                        <PreviewImages images={field.value || []} onRemove={field.onChange}/>
                                        {errors.images && <span>Este campo es obligatorio</span>}
                                    </>
                                )}
                            />
                        </div>
                        
                        
                        
                        <button type="submit">Actualizar</button>
                    </form>
                {/* )} */}
        </>
    );
}