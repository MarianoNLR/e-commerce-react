import { useForm } from "react-hook-form"
import api from "../../../../api.js"
import './EmailForm.css'
import { useState } from "react"
import { useAuth } from "../../../../hooks/useAuth.jsx"
import { useNavigate } from "react-router-dom"
import { useAuthModal } from "../../../../hooks/useAuthModal.jsx"

export function EmailForm (props) {
    const [step, setStep] = useState("email")
    const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(null)
    const { login } = useAuth()
    const { closeModal } = useAuthModal()
    const navigate = useNavigate()

    const {register, 
            handleSubmit,
            formState: {errors},
            watch,
    } = useForm() 

    const onSubmit = handleSubmit( async (data) => {

        if (step === 'email') {
            api.post('/users/email-check', {email: data.email})
            .then(res => {
                if (res.status === 200 && res.data.email) {
                    setEmailAlreadyUsed(res.data.email)
                    setStep('password')
                } else {
                    setStep('register')
                }
            }).catch(err => console.error(err))
        } else if (step === 'password') {
            login(data).then(res => {
                console.log('login response', res)
                if (res.status === 200 && res.data.token) {
                    closeModal()
                }
            }).catch(err => console.error(err))
            
        } else if (step === 'register') {
            try {
                api.post('/users/register', 
                data
            ).then(async res => {
                console.log('response', res)
                // if (res.status === 200 && res.data.tempToken) {
                //     console.log(res)
                // }
                if (res.status === 201) {
                    login({email: data.email, password: data.password})
                    .then(res => {
                        if (res.status === 200 && res.data.token) {
                            closeModal()
                        }
                    })
                    
                }
                // navigate(0)
            }).catch(err => console.error(err))
            } catch (error) {
                console.error('Error: ', error)
            }
        }
        // try {
        //     api.post('/users/register', {
        //         data
        //     }).then(res => {
        //         console.log('response', res)
        //         if (res.status === 200 && res.data.tempToken) {
        //             console.log(res)
        //         }
        //         // navigate(0)
        //     }).catch(err => console.error(err))
            
        // } catch (error) {
        //     console.error('Error: ', error)
        // }
    })
    return (
        <> 
            {step === 'email' && (
                <form onSubmit={handleSubmit(onSubmit)} className="signup-email-form">
                    <h2>Continua con tu correo:</h2>
                    <div className="input-group">
                        <label className="label-email is_required" htmlFor="">Email</label>
                        <input className="email-input" type="email" name="email" id="" placeholder="example@example.com" {...register("email", {
                            required: {
                                value: true,
                                message: "Email es requerido."
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email ingresado no es válido."
                            }
                        })} />
                        {errors.email && <span className="span-form-error">{errors.email.message}</span>}
                    </div>
                    <button type="submit">Continuar</button>
                </form>
            )}
            {step === 'password' && (
                <>
                    <form className="signup-email-form">
                        <h2>Inicia Sesión</h2>
                        <div className="input-group">
                            <label className="is_required" htmlFor="">Email</label>
                            <input type="email" name="email" placeholder="Correo electrónico" {...register('email', {
                                required: {
                                    value: true,
                                    message: "Email es requerido."
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email ingresado no es válido."
                                }
                            })} />
                        </div>
                        <div className="input-group">
                            <label className="is_required" htmlFor="">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="Contraseña" {...register("password", {
                                required: {
                                    value: true,
                                    message: "Contraseña es requerida."
                                },
                                minLength: {
                                    value: 4,
                                    message: "Contraseña debe tener al menos 4 caracteres."
                                }
                            })} />
                            {errors.password && <span className="span-form-error">{errors.password.message}</span>}
                        </div>
                    </form>
                    <button onClick={onSubmit}>Iniciar Sesión</button>
                </>
            )}
            {step === 'register' && (
                                    <form onSubmit={onSubmit} className="complete-signup-form">
                        <h2>Completa tus Datos</h2>
                        <div className="input-group">
                            <label className="is_required" htmlFor="name">Nombre</label>
                            <input type="text" name="name" id="name" placeholder="Nombre" 
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Nombre es requerido."
                                },
                                minLength: {
                                    value: 2,
                                    message: "Nombre debe tener al menos 2 caracteres."
                                }
                            })} />
                        {errors.name && <span className="span-form-error">{errors.name.message}</span>}
                        </div>
                        <div className="input-group">
                            <label className="is_required" htmlFor="lastName">Apellido</label>
                            <input type="text" name="lastName" id="lastName" placeholder="Apellido" 
                            {...register("lastName", {
                                required: {
                                    value: true,
                                    message: "Apellido es requerido."
                                },
                                minLength: {
                                    value: 2,
                                    message: "Apellido debe tener al menos 2 caracteres."
                                }
                            })} />
                            {errors.lastName && <span className="span-form-error">{errors.lastName.message}</span>}
                        </div>
                        <div className="input-group">
                            <label className="is_required" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="example@example.com" 
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email es requerido."
                                },
                                minLength: {
                                    value: 2,
                                    message: "Email ingresado no es válido."
                                }
                            })} />
                            {errors.email && <span className="span-form-error">{errors.email.message}</span>}
                        </div>
                        <div className="input-group">
                            <label className="is_required" htmlFor="password">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="Contraseña" {...register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida"
                                },
                                minLength: {
                                    value: 4,
                                    message: "La contraseña debe tener al menos 4 caracteres."
                            }
                        })}/>
                        {errors.password && <span className="span-form-error">{errors.password.message}</span>}
                        </div>
        
                        <div className="input-group">
                            <label className="is_required" htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar Contraseña" {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "La contraseña es requerida"
                            },
                            validate: (value) => {
                                if (value === watch('password')) {
                                    return true
                                } else {
                                    return "Las contraseñas deben coincidir."
                                }
                            }
                        })}/>
                        {errors.confirmPassword && <span className="span-form-error">{errors.confirmPassword.message}</span>}
                        </div>
                        <input className="complete-signup-form-submit-btn" type="submit" value="Registrarme" />
                    </form>
            )}
            
        </>
    )
}