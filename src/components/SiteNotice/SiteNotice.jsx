import './SiteNotice.css'

// Aviso fijo: no se puede cerrar a propósito, la tienda es ficticia y debe quedar claro siempre.
export function SiteNotice () {
    return (
        <div className='site-notice'>
            <p className='site-notice-text'>
                <strong>Proyecto de portfolio:</strong> la tienda y los productos son ficticios.
                {' '}La primera carga puede tardar unos segundos mientras se activa el servidor.
            </p>
        </div>
    )
}
