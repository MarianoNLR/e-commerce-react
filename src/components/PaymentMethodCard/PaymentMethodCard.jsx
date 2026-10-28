import PropTypes from 'prop-types'
import './PaymentMethodCard.css'

export function PaymentMethodCard({icon, title, description, onSelect}) {
    return (
        <button type='button' className='payment-method-card-container' onClick={onSelect}>
            <span className="icon-wrapper">
                <img src={icon} alt="" />
            </span>
            <span className="info-wrapper">
                <span className="payment-method-card-title">{title}</span>
                <span className="payment-method-card-description">{description}</span>
            </span>
        </button>
    )
}

PaymentMethodCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    onSelect: PropTypes.func,
}
