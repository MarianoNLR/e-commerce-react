import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { ImageUpload } from "../ImageUpload/ImageUpload.jsx";
import { PreviewImages } from "../PreviewImages/PreviewImages.jsx";
import { FeedbackModal } from "../FeedbackModal/FeedbackModal.jsx";
import api from "../../api";
import "./AddProductForm.css";
export function AddProductForm() {
    const {register, handleSubmit, watch, control, reset, formState: { errors, isSubmitting }} = useForm();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedbackModal, setFeedbackModal] = useState({
        isOpen: false,
        title: "",
        description: "",
        type: "success",
    });

    const closeFeedbackModal = () => {
        setFeedbackModal((prev) => ({ ...prev, isOpen: false }));
    };

    const onSubmit = async (data) => {
        setFeedbackModal({
            isOpen: true,
            title: "Creando producto",
            description: "Estamos procesando la información. Esto puede tardar unos segundos.",
            type: "loading",
        });

        try {
            const formData = new FormData();
            formData.append('name', data.productName);
            formData.append('price', data.productPrice);
            formData.append('quantity', data.productStock);
            formData.append('categoryId', data.productCategoryId);
            formData.append('description', data.productDescription);
            data.images.forEach(image => formData.append('images', image.file));
            await api.post('/products', formData);

            setFeedbackModal({
                isOpen: true,
                title: "Producto agregado",
                description: "El producto se creó correctamente.",
                type: "success",
            });
            reset({
                productName: "",
                productPrice: "",
                productStock: "",
                productCategoryId: "",
                productDescription: "",
                images: [],
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "No se pudo crear el producto. Intentalo de nuevo.";
            setFeedbackModal({
                isOpen: true,
                title: "Error al agregar producto",
                description: errorMessage,
                type: "error",
            });
        }
        
    };

    useEffect(() => {
        const fetchCategories = () => {
            api.get('/category')
            .then(res => {
                setCategories(res.data.categories)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
        }

    fetchCategories()
    }, [])

    watch("productName");

    return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productName">Nombre del Producto</label>
                <input type="text" id="productName" {...register("productName", { required: true })} placeholder="Nombre del Producto"/>
            </div>
            {errors.productName && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productPrice">Precio del Producto</label>
                <input type="number" id="productPrice" {...register("productPrice", { required: true })} placeholder="Precio del Producto"/>
            </div>
            {errors.productPrice && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productStock">Stock del Producto</label>
                <input type="number" id="productStock" {...register("productStock", { required: true })} placeholder="Stock del Producto"/>
            </div>
            {errors.productStock && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productCategoryId">Categoría del Producto</label>
                <select {...register("productCategoryId", { required: true })}>
                    <option value="">Seleccionar una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            {errors.productCategoryId && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productDescription">Descripción del Producto</label>
                <input type="text" id="productDescription" {...register("productDescription", { required: true })} placeholder="Descripción del Producto"/>
            </div>
            {errors.productDescription && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper image-group">
                <label>Imágenes del Producto</label>
               <Controller
                    name="images"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={[]}
                    render={({ field }) => (
                        <>
                            <ImageUpload images={field.value || []} onChange={field.onChange} />
                            <PreviewImages images={field.value || []} onRemove={field.onChange} />
                            {errors.images && <span>Este campo es obligatorio</span>}
                        </>
                    )}
                />
            </div>
        </div>
        <div className="form-group">
            <input type="submit" value="Agregar Producto" disabled={loading || isSubmitting} />
        </div>
    </form>
    <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={feedbackModal.type === "loading" ? () => {} : closeFeedbackModal}
        title={feedbackModal.title}
        description={feedbackModal.description}
        icon={
            feedbackModal.type === "success"
                ? <FaCheckCircle />
                : feedbackModal.type === "loading"
                    ? <FaSpinner />
                    : <FaExclamationCircle />
        }
        isSpinningIcon={feedbackModal.type === "loading"}
        buttonText={feedbackModal.type === "loading" ? "Procesando..." : "Entendido"}
        hideCloseButton={feedbackModal.type === "loading"}
        isActionDisabled={feedbackModal.type === "loading"}
    />
    </>
    );
}
