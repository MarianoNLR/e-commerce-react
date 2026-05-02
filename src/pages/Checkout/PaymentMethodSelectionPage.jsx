import { useEffect, useState } from 'react';
import './PaymentMethodSelectionPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { PaymentMethodCard } from '../../components/PaymentMethodCard/PaymentMethodCard.jsx';
import PAYMENT_METHODS from './constants/paymentMethods.js';

export function PaymentMethodSelectionPage() {
    const location = useLocation();
    const { customerData } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();
    console.log('Datos del cliente recibidos:', customerData);

    const setCustomerFormData = (customerData) => {
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
        const isValidMethod = Object.values(PAYMENT_METHODS).includes(method);
        if (!isValidMethod) {
            console.error('Método de pago no válido:', method);
            alert('Método de pago no válido. Por favor, selecciona un método de pago válido.');
            return;
        }
        setPaymentMethod(method);
        navigate("/checkout/summary", { state: { customerData, paymentMethod: method } });
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
            <h1 className='container'>Selección de Método de Pago</h1>
            <PaymentMethodCard 
            icon={"https://img.icons8.com/?size=256&id=nTLVtpxsNPaz&format=png"}
            title={"Mercado Pago"}
            description={"Paga con Mercado Pago, la plataforma de pagos más grande de Latinoamérica."}
            onSelect={() => handlePaymentMethodSelect(PAYMENT_METHODS.MERCADO_PAGO)} 
            />
            {/* <PaymentMethodCard 
            icon={"https://cdn-icons-png.flaticon.com/512/888/888870.png"}
            title={"PayPal"}
            description={"Paga de forma segura con tu cuenta de PayPal."}
            onSelect={() => handlePaymentMethodSelect(PAYMENT_METHODS.PAYPAL)} 
            /> */}
            <PaymentMethodCard 
            icon={"https://img.icons8.com/fluency/96/bank-building.png"}
            title={"Transferencia"}
            description={"Realiza tu pago mediante transferencia bancaria."}
            onSelect={() => handlePaymentMethodSelect(PAYMENT_METHODS.BANK_TRANSFER)} />
            <div>Selected Payment Method: {paymentMethod}</div>
        </>
    )
}