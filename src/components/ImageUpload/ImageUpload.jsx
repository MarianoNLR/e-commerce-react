import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import "./ImageUpload.css";

export function ImageUpload({images, onChange}) {
    useEffect(() => {
        return () => {
            // Limpiar URLs de vista previa al desmontar el componente
            images.forEach(img => {
                if (img.preview && !img.exists) {
                    URL.revokeObjectURL(img.preview);
                }
            });
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
            preview: URL.createObjectURL(file),
            exists: false
        }));
        onChange([...images, ...newImages]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: true,
        maxSize: 5242880 // 5MB
    });

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
        </>
    )
}

ImageUpload.propTypes = {
    images: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};