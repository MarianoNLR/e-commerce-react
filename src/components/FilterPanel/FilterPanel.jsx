import { useEffect, useState } from 'react'
import { FilterPanelOption } from '../FilterPanelOption/FilterPanelOption.jsx'
import api from '../../api.js'
import './FilterPanel.css'

export function FilterPanel () {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError ] = useState(null)

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

    if (loading) {
        return <>Cargando...</>
    }

    if (error) {
        return <>Error al cargar las categorias</>
    }

    return (
        <>
            <div className='filters-options-wrapper'>
                {categories.map((item, index) => (
                    <FilterPanelOption key={index} categoryId={item.id} name={item.name}></FilterPanelOption>
                ))}
                
            </div>
        </>
    )
}