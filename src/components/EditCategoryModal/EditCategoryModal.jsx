import { useState, useEffect } from 'react';
import api from '../../api.js';
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
        const handleEsc = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

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
        <div className="dialog-overlay">
            <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="category-modal-title">
                <h2 id="category-modal-title">{isCreating ? 'Nueva categoría' : 'Editar categoría'}</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-group">
                        <label htmlFor="categoryName">Nombre de la categoría</label>
                        <input type="text" id="categoryName" className="form-input" {...register('name', { required: 'El nombre es requerido', 
                            minLength: { 
                                value: 2, 
                                message: 'El nombre debe tener al menos 2 caracteres' 
                                } 
                        })}
                        placeholder="Ej: Periféricos, Cables…"
                        />
                        {errors.name && <span className="field-error" role="alert">{errors.name.message}</span>}
                        {error && <span className="field-error" role="alert">{error}</span>}
                    </div>

                    <div className="dialog-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando…' : isCreating ? 'Crear' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}