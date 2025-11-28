import PropTypes from 'prop-types';

export function PreviewImages({ images, onRemove }) {

    // Delete image at index
    const removeImage = (index) => {
        if (images[index].preview && !images[index].exists) {
            URL.revokeObjectURL(images[index].preview); // Free memory if not existing on server
        }
        const newImages = [...images];
        newImages.splice(index, 1);
        onRemove([...newImages]);
    };

    return (
        <>
        {images.length > 0 && (
                <div className="images-preview-container">
                    {images.map((image, index) => (
                        <div key={index} className="image-preview-wrapper">
                            <img 
                                src={image.preview} 
                                alt={`Preview ${index}`}
                                className="image-preview"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="remove-image-btn"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>   
            )}
        </>    
    )
}

PreviewImages.propTypes = {
    images: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
};