import PropTypes from 'prop-types'
import { getOrderStatusLabel } from '../../utils/orderStatuses.js'
import './OrderStatusBadge.css'

// Una sola representación del estado de una orden (cliente y administración).
export function OrderStatusBadge ({ status }) {
    return (
        <span className={`order-status-badge order-status-badge--${status}`}>
            {getOrderStatusLabel(status)}
        </span>
    )
}

OrderStatusBadge.propTypes = {
    status: PropTypes.string
}
