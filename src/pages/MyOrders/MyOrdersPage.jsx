import './MyOrdersPage.css'
import { Link } from 'react-router-dom'
import api from '../../api.js'
import { useEffect, useState } from 'react'
import { FaBox, FaCalendarAlt, FaCheckCircle, FaCreditCard, FaExclamationCircle, FaUpload } from 'react-icons/fa'
import { PaginationControls } from '../../components/PaginationControls/PaginationControls.jsx'
import { FeedbackModal } from '../../components/FeedbackModal/FeedbackModal.jsx'
import { UploadProofModal } from '../../components/UploadProofModal/UploadProofModal.jsx'
import PAYMENT_METHODS from '../Checkout/constants/paymentMethods.js'
import { OrderStatusBadge } from '../../components/OrderStatusBadge/OrderStatusBadge.jsx'

import { ORDER_STATUSES, ORDER_STATUS_FILTERS as STATUS_FILTERS } from '../../utils/orderStatuses.js'

export function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalOrders, setTotalOrders] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [now, setNow] = useState(() => Date.now())
  const [proofOrder, setProofOrder] = useState(null)
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    type: 'success'
  })

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

  const fetchOrders = async ({ silent = false } = {}) => {
    if (!silent) {
      setLoadingOrders(true)
    }
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
      setError('No se pudieron cargar tus pedidos. Intentá de nuevo.')
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, statusFilter])

  // Keeps the "upload proof" deadline accurate while the page stays open.
  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 30000)
    return () => window.clearInterval(intervalId)
  }, [])

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

  // The API is the source of truth (it rejects expired or already-paid orders);
  // this only decides whether the button is worth showing.
  const canUploadProof = (order) => {
    if (order?.payment_method !== PAYMENT_METHODS.BANK_TRANSFER) return false
    if (order.status !== ORDER_STATUSES.PENDING_PAYMENT) return false

    const expiresAt = new Date(order.expires_at).getTime()
    return Number.isFinite(expiresAt) && expiresAt > now
  }

  const getProofDeadlineText = (order) => {
    const deadline = new Date(order.expires_at)
    const time = deadline.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    const isToday = deadline.toDateString() === new Date(now).toDateString()
    const when = isToday
      ? `las ${time} hs`
      : `el ${deadline.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })} a las ${time} hs`

    return `Tenés hasta ${when} para subir el comprobante.`
  }

  const handleCloseProofModal = () => {
    setProofOrder(null)
  }

  const closeFeedbackModal = () => {
    setFeedbackModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleProofUploaded = () => {
    setProofOrder(null)
    setFeedbackModal({
      isOpen: true,
      title: 'Comprobante recibido',
      description: 'Recibimos tu comprobante y lo confirmaremos cuanto antes. Muchas gracias por tu compra.',
      type: 'success'
    })
    fetchOrders({ silent: true })
  }

  const handleProofUploadFailed = () => {
    setProofOrder(null)
    setFeedbackModal({
      isOpen: true,
      title: 'No se pudo enviar el comprobante',
      description: 'Ocurrió un error al subir el comprobante. Es posible que la orden haya vencido o que ya no admita comprobantes. Revisá el estado de tu pedido e intentá nuevamente.',
      type: 'error'
    })
    fetchOrders({ silent: true })
  }

  if (loadingOrders) {
    return <section className='my-orders-page' role='status'>Cargando pedidos…</section>
  }

  if (error) {
    return (
      <section className='my-orders-page'>
        <article className='my-orders-content'>
          <h1>Mis pedidos</h1>
          <p role='alert'>{error}</p>
          <button type='button' className='my-orders-button btn btn-primary' onClick={() => fetchOrders()}>
            Reintentar
          </button>
        </article>
      </section>
    )
  }

  return (
    <section className='my-orders-page'>
      <article className='my-orders-content'>
        <h1>Mis pedidos</h1>

        <div className='my-orders-toolbar'>
          <div className='my-orders-filter-group'>
            <label htmlFor='status-filter' className='my-orders-filter-label'>
              Filtrar por estado
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
          <span className='my-orders-total tabular'>{totalOrders} {totalOrders === 1 ? 'pedido' : 'pedidos'}</span>
        </div>

        {!orders.length ? (
          <>
            <div className='my-orders-empty'>
              <p>No hay pedidos para el filtro seleccionado.</p>
              <Link to='/' className='my-orders-button btn btn-primary'>
                Ir a comprar
              </Link>
            </div>
          </>
        ) : (
          <div className='my-orders-list'>
            {orders.map((order) => (
              <article className='my-order-card' key={order.id}>
                <header className='my-order-card-header'>
                  <h2>Pedido #{order.id}</h2>
                  <OrderStatusBadge status={order.status} />
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

                {canUploadProof(order) && (
                  <div className='my-order-proof-row'>
                    <p className='my-order-proof-hint'>{getProofDeadlineText(order)}</p>
                    <button
                      type='button'
                      className='my-order-proof-button btn btn-primary'
                      onClick={() => setProofOrder(order)}
                    >
                      <FaUpload aria-hidden='true' />
                      Subir comprobante
                    </button>
                  </div>
                )}
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

      <UploadProofModal
        isOpen={Boolean(proofOrder)}
        orderId={proofOrder?.id}
        totalText={proofOrder ? formatPrice(proofOrder.total) : ''}
        deadlineText={proofOrder ? getProofDeadlineText(proofOrder) : ''}
        onClose={handleCloseProofModal}
        onSuccess={handleProofUploaded}
        onError={handleProofUploadFailed}
      />

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={closeFeedbackModal}
        title={feedbackModal.title}
        description={feedbackModal.description}
        icon={feedbackModal.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
        variant={feedbackModal.type === 'success' ? 'success' : 'error'}
        buttonText='Entendido'
      />
    </section>
  )
}
