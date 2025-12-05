import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import api from '../../api.js';
import styles from './EditCategoryModal.module.css';
import { useForm } from 'react-hook-form';

export function EditCategoryModal({ isOpen, onClose, category, onCategoryUpdated, isCreating }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {register, watch, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
            name: category ? category.name : ''
        }
    })

    useEffect(() => {
        if (category) {
            setName(category.name || '');
        } else {
            setName('');
        }
        setError('');
    }, [category]);

    const onSubmit = async (data) => { 
        setLoading(true);
        try {
            let response;
            let categoryResponse;
            if (isCreating) {    
                response = await api.post('/category', { name: data.name.trim() });
                if (response.status === 201) {
                    categoryResponse = await api.get(`/category/${response.data.result.id}/?includeCount=true`);
                }
            } else {
                response = await api.put(`/category/${category.id}`, { name: data.name.trim() });
                if (response.status === 200) {    
                    categoryResponse = await api.get(`/category/${response.data.result.id}/?includeCount=true`);
                }
            }
            onCategoryUpdated(categoryResponse.data.category);
            onClose();
        } catch (error) {
            console.error('Error saving category');
            setError(error.response?.data?.message || 'Error al guardar la categoría');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setName('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button 
                    className={styles.closeButton}
                    onClick={handleCancel}
                    type="button"
                >
                    <FaTimes />
                </button>

                <div className={styles.modalHeader}>
                    <h2>{isCreating ? 'Nueva Categoría' : 'Editar Categoría'}</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="categoryName">Nombre de la categoría</label>
                        <input type="text" id="categoryName" {...register('name', { required: 'El nombre es requerido', 
                            minLength: { 
                                value: 2, 
                                message: 'El nombre debe tener al menos 2 caracteres' 
                                } 
                        })}
                        placeholder="Ej: Electrónica, Cables..."
                        />
                        {error && <span className={styles.error}>{error}</span>}
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSave}
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : isCreating ? 'Crear' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}