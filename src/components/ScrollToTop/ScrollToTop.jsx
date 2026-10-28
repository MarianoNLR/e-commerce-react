import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Lleva el scroll al inicio cada vez que cambia la página (o la búsqueda, ej: /products/search/?q=...).
// React Router no lo hace solo: al navegar sin recargar, el navegador conserva la posición anterior.
export function ScrollToTop () {
    const { pathname, search } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname, search])

    return null
}
