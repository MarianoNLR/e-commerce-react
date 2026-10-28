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
        <div>
            <form className='admin-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-group'>
                    <label htmlFor='name'>Nombre</label>
                    <input id='name' type='text' className='form-input' {...register('name', { required: true })} />
                    {errors.name && <span className='field-error' role='alert'>Este campo es obligatorio</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='price'>Precio</label>
                    <input id='price' type='number' min='0' className='form-input' {...register('price', { required: true })} />
                    {errors.price && <span className='field-error' role='alert'>Este campo es obligatorio</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='quantity'>Stock</label>
                    <input id='quantity' type='number' min='0' className='form-input' {...register('quantity', { required: true })} />
                    {errors.quantity && <span className='field-error' role='alert'>Este campo es obligatorio</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Descripción</label>
                    <textarea id='description' className='form-input' {...register('description', { required: true })} />
                    {errors.description && <span className='field-error' role='alert'>Este campo es obligatorio</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='category'>Categoría</label>
                    <select id='category' className='form-input' {...register('category', { required: true })}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category && <span className='field-error' role='alert'>Este campo es obligatorio</span>}
                </div>

                <div className='form-group'>
                    <span className='form-label'>Imágenes</span>
                    <Controller
                        name='images'
                        control={control}
                        rules={{ required: false }}
                        defaultValue={[]}
                        render={({ field }) => (
                            <>
                                <ImageUpload images={field.value || []} onChange={field.onChange} />
                                <PreviewImages images={field.value || []} setImages={field.onChange} setImagesToDelete={setImagesToDelete} />
                            </>
                        )}
                    />
                </div>

                <button type='submit' className='btn btn-primary btn-block'>Guardar cambios</button>
            </form>

            <div className='admin-form-danger'>
                <button
                    type='button'
                    className='btn btn-danger btn-block'
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