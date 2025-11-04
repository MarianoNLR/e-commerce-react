import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import api from '../../api.js';
import { Link } from 'react-router-dom';
import './EditStockModal.css';


export function EditStockModal({ product, setEditStockModalOpened, onStockUpdated }) {
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = handleSubmit(async (data) => {
        // Aquí podrías enviar los datos actualizados a la API

        await api.patch(`products/stock/${product.id}`, {
            stock: data.quantity
        })
            .then(response => {
                console.log('Stock actualizado:', response.data);
                // Cerrar el modal después de guardar los cambios
                onStockUpdated(response.data.result);
                setEditStockModalOpened(false);
            })
            .catch(error => {
                console.error('Error al actualizar el stock:', error);
            });
        
    });

    const handleCloseModal = () => {
        // Lógica para cerrar el modal
        setEditStockModalOpened(false);
    }

    return (
        <>
            <div className='edit-stock-modal-backdrop'>
                <div className='edit-stock-modal-container'>
                    <div className='edit-stock-close-modal-button-container'><button onClick={() => handleCloseModal()}>X</button></div>
                    <h2>Edición de Stock</h2>
                    <h3 className='edit-stock-modal-product-name'>&quot;{product.name}&quot;</h3>
                    <form className='edit-stock-form' onSubmit={onSubmit}>
                        <div className='edit-stock-form-input-group'>
                            <label htmlFor="quantity">Stock:</label>
                            <input id="quantity" type="number" {...register("quantity", { required: true })} defaultValue={product.quantity ?? 0} min={0} />
                            {errors.quantity && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='edit-stock-form-input-group'>
                            <button type="submit" className='button-submit'>Guardar</button>
                        </div>
                        <div className='edit-stock-form-input-group'>
                            <button type="button" className='button-cancel' onClick={() => handleCloseModal()}>Cancelar</button>
                        </div>
                        <Link to={`/moderation/update_product/${product.id}`} className="close-modal-link">Ir a detalles del producto</Link>
                    </form>
                </div>
            </div>
        </>
    );
}

EditStockModal.propTypes = {
    product: PropTypes.object.isRequired,
    setEditStockModalOpened: PropTypes.func.isRequired,
    onStockUpdated: PropTypes.func.isRequired,
};
