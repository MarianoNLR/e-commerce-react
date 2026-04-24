import { useState } from "react"
import PropTypes from 'prop-types'
import './SignUpForm.css'
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage"
import { redirect, useNavigate } from "react-router-dom"
import api from "../../api.js"
import { useForm } from "react-hook-form"

export function SignUpForm (props) {
    const {register, 
        handleSubmit,
        formState: {errors},
        watch
       } = useForm() 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formMessage, setFormMessage] = useState("")
    const navigate = useNavigate()
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    // const handleSubmitLogin = async (e) => {
    //     e.preventDefault()
    //     if (username === '') {
    //         setFormMessage('Debes ingresar un nombre de usuario!')
    //         return
    //     }

    //     if (password === '') {
    //         setFormMessage('Debes ingresar una contraseña!')
    //         return
    //     }

    //     if (confirmPassword === '') {
    //         setFormMessage('Debes confirmar la contraseña!')
    //         return
    //     }

    //     if (password !== confirmPassword) {
    //         setFormMessage('Las contraseña deben coincidir!')
    //         return
    //     }
        
    //     try {
    //         //await login({username, password})
    //         api.post('/users/register', {
    //             username,
    //             password,
    //             confirmPassword
    //         })
    //         console.log('Sesion Iniciada! Supuestamente.')
    //         navigate(0)
    //     } catch (error) {
    //         console.error('Error: ', error)
    //     }
        
    // }

    const handleGoogleLogin = () => {
        const popup = window.open(
            'http://localhost:3000/users/google?state=signup',
            "googleLogin",
            "width=500,height=600"
        )

        window.addEventListener('message', (event) => {
            if (event.origin !== 'http://localhost:3000') {
                return
            }
            const { tempToken, email } = event.data;
            props.setTempToken(tempToken);
            props.setEmail(email);
            popup.close();
        })
    }



    const onSubmit = handleSubmit((data) => {
        try {
            api.post('/users/register', {
                data
            }).then(res => {
                console.log('response', res)
                if (res.success && res.data.tempToken) {
                    console.log(res)
                }
                // navigate(0)
            }).catch(err => console.error(err))
            
        } catch (error) {
            console.error('Error: ', error)
        }
    })
    return (
        <>
            <form onSubmit={onSubmit} className="signup-form">
                <h2>Registro</h2>
                <div className="input-group">
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
                <input type="password" name="password" id="password" placeholder="Contraseña" {...register("password", {
                    required: {
                        value: true,
                        message: "La contraseña es requerida"
                    },
                    minLength: {
                        value: 4,
                        message: "La contraseña debe tener al menos 4caracteres."
                    }
                })}/>
                {errors.password && <span className="span-form-error">{errors.password.message}</span>}
                </div>

                <div className="input-group">
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
                <FormErrorMessage message={formMessage}></FormErrorMessage>
                <input type="submit" value="Registrarme" />
                <div className="link-register-wrapper">
                    <p>Ya tienes una cuenta?</p>
                    <a href="#" onClick={() => props.setShowLoginForm(true)}>Iniciar Sesión</a>
                </div>
                <div className="gmail-login">
                    <button onClick={() => {handleGoogleLogin()}} type="button">Iniciar sesión con Google</button>
                </div>
            </form>
        </>
    )
}

SignUpForm.propTypes = {
    setShowLoginForm: PropTypes.func
}