import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';
import api from '../api.js';
import { CircularProgress } from '@mui/material';

export function MercadoPagoButton(props) {
    const [preferenceId, setPreferenceId] = useState(null)
    const [loadingPreference, setLoadingPreference] = useState(true)
    useEffect(() => {
        initMercadoPago('APP_USR-4265d0aa-e20a-42a9-b687-30be71fa5be3');
            api.post('/checkout', { shipping_info: props.shipping_info, payment_method: 'mercadopago', order_id: props.order_data.id })
            .then(res => {
                console.log(res.data.result.id)
                setPreferenceId(res.data.result.id)
                setLoadingPreference(false)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    if (loadingPreference) {
        return <CircularProgress />;
    }

    return (
        <>
            { preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} /> }
        </>
        
    )
}