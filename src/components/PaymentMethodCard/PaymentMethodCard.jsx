import './PaymentMethodCard.css'
export function PaymentMethodCard({icon, title, description, onSelect}) {
    return (
        <>
            <div className='payment-method-card-container' onClick={onSelect}>
                <div className="icon-wrapper">
                    <img src={icon} alt={title} />
                </div>
                <div className="info-wrapper">
                    <h3 className="payment-method-card-title">{title}</h3>
                    <p className="payment-method-card-description">{description}</p>
                </div>
                {/* <div className="button-wrapper">
                    <button onClick={onSelect}>Select</button>
                </div> */}
            </div>
        </>
    )
}