import {useState, useEffect} from "react"
import {FaEdit, FaPlus, FaTrash} from "react-icons/fa"
import api from "../../../api.js"
import { EditCategoryModal } from "../../../components/EditCategoryModal/EditCategoryModal.jsx"
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal.jsx"
import propTypes from "prop-types"
import styles from "./CategoriesPage.module.css"

export function CategoriesPage() { 
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/category?includeCount=true');
            setCategories(response.data.categories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setLoading(false);
        }
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsCreating(false);
        setEditModalOpened(true);
    };

    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setIsCreating(true);
        setEditModalOpened(true);
    };

    const handleCategoryUpdated = (updatedCategory) => {
        if (isCreating) {
            setCategories(prev => [...prev, updatedCategory]);
        } else {
            console.log(updatedCategory)
            setCategories(prev => 
                prev.map( category => category._id === updatedCategory._id ? updatedCategory : category )
            );
        }
    };

    const handleDeleteCategory = async (category) => {
        setSelectedCategory(category);
        setConfirmModalOpened(true);
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/category/${selectedCategory._id}`);
            setCategories(prev => prev.filter(cat => cat._id !== selectedCategory._id));
            setConfirmModalOpened(false);
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error al eliminar la categoría');
        }
    };

    if (loading) {
        return <div className={styles.loadingContainer}>Cargando categorías...</div>;
    }

    return (
        // Header page
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Gestión de Categorías</h1>
                <button className={styles.btnCreate} onClick={handleCreateCategory}>
                    <FaPlus /> Nueva Categoría
                </button>
            </div>

            {/* Render categories list */}
            <div className={styles.categoriesList}>
                {categories.length === 0 ? (
                    <div className={styles.noCategories}>
                        <p>No hay categorías creadas</p>
                    </div>
                ) : (
                    categories.map(category => (
                        <div key={category.id} className={styles.categoryCard}>
                            <div className={styles.categoryInfo}>
                                <h3 className={styles.categoryName}>{category.name}</h3>
                                <span className={styles.categoryCount}>
                                    {category.productCount || 0} productos
                                </span>
                            </div>
                            <div className={styles.categoryActions}>
                                <button 
                                    className={styles.btnEdit}
                                    onClick={() => handleEditCategory(category)}
                                    title="Editar categoría"
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    className={styles.btnDelete}
                                    onClick={() => handleDeleteCategory(category)}
                                    title="Eliminar categoría"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Render edit modal if edit button clicked */}
            {editModalOpened && (
                <EditCategoryModal
                    category={selectedCategory}
                    isCreating={isCreating}
                    isOpen={editModalOpened}
                    onClose={() => setEditModalOpened(false)}
                    setEditModalOpened={setEditModalOpened}
                    onCategoryUpdated={handleCategoryUpdated}
                />
            )}
            {/* Render confirm delete modal if delete button clicked */}
            {confirmModalOpened && (
                <ConfirmModal
                    isOpen={confirmModalOpened}
                    onClose={() => setConfirmModalOpened(false)}
                    onConfirm={confirmDelete}
                    title="Confirmar eliminación"
                    message={`¿Estás seguro de que deseas eliminar la categoría "${selectedCategory?.name}"?`}
                />
            )}
        </div>
    )
}

CategoriesPage.propTypes = {
    categories: propTypes.array,
    loading: propTypes.bool,
    editModalOpened: propTypes.bool,
    confirmModalOpened: propTypes.bool,
    category: propTypes.object,
    isCreating: propTypes.bool,
    selectedCategory: propTypes.object,
}