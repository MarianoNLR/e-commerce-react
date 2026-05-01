import './UpdateProductPage.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import api from '../../../api.js';
import { useForm } from 'react-hook-form';
import { ConfirmModal } from '../../../components/ConfirmModal/ConfirmModal.jsx';
import { FeedbackModal } from '../../../components/FeedbackModal/FeedbackModal.jsx';
import { UpdateProductForm } from '../../../components/UpdateProductForm/UpdateProductForm.jsx';

export function UpdateProductPage() {
    const { productId } = useParams();
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            api.get(`/products/product/${productId}`),
            api.get('/category')
        ])
        .then(([productRes, categoryRes]) => {
            setProductName(productRes.data.product.name || '');
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
        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        data.images.forEach((img) => {
            if (!img.exists) {
                formData.append('newImages', img.file);
            }})
        api.put(`/products/${productId}`, formData, {
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        });
    console.log('Submitted data:', data);
    return data;
    };

    const onConfirmDeleteProduct = async () => {
        try {
            setIsDeleting(true);
            setConfirmDeleteModalOpen(false);
            await api.delete(`/products/${productId}`);
            navigate('/moderation/products');
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (loadingProduct || loadingCategories) {
        return (
            <div className="update-product-loading">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <>
            <h1>Actualización de Producto</h1>
            <UpdateProductForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                categories={categories}
                control={control}
                setImagesToDelete={setImagesToDelete}
                isDeleting={isDeleting}
                onDeleteClick={() => setConfirmDeleteModalOpen(true)}
            />

            {confirmDeleteModalOpen && (
                <ConfirmModal
                    isOpen={confirmDeleteModalOpen}
                    onClose={() => setConfirmDeleteModalOpen(false)}
                    onConfirm={onConfirmDeleteProduct}
                    title="Eliminar producto"
                    message="Esta accion no se puede deshacer. Se eliminara el producto de forma permanente."
                    highlightedText={productName}
                    confirmText={isDeleting ? 'Eliminando...' : 'Si, eliminar'}
                    cancelText="Cancelar"
                />
            )}

            <FeedbackModal
                isOpen={isDeleting}
                onClose={() => {}}
                title="Eliminando producto"
                description="Estamos eliminando el producto. Por favor espera..."
                icon={<FaSpinner />}
                isSpinningIcon={true}
                buttonText="Procesando..."
                hideCloseButton={true}
                isActionDisabled={true}
            />
        </>
    );
}