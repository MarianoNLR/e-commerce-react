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
        return <p className='filters-status' role='status'>Cargando categorías…</p>
    }

    if (error) {
        return <p className='filters-status' role='alert'>No se pudieron cargar las categorías. Recargá la página para intentar de nuevo.</p>
    }

    return (
        <>
            <div className='filters-options-wrapper'>
                <FilterPanelOption key={0} categoryId={''} name={'Todas'}></FilterPanelOption>
                {categories.map((item, index) => (
                    <FilterPanelOption key={index+1} categoryId={item.id} name={item.name}></FilterPanelOption>
                ))}
                
            </div>
        </>
    )
}