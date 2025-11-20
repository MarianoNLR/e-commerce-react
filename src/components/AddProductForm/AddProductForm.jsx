import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ImageUpload } from "../ImageUpload/ImageUpload.jsx";
import api from "../../api";
import "./AddProductForm.css";
export function AddProductForm() {
    const {register, handleSubmit, setValue, watch ,formState: { errors }} = useForm({
        defaultValues: {
            images: []
        }
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null);
    const images = watch("images");
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const formData = new FormData();
            formData.append('name', data.productName);
            formData.append('price', data.productPrice);
            formData.append('quantity', data.productStock);
            formData.append('categoryId', data.productCategoryId);
            formData.append('description', data.productDescription);
            formData.append('file', data.file[0]);

            await api.post('/products', formData)
            console.log("Producto agregado con exito")
        } catch (error) {
            console.log("ERROR LOADING PRODUCT")
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
                setError(err)
                setLoading(false)
            })
        }

    fetchCategories()
    }, [])

    console.log(watch("productName")); // watch input value by passing the name of it

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productName">Nombre del Producto</label>
                <input type="text" {...register("productName", { required: true })} placeholder="Nombre del Producto"/>
            </div>
            {errors.productName && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productPrice">Precio del Producto</label>
                <input type="number" {...register("productPrice", { required: true })} placeholder="Precio del Producto"/>
            </div>
            {errors.productPrice && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productStock">Stock del Producto</label>
                <input type="number" {...register("productStock", { required: true })} placeholder="Stock del Producto"/>
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
                <input type="text" {...register("productDescription", { required: true })} placeholder="Descripción del Producto"/>
            </div>
            {errors.productDescription && <span>Este campo es obligatorio</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper image-group">
                <label>Imágenes del Producto</label>
                <ImageUpload setValue={setValue} images={images} />
            </div>
        </div>
        <div className="form-group">
            <input type="submit" value="Agregar Producto" />
        </div>
    </form>
    );
}
