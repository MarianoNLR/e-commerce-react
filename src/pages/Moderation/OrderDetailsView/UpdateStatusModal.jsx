import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api.js';

export function UpdateStatusModal({ orderPossibleStatus, setOrderData, orderData, setShowUpdateStatusModal }) {
    const [status, setStatus] = useState(orderData.status);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const close = () => setShowUpdateStatusModal(false);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') setShowUpdateStatusModal(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setShowUpdateStatusModal]);

    const handleUpdateOrderStatus = async () => {
        setSaving(true);
        setError('');
        try {
            const res = await api.put(`/orders/${orderData.id}/status`, { status });
            setOrderData(prev => ({ ...prev, status: res.data.order.status }));
            close();
        } catch (err) {
            console.error(err);
            setError('No se pudo actualizar el estado. Intentá de nuevo.');
            setSaving(false);
        }
    };

    return (
        <div className='dialog-overlay'>
            <div className='dialog' role='dialog' aria-modal='true' aria-labelledby='update-status-title'>
                <h2 id='update-status-title'>Actualizar estado del pedido</h2>
                <div className='form-group'>
                    <label htmlFor='update-status-select'>Nuevo estado</label>
                    <select
                        id='update-status-select'
                        className='form-input'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {Object.entries(orderPossibleStatus).map(([statusKey, statusValue]) => (
                            <option key={statusKey} value={statusKey}>{statusValue}</option>
                        ))}
                    </select>
                </div>
                {error && <p className='field-error' role='alert'>{error}</p>}
                <div className='dialog-actions'>
                    <button className='btn btn-secondary' onClick={close} type='button'>Cancelar</button>
                    <button className='btn btn-primary' onClick={handleUpdateOrderStatus} type='button' disabled={saving}>
                        {saving ? 'Guardando…' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

UpdateStatusModal.propTypes = {
    orderPossibleStatus: PropTypes.object.isRequired,
    setOrderData: PropTypes.func.isRequired,
    orderData: PropTypes.object.isRequired,
    setShowUpdateStatusModal: PropTypes.func.isRequired,
};
