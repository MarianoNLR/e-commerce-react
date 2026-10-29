import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { ImageUpload } from "../ImageUpload/ImageUpload.jsx";
import { PreviewImages } from "../PreviewImages/PreviewImages.jsx";
import { FeedbackModal } from "../FeedbackModal/FeedbackModal.jsx";
import api from "../../api";
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
    <form onSubmit={handleSubmit(onSubmit)} className="admin-form" noValidate>
        <div className="form-group">
            <label htmlFor="productName">Nombre del producto</label>
            <input type="text" id="productName" className="form-input" {...register("productName", { required: true })} placeholder="Ej: Teclado mecánico 60%" />
            {errors.productName && <span className="field-error" role="alert">Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <label htmlFor="productPrice">Precio</label>
            <input type="number" id="productPrice" className="form-input" {...register("productPrice", { required: true })} placeholder="0" min="0" />
            {errors.productPrice && <span className="field-error" role="alert">Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <label htmlFor="productStock">Stock</label>
            <input type="number" id="productStock" className="form-input" {...register("productStock", { required: true })} placeholder="0" min="0" />
            {errors.productStock && <span className="field-error" role="alert">Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <label htmlFor="productCategoryId">Categoría</label>
            <select id="productCategoryId" className="form-input" {...register("productCategoryId", { required: true })}>
                <option value="">Seleccionar una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            {errors.productCategoryId && <span className="field-error" role="alert">Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <label htmlFor="productDescription">Descripción</label>
            <textarea id="productDescription" className="form-input" {...register("productDescription", { required: true })} placeholder="Descripción del producto" />
            {errors.productDescription && <span className="field-error" role="alert">Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <span className="form-label">Imágenes</span>
            <Controller
                name="images"
                control={control}
                rules={{ required: true }}
                defaultValue={[]}
                render={({ field }) => (
                    <>
                        <ImageUpload images={field.value || []} onChange={field.onChange} />
                        <PreviewImages images={field.value || []} onRemove={field.onChange} />
                        {errors.images && <span className="field-error" role="alert">Agregá al menos una imagen</span>}
                    </>
                )}
            />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading || isSubmitting}>Agregar producto</button>
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
        buttonText={feedbackModal.type === "loading" ? "Procesando…" : "Entendido"}
        hideCloseButton={feedbackModal.type === "loading"}
        isActionDisabled={feedbackModal.type === "loading"}
        variant={feedbackModal.type === "success" ? "success" : feedbackModal.type === "loading" ? "info" : "error"}
    />
    </>
    );
}
