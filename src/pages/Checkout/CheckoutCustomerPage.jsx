import { useNavigate } from 'react-router-dom';
import './CheckoutCustomerPage.css';
import { useForm } from 'react-hook-form';

// Datos de prueba: se precargan solo con `npm run dev`; en producción el formulario sale vacío.
const devDefaults = import.meta.env.DEV ? {
    name: 'Pepe',
    lastName: 'Pérez',
    email: 'existencehz@gmail.com',
    phone: '123456789',
    state: 'Chaco',
    city: 'Resistencia',
    address: 'Av. 9 de Julio 1234',
    zip: '1234',
} : {};

export function CheckoutCustomerPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        console.log(data);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('lastName', data.lastName);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            // formData.append('country', data.country);
            formData.append('state', data.state);
            formData.append('city', data.city);
            formData.append('address', data.address);
            formData.append('zip', data.zip);
            formData.append('observations', data.observations);

            navigate('/checkout/payment_method_selection', { state: { customerData: data } });
        } catch (error) {
            console.log("ERROR AL ENVIAR DATOS");
        }
    };

    return (
        <>
            <div className="checkout-customer-container">    
                <form onSubmit={handleSubmit(onSubmit)} className='checkout-customer-form'>
                    <h1>Tus datos de envío</h1>
                    <div className='form-group'>
                        <label htmlFor="name">Nombre*</label>
                        <input id="name" {...register("name", {required: true})} placeholder="Nombre" className='form-input' defaultValue={devDefaults.name}/>
                        {errors.name && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="lastName">Apellido*</label>
                        <input id="lastName" {...register("lastName", {required: true})} placeholder="Apellido" className='form-input' defaultValue={devDefaults.lastName}/>
                        {errors.lastName && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Correo electrónico*</label>
                        <input id="email" {...register("email", {required: true})} placeholder="Correo electrónico" className='form-input' defaultValue={devDefaults.email}/>
                        {errors.email && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone">Teléfono*</label>
                        <input id="phone" {...register("phone", {required: true})} placeholder="Teléfono" className='form-input' defaultValue={devDefaults.phone}/>
                        {errors.phone && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    {/* <div className='form-group'>
                        <label htmlFor="country">País*</label>
                        <input {...register("country", {required: true})} placeholder="País" className='form-input'/>
                        {errors.country && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div> */}
                    <div className='form-group'>
                        <label htmlFor="state">Provincia*</label>
                        <input id="state" {...register("state", {required: true})} placeholder="Provincia" className='form-input' defaultValue={devDefaults.state}/>
                        {errors.state && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="city">Ciudad*</label>
                        <input id="city" {...register("city", {required: true})} placeholder="Ciudad" className='form-input' defaultValue={devDefaults.city}/>
                        {errors.city && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="address">Dirección*</label>
                        <input id="address" {...register("address", {required: true})} placeholder="Dirección" className='form-input' defaultValue={devDefaults.address}/>
                        {errors.address && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="zip">Código postal*</label>
                        <input id="zip" {...register("zip", {required: true})} placeholder="Código postal" className='form-input' defaultValue={devDefaults.zip}/>
                        {errors.zip && <span className="field-error" role="alert">Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="observations">Información adicional</label>
                        <textarea id="observations" {...register("observations")} placeholder="Aclaraciones para la entrega (opcional)" className='form-textarea-additional_info form-input'/>
                    </div>
                    <div className='checkout-customer-form-required-text-wrapper'>
                        <p className='checkout-customer-form-required-text'>* Campos obligatorios</p>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Continuar</button>
                </form>
            </div>
        </>
    )
}