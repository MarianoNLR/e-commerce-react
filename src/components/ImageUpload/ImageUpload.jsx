import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import "./ImageUpload.css";

export function ImageUpload({images, setValue}) {
    useEffect(() => {
        return () => {
            // Limpiar URLs de vista previa al desmontar el componente
            images.forEach(img => URL.revokeObjectURL(img.preview));
        };
    });

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            rejectedFiles.forEach(element => {
                alert(`El archivo ${element.file.name} no es válido o excede el tamaño máximo permitido.`);
            });
        }
        const newImages = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setValue("images", [...images, ...newImages]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: true,
        maxSize: 5242880 // 5MB
    });

    // Eliminar imagen
    const removeImage = (index) => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index].preview); // Limpiar memoria
        newImages.splice(index, 1);
        setValue("images", newImages);
    };

    return (
        <>
            <div 
                {...getRootProps()} 
                className={`dropzone ${isDragActive ? 'active' : ''}`}
                >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta las imágenes aquí...</p>
                ) : (
                    <p>Arrastra imágenes aquí o haz click para seleccionar</p>
                )}
            </div>
            {/* Preview de imágenes */}
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

ImageUpload.propTypes = {
    images: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired
};