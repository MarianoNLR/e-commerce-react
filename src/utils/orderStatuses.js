// Mirrors e-commerce-api/src/lib/orderStatuses.js. Keep both in sync.
export const ORDER_STATUSES = Object.freeze({
  PENDING_PAYMENT: 'pending_payment',
  PENDING_VALIDATION: 'pending_validation',
  PAID: 'paid',
  PAYMENT_FAILED: 'payment_failed',
  PAYMENT_REJECTED: 'payment_rejected',
  SHIPPED: 'shipped',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
})

export const ORDER_STATUS_LABELS = Object.freeze({
  [ORDER_STATUSES.PENDING_PAYMENT]: 'Pago pendiente',
  [ORDER_STATUSES.PENDING_VALIDATION]: 'Validación pendiente',
  [ORDER_STATUSES.PAID]: 'Pagado',
  [ORDER_STATUSES.PAYMENT_FAILED]: 'Pago fallido',
  [ORDER_STATUSES.PAYMENT_REJECTED]: 'Pago rechazado',
  [ORDER_STATUSES.SHIPPED]: 'Enviado',
  [ORDER_STATUSES.CANCELLED]: 'Cancelado',
  [ORDER_STATUSES.EXPIRED]: 'Expirado'
})

// Statuses where the payment outcome is final and negative.
export const ORDER_FAILURE_STATUSES = Object.freeze([
  ORDER_STATUSES.PAYMENT_FAILED,
  ORDER_STATUSES.PAYMENT_REJECTED,
  ORDER_STATUSES.CANCELLED,
  ORDER_STATUSES.EXPIRED
])

export const getOrderStatusLabel = (status) => ORDER_STATUS_LABELS[status] ?? status

export const isOrderFailureStatus = (status) => ORDER_FAILURE_STATUSES.includes(status)

export const ORDER_STATUS_FILTERS = Object.freeze([
  { value: 'all', label: 'Todos' },
  ...Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label }))
])
