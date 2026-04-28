import './MyOrdersPage.css'
import { Link } from 'react-router-dom'

export function MyOrdersPage() {
  return (
    <section className='my-orders-page'>
      <div className='my-orders-glow' aria-hidden='true' />
      <article className='my-orders-content'>
        <span className='my-orders-badge'>Próximamente</span>
        <h1>Mis Pedidos</h1>
        <p>
          Esta pagina esta en desarrollo y muy pronto va a estar disponible para
          que puedas seguir todas tus compras en un solo lugar.
        </p>
        <div className='my-orders-dots' aria-hidden='true'>
          <span />
          <span />
          <span />
        </div>
        <Link to='/' className='my-orders-button'>
          Volver al inicio
        </Link>
      </article>
    </section>
  )
}
