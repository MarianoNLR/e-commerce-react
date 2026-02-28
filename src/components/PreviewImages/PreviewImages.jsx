import PropTypes from 'prop-types';

export function PreviewImages({ images, onRemove, setImages, setImagesToDelete }) {

    // Delete image at index
    const removeImage = (index) => {
        const imageToRemove = images[index]
        if (imageToRemove.preview && !imageToRemove.exists) {
            URL.revokeObjectURL(imageToRemove.preview); // Free memory if not existing on server
        }

        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        // onRemove(newImages);

        if (imageToRemove.exists) {
            setImagesToDelete(prev => [...prev, imageToRemove.public_id]);
        }
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
    setImages: PropTypes.func.isRequired,
    setImagesToDelete: PropTypes.func.isRequired,
};