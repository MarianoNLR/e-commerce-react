import './ImageModal.css'
import { CircleX } from 'lucide-react'
export function ImageModal({ imageUrl, onClose }) {
    return (
        <div
            className='order-proof-modal-overlay'
            role='presentation'
            onClick={onClose}
        >
            <div
                className='order-proof-modal-content'
                role='dialog'
                aria-modal='true'
                aria-label='Comprobante de pago'
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type='button'
                    className='order-proof-modal-close'
                    onClick={onClose}
                >
                    <CircleX size={20} className='order-proof-modal-close-icon' />
                </button>
                <img
                    src={imageUrl}
                    alt='Comprobante de pago en tamaño completo'
                    className='order-proof-modal-image'
                />
            </div>
        </div>
    )
}