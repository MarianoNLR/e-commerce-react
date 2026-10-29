import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api.js';
import './MercadoPagoButton.css';

export function MercadoPagoButton(props) {
    const [preferenceId, setPreferenceId] = useState(null)
    const [loadingPreference, setLoadingPreference] = useState(true)
    const [walletReady, setWalletReady] = useState(false)
    const [error, setError] = useState(false)
    // Se guardan en un ref para crear la preferencia una sola vez aunque el padre vuelva a renderizar
    const paymentData = useRef({ shippingInfo: props.shipping_info, orderId: props.order_data.id })

    const createPreference = useCallback(() => {
        setLoadingPreference(true)
        setWalletReady(false)
        setError(false)
        initMercadoPago('APP_USR-4265d0aa-e20a-42a9-b687-30be71fa5be3');
        api.post('/checkout', { shipping_info: paymentData.current.shippingInfo, payment_method: 'mercadopago', order_id: paymentData.current.orderId })
            .then(res => {
                setPreferenceId(res.data.result.id)
            })
            .catch(err => {
                console.error(err)
                setError(true)
            })
            .finally(() => setLoadingPreference(false))
    }, [])

    useEffect(() => {
        createPreference()
    }, [createPreference])

    if (error) {
        return (
            <div className='mp-button-feedback' role='alert'>
                <p>No pudimos preparar el pago con Mercado Pago.</p>
                <button type='button' className='btn btn-secondary' onClick={createPreference}>Reintentar</button>
            </div>
        )
    }

    // Se muestra el indicador hasta que el botón de Mercado Pago terminó de renderizar
    const showLoader = loadingPreference || (preferenceId && !walletReady)

    return (
        <div className='mp-button'>
            {showLoader && (
                <div className='mp-button-feedback' role='status'>
                    <span className='spinner' aria-hidden='true' />
                    <span>Preparando el pago…</span>
                </div>
            )}
            {preferenceId && (
                <div className={walletReady ? 'mp-wallet' : 'mp-wallet is-loading'}>
                    <Wallet
                        initialization={{ preferenceId: preferenceId }}
                        customization={{ texts: { valueProp: 'smart_option' } }}
                        onReady={() => setWalletReady(true)}
                    />
                </div>
            )}
        </div>
    )
}

MercadoPagoButton.propTypes = {
    shipping_info: PropTypes.object,
    order_data: PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) }).isRequired
}
