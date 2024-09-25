import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';
import api from '../api.js';

export function MercadoPagoButton(props) {
    const [preferenceId, setPreferenceId] = useState(null)
    const [loadingPreference, setLoadingPreference] = useState(true)
    useEffect(() => {
        initMercadoPago('TEST-9e04c2d4-566e-4a70-8a4b-d4899aaa910f');
            api.post('/checkout')
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
        return <>Loading...</>
    }

    return (
        <>
            { preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} /> }
        </>
        
    )
}