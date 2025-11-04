import { useEffect, useState } from 'react';
import './PaymentMethodSelectionPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { PaymentMethodCard } from '../../components/PaymentMethodCard/PaymentMethodCard.jsx';

export function PaymentMethodSelectionPage() {
    const location = useLocation();
    const { customerData } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();
    console.log('Datos del cliente recibidos:', customerData);

    const setCustomerFormData = (customerData) => {
        // Aquí puedes manejar los datos del formulario, por ejemplo, guardarlos en el estado o enviarlos a una API
        const formData = new FormData();
            formData.append('name', customerData.name);
            formData.append('last_name', customerData.last_name);
            formData.append('email', customerData.email);
            formData.append('phone', customerData.phone);
            formData.append('country', customerData.country);
            formData.append('state', customerData.state);
            formData.append('city', customerData.city);
            formData.append('address', customerData.address);
            formData.append('postal_code', customerData.postal_code);
    }

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
        if (method === 'mercado_pago') {
            // Lógica específica para Mercado Pago
            console.log('Mercado Pago seleccionado');
            navigate('/checkout/confirmation', { state: { customerData, paymentMethod: method } });
        } else if (method === 'paypal') {
            // Lógica específica para PayPal
            console.log('PayPal seleccionado');
            //navigate('/checkout/confirmation', { state: { customerData, paymentMethod: method } });
        } else if (method === 'transferencia_bancaria') {
            // Lógica específica para Transferencia Bancaria
            console.log('Transferencia Bancaria seleccionada');
            //navigate('/checkout/confirmation', { state: { customerData, paymentMethod: method } });
        }

    }

    useEffect(() => {
        if (customerData) {
            setCustomerFormData(customerData);
        }
    }, [customerData]);

    if (!customerData) {
        return <div>No se proporcionaron datos del cliente.</div>;
    }
    return (
        <>
            <h1 className='container'>Payment Method Selection Page</h1>
            <PaymentMethodCard 
            icon={"https://img.icons8.com/?size=256&id=nTLVtpxsNPaz&format=png"}
            title={"Mercado Pago"}
            description={"Paga con Mercado Pago, la plataforma de pagos más grande de Latinoamérica."}
            onSelect={() => handlePaymentMethodSelect('mercado_pago')} 
            />
            <PaymentMethodCard 
            icon={"https://cdn-icons-png.flaticon.com/512/888/888870.png"}
            title={"PayPal"}
            description={"Paga de forma segura con tu cuenta de PayPal."}
            onSelect={() => handlePaymentMethodSelect('paypal')} 
            />
            <PaymentMethodCard 
            icon={"https://cdn-icons-png.flaticon.com/512/888/888870.png"}
            title={"Transferencia Bancaria"}
            description={"Realiza tu pago mediante transferencia bancaria."}
            onSelect={() => handlePaymentMethodSelect('transferencia_bancaria')} />
            <div>Selected Payment Method: {paymentMethod}</div>
        </>
    )
}