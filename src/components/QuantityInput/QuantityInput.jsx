import PropTypes from 'prop-types'
import './QuantityInput.css'

export function QuantityInput ({ quantity, setQuantity, stock }) {
    

    const handleSubQuantity = (e) => {
        e.preventDefault()
        setQuantity(prev => {
            const newQuantity = prev - 1
            return newQuantity > 1 ? newQuantity : 1
        })
    }

    const handleAddQuantity = (e) => {
        e.preventDefault()
        setQuantity(prev => {
            const newQuantity = prev + 1
            return newQuantity <= stock ? newQuantity : prev
        })
    }

    return (
        <>
            <div className="quantity-input-wrapper">
                <div className="quantity-input-controls-wrapper">
                <input type="button" className="quantity-input subtract" value="−" aria-label="Disminuir cantidad" onClick={(e) => handleSubQuantity(e)} />
                <span className="quantity-output tabular" aria-live="polite">{quantity}</span>
                <input type="button" className="quantity-input add" value="+" aria-label="Aumentar cantidad" onClick={(e) => handleAddQuantity(e)}/>
                </div>
            </div>
        </>
    )
}

QuantityInput.propTypes = {
    quantity: PropTypes.number,
    setQuantity: PropTypes.func,
    stock: PropTypes.number
}