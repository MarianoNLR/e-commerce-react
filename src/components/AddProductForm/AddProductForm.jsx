import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../../api";
import "./AddProductForm.css";
export function AddProductForm() {
    const {register, handleSubmit, watch ,formState: { errors }} = useForm();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null);

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
    const fetchCategories = async  () => {
        await api.get('/category')
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
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productName">Product Name</label>
                <input type="text" {...register("productName", { required: true })} placeholder="Product Name"/>
            </div>
            {errors.productName && <span>This field is required</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productPrice">Product Price</label>
                <input type="number" {...register("productPrice", { required: true })} placeholder="Product Price"/>
            </div>
            {errors.productPrice && <span>This field is required</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productStock">Product Stock</label>
                <input type="number" {...register("productStock", { required: true })} placeholder="Product Stock"/>
            </div>
            {errors.productStock && <span>This field is required</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productCategoryId">Product Category</label>
                <select {...register("productCategoryId", { required: true })}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            {errors.productCategoryId && <span>This field is required</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productDescription">Product Description</label>
                <input type="text" {...register("productDescription", { required: true })} placeholder="Product Description"/>
            </div>
            {errors.productDescription && <span>This field is required</span>}
        </div>
        <div className="form-group">
            <div className="input-wrapper">
                <label htmlFor="productImage">Product Image</label>
                <input type="file" name="file" {...register("file", { required: false })} />
            </div>
            {/* {errors.productImage && <span>This field is required</span>} */}
        </div>
        <div className="form-group">
            <input type="submit" value="Add Product" />
        </div>
    </form>
    );
}
