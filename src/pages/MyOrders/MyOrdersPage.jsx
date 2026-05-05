import './MyOrdersPage.css'
import { Link } from 'react-router-dom'
import api from '../../api.js'
import { useEffect, useState } from 'react'
import { FaBox, FaCalendarAlt, FaCreditCard } from 'react-icons/fa'
import { PaginationControls } from '../../components/PaginationControls/PaginationControls.jsx'

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'pending_payment', label: 'Pago pendiente' },
  { value: 'pending_validation', label: 'Validación pendiente' },
  { value: 'paid', label: 'Pagado' },
  { value: 'payment_failed', label: 'Pago fallido' },
  { value: 'shipped', label: 'Enviado' },
  { value: 'cancelled', label: 'Cancelado' },
  { value: 'expired', label: 'Expirado' }
]

export function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalOrders, setTotalOrders] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')

  const orderPossibleStatus = {
    pending_payment: 'Pago pendiente',
    paid: 'Pagado',
    payment_failed: 'Pago fallido',
    pending_validation: 'Validación pendiente',
    shipped: 'Enviado',
    cancelled: 'Cancelado',
    expired: 'Expirado'
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(Number(price) || 0)
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'

    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const fetchOrders = async () => {
    setLoadingOrders(true)
    setError('')

    try {
      const params = { page: currentPage }
      if (statusFilter !== 'all') {
        params.status = statusFilter
      }
      params.limit = 3

      const response = await api.get('/orders', { params })
      const apiData = response?.data ?? response
      const data = Array.isArray(apiData?.orders)
        ? apiData.orders
        : Array.isArray(response?.orders)
          ? response.orders
          : Array.isArray(response)
            ? response
            : []

      setOrders(data)
      setHasMore(Boolean(apiData?.hasMore))
      setTotalOrders(Number(apiData?.totalOrders) || data.length)

      if (typeof apiData?.currentPage === 'number') {
        setCurrentPage(apiData.currentPage)
      }
    } catch (fetchError) {
      console.error(fetchError)
      setError('No se pudieron cargar tus pedidos. Intenta nuevamente.')
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, statusFilter])

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage === currentPage) {
      return
    }

    setCurrentPage(nextPage)
  }

  if (loadingOrders) {
    return <main className='my-orders-page'>Cargando pedidos...</main>
  }

  if (error) {
    return (
      <main className='my-orders-page'>
        <article className='my-orders-content'>
          <h1>Mis Pedidos</h1>
          <p>{error}</p>
          <button type='button' className='my-orders-button' onClick={fetchOrders}>
            Reintentar
          </button>
        </article>
      </main>
    )
  }

  return (
    <section className='my-orders-page'>
      <article className='my-orders-content'>
        <h1>Mis Pedidos</h1>

        <div className='my-orders-toolbar'>
          <div className='my-orders-filter-group'>
            <label htmlFor='status-filter' className='my-orders-filter-label'>
              Filtrar por Estado
            </label>
            <select
              id='status-filter'
              className='my-orders-filter'
              value={statusFilter}
              onChange={handleFilterChange}
            >
              {STATUS_FILTERS.map((filterOption) => (
                <option key={filterOption.value} value={filterOption.value}>
                  {filterOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span className='my-orders-total'>Total: {totalOrders}</span>

        {!orders.length ? (
          <>
            <p>No hay pedidos para el filtro seleccionado.</p>
            <Link to='/' className='my-orders-button'>
              Ir a comprar
            </Link>
          </>
        ) : (
          <div className='my-orders-list'>
            {orders.map((order) => (
              <article className='my-order-card' key={order.id}>
                <header className='my-order-card-header'>
                  <h2>Pedido #{order.id}</h2>
                  <span className={`my-order-status my-order-status-${order.status}`}>
                    {orderPossibleStatus[order.status] ?? order.status}
                  </span>
                </header>

                <div className='my-order-meta'>
                  <p>
                    <FaCalendarAlt className='my-order-meta-icon' aria-hidden='true' />
                    {formatDate(order.createdAt)}
                  </p>
                  <div className='my-order-products'>
                    <FaBox className='my-order-meta-icon my-order-products-icon' aria-hidden='true' />
                    <strong>Productos:</strong>
                    {order.items && order.items.length > 0 ? (
                      <ul className='my-order-products-list'>
                        {order.items.map((item, index) => {
                          const productName = item?.productName ?? item?.name ?? item?.title ?? 'Producto'
                          const quantity = Number(item?.quantity) || 0
                          const priceAtPurchase = formatPrice(item?.priceAtPurchase * quantity)

                          return (
                            <li key={item?.id ?? `${order.id}-${productName}-${index}`}>
                              <span className='my-order-product-left'>
                                <span className='my-order-product-name'>{productName}</span>
                                <span className='my-order-product-quantity'>x {quantity}</span>
                              </span>
                              <span className='my-order-product-price'>{priceAtPurchase}</span>
                            </li>
                          )
                        })}
                      </ul>
                    ) : (
                      <span className='my-order-products-empty'>-</span>
                    )}
                  </div>
                  <div className='my-order-total-row'>
                    <span className='my-order-total-left'>
                      <FaCreditCard className='my-order-meta-icon' aria-hidden='true' />
                      <strong>Total:</strong>
                    </span>
                    <span className='my-order-total-value'>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <PaginationControls
          currentPage={currentPage}
          hasMore={hasMore}
          isLoading={loadingOrders}
          onPageChange={handlePageChange}
        />
      </article>
    </section>
  )
}
