import './UpdateStatusModal.css';
import api from '../../../api.js';
export function UpdateStatusModal({ orderPossibleStatus, setOrderData, orderData, setShowUpdateStatusModal }) {
    const handleUpdateOrderStatus = async () => {
        api.put(`/orders/${orderData.id}/status`, {
            status: document.querySelector('.update-status-modal select').value
        })
        .then(res => {
            setShowUpdateStatusModal(false);
            setOrderData(prev => ({...prev, status: res.data.status}));
        })
        .catch(err => {
            console.error(err);
        });
    }

    return (
        <div className='update-status-modal'>
                <div className='update-status-modal-container'>
                    <h2>Actualizar Estado de la Orden</h2>
                    <select>
                        {Object.entries(orderPossibleStatus).map(([statusKey, statusValue]) => (
                            <option key={statusKey} value={statusKey}>{statusValue}</option>
                        ))}
                    </select>
                    <div className='update-status-modal-buttons'>
                        <button className='btn-save' onClick={() => handleUpdateOrderStatus()} type="button">Guardar</button>
                        <button className='btn-cancel' onClick={() => setShowUpdateStatusModal(false)} type="button">Cancelar</button>
                    </div>
                </div>
            </div>
    )
}