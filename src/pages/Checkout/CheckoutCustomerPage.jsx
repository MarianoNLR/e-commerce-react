import { useNavigate } from 'react-router-dom';
import './CheckoutCustomerPage.css';
import { useForm } from 'react-hook-form';

export function CheckoutCustomerPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        try {
            // Aquí puedes manejar el envío de datos, como enviarlos a una API
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('last_name', data.last_name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('country', data.country);
            formData.append('state', data.state);
            formData.append('city', data.city);
            formData.append('address', data.address);
            formData.append('postal_code', data.postal_code);

            navigate('/checkout/payment_method_selection', { state: { customerData: data } });
        } catch (error) {
            console.log("ERROR AL ENVIAR DATOS");
        }
    };

    return (
        <>
            <main className="checkout-customer-page">
                <div className="container">
                    
                    <form onSubmit={handleSubmit(onSubmit)} className='checkout-customer-form'>
                        <h1>Detalles del Cliente</h1>
                        <div className='form-group'>
                            <label htmlFor="name">Nombre*</label>
                            <input {...register("name", {required: true})} placeholder="Nombre" className='form-input'/>
                            {errors.name && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="last_name">Apellido*</label>
                            <input {...register("last_name", {required: true})} placeholder="Apellido" className='form-input'/>
                            {errors.last_name && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="email">Correo Electrónico*</label>
                            <input {...register("email", {required: true})} placeholder="Correo Electrónico" className='form-input'/>
                            {errors.email && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="phone">Teléfono*</label>
                            <input {...register("phone", {required: true})} placeholder="Teléfono" className='form-input'/>
                            {errors.phone && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="country">País*</label>
                            <input {...register("country", {required: true})} placeholder="País" className='form-input'/>
                            {errors.country && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="state">Estado/Provincia*</label>
                            <input {...register("state", {required: true})} placeholder="Estado/Provincia" className='form-input'/>
                            {errors.state && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="city">Ciudad*</label>
                            <input {...register("city", {required: true})} placeholder="Ciudad" className='form-input'/>
                            {errors.city && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="address">Dirección*</label>
                            <input {...register("address", {required: true})} placeholder="Dirección" className='form-input'/>
                            {errors.address && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="postal_code">Código Postal*</label>
                            <input {...register("postal_code", {required: true})} placeholder="Código Postal" className='form-input'/>
                            {errors.postal_code && <span>Este campo es obligatorio</span>}
                        </div>
                        <div className='checkout-customer-form-required-text-wrapper'>
                            <p className='checkout-customer-form-required-text'>* Los campos son obligatorios</p>
                        </div>
                        <button type="submit">Continuar</button>
                    </form>
                </div>
            </main>
        </>
    )
}