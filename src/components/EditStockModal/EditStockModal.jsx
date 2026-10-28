import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import api from '../../api.js';
import { Link } from 'react-router-dom';

export function EditStockModal({ product, setEditStockModalOpened, onStockUpdated }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { quantity: product.quantity ?? 0 }
    });

    const handleCloseModal = () => setEditStockModalOpened(false);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') setEditStockModalOpened(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setEditStockModalOpened]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await api.patch(`products/stock/${product.id}`, { stock: data.quantity });
            onStockUpdated(response.data.result);
            setEditStockModalOpened(false);
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
        }
    });

    return (
        <div className='dialog-overlay'>
            <div className='dialog' role='dialog' aria-modal='true' aria-labelledby='edit-stock-title'>
                <h2 id='edit-stock-title'>Editar stock</h2>
                <p className='dialog-subtitle'>{product.name}</p>
                <form onSubmit={onSubmit} noValidate>
                    <div className='form-group'>
                        <label htmlFor='quantity'>Stock disponible</label>
                        <input
                            id='quantity'
                            type='number'
                            min={0}
                            className='form-input'
                            {...register('quantity', { required: 'Este campo es obligatorio', min: { value: 0, message: 'No puede ser negativo' } })}
                        />
                        {errors.quantity && <span className='field-error' role='alert'>{errors.quantity.message}</span>}
                    </div>
                    <div className='dialog-actions'>
                        <button type='button' className='btn btn-secondary' onClick={handleCloseModal}>Cancelar</button>
                        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>Guardar</button>
                    </div>
                    <Link to={`/moderation/update_product/${product.id}`} className='dialog-link'>Ir a detalles del producto</Link>
                </form>
            </div>
        </div>
    );
}

EditStockModal.propTypes = {
    product: PropTypes.object.isRequired,
    setEditStockModalOpened: PropTypes.func.isRequired,
    onStockUpdated: PropTypes.func.isRequired,
};
