import { useForm } from 'react-hook-form'
import api from '../../../../api.js'
import './GoogleForm.css'
import { useAuthModal } from '../../../../context/AuthModalContext.jsx'
import { useAuth } from '../../../AuthProvider.jsx'

export function GoogleForm (props) {
    const { register,
        handleSubmit,
        watch,
        reset,
        formState: { errors } } = useForm()
    
    const {closeModal} = useAuthModal()
    const { fetchUser } = useAuth()
    
    const onSubmit = (data) => {
        api.post('/users/complete-google-signup', {...data, token: props.googleTempData.token})
        .then(async res => {
            if (res.status === 201 && res.data.token) {
                window.localStorage.setItem('access_token', JSON.stringify(res.data.token))
                await fetchUser()
                closeModal()
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <>
            <form className='complete-google-signup-form' onSubmit={handleSubmit(onSubmit)}>
                <h2>Completa tus datos</h2>
                <div className='input-group'>
                    <label className='input-label is_required' htmlFor="">Nombre</label>
                    <input type="text" placeholder='Ingrese su nombre' {...register('name', { required: true, minLength: 2 })} />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div className='input-group'>
                    <label className='input-label is_required' htmlFor="">Apellido</label>
                    <input type="text" placeholder='Ingrese su apellido' {...register('lastName', { required: true, minLength: 2 })} />
                    {errors.lastName && <span>This field is required</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}