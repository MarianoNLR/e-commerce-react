import { useNavigate } from 'react-router-dom';
import './CheckoutCustomerPage.css';
import { useForm } from 'react-hook-form';

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
            <div className="container">    
                <form onSubmit={handleSubmit(onSubmit)} className='checkout-customer-form'>
                    <h1>Detalles del Cliente</h1>
                    <div className='form-group'>
                        <label htmlFor="name">Nombre*</label>
                        <input {...register("name", {required: true})} placeholder="Nombre" className='form-input' defaultValue={"Pepe"}/>
                        {errors.name && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="lastName">Apellido*</label>
                        <input {...register("lastName", {required: true})} placeholder="Apellido" className='form-input' defaultValue={"Pérez"}/>
                        {errors.lastName && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Correo Electrónico*</label>
                        <input {...register("email", {required: true})} placeholder="Correo Electrónico" className='form-input' defaultValue={"existencehz@gmail.com"}/>
                        {errors.email && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone">Teléfono*</label>
                        <input {...register("phone", {required: true})} placeholder="Teléfono" className='form-input' defaultValue={"123456789"}/>
                        {errors.phone && <span>Este campo es obligatorio</span>}
                    </div>
                    {/* <div className='form-group'>
                        <label htmlFor="country">País*</label>
                        <input {...register("country", {required: true})} placeholder="País" className='form-input'/>
                        {errors.country && <span>Este campo es obligatorio</span>}
                    </div> */}
                    <div className='form-group'>
                        <label htmlFor="state">Estado/Provincia*</label>
                        <input {...register("state", {required: true})} placeholder="Estado/Provincia" className='form-input' defaultValue={"Chaco"}/>
                        {errors.state && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="city">Ciudad*</label>
                        <input {...register("city", {required: true})} placeholder="Ciudad" className='form-input' defaultValue={"Resistencia"}/>
                        {errors.city && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="address">Dirección*</label>
                        <input {...register("address", {required: true})} placeholder="Dirección" className='form-input' defaultValue={"Av. 9 de Julio 1234"}/>
                        {errors.address && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="zip">Código Postal*</label>
                        <input {...register("zip", {required: true})} placeholder="Código Postal" className='form-input' defaultValue={"1234"}/>
                        {errors.zip && <span>Este campo es obligatorio</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="observations">Información Adicional</label>
                        <textarea {...register("observations")} placeholder="Información Adicional" className='form-textarea-additional_info form-input'/>
                    </div>
                    <div className='checkout-customer-form-required-text-wrapper'>
                        <p className='checkout-customer-form-required-text'>* Los campos son obligatorios</p>
                    </div>
                    
                    <button type="submit">Continuar</button>
                </form>
            </div>
        </>
    )
}