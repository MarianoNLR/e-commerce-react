import propTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { ImageUpload } from '../ImageUpload/ImageUpload.jsx';
import { PreviewImages } from '../PreviewImages/PreviewImages.jsx';

export function UpdateProductForm({
    handleSubmit,
    onSubmit,
    register,
    errors,
    categories,
    control,
    setImagesToDelete,
    isDeleting,
    onDeleteClick,
}) {
    return (
        <div className='update-product-form-container'>
            <form className='update-product-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='update-product-input-group'>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" {...register('name', { required: true })} />
                    {errors.name && <span>Este campo es obligatorio</span>}
                </div>

                <div className='update-product-input-group'>
                    <label htmlFor="price">Precio</label>
                    <input type="number" {...register('price', { required: true })} />
                    {errors.price && <span>Este campo es obligatorio</span>}
                </div>

                <div className='update-product-input-group'>
                    <label htmlFor="quantity">Cantidad</label>
                    <input type="number" {...register('quantity', { required: true })} />
                    {errors.quantity && <span>Este campo es obligatorio</span>}
                </div>

                <div className='update-product-input-group'>
                    <label htmlFor="description">Descripción</label>
                    <textarea {...register('description', { required: true })} />
                    {errors.description && <span>Este campo es obligatorio</span>}
                </div>

                <div className='update-product-input-group'>
                    <label htmlFor="category">Categoría</label>
                    <select {...register('category', { required: true })}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category && <span>Este campo es obligatorio</span>}
                </div>

                <div className='update-product-input-group'>
                    <label htmlFor="image">Imagen</label>
                    <Controller
                        name="images"
                        control={control}
                        rules={{ required: false }}
                        defaultValue={[]}
                        render={({ field }) => (
                            <>
                                <ImageUpload images={field.value || []} onChange={field.onChange} />
                                <PreviewImages images={field.value || []} setImages={field.onChange} setImagesToDelete={setImagesToDelete} />
                                {errors.images && <span>Este campo es obligatorio</span>}
                            </>
                        )}
                    />
                </div>

                <button type="submit">Actualizar</button>
            </form>

            <div className='update-product-danger-zone'>
                <button
                    type="button"
                    className='delete-product-button'
                    onClick={onDeleteClick}
                    disabled={isDeleting}
                >
                    Eliminar producto
                </button>
            </div>
        </div>
    );
}

UpdateProductForm.propTypes = {
    handleSubmit: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    errors: propTypes.object.isRequired,
    categories: propTypes.array.isRequired,
    control: propTypes.object.isRequired,
    setImagesToDelete: propTypes.func.isRequired,
    isDeleting: propTypes.bool.isRequired,
    onDeleteClick: propTypes.func.isRequired,
};