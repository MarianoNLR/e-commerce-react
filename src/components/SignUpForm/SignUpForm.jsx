import { useState } from "react"
import PropTypes from 'prop-types'
import './SignUpForm.css'
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage"
import { useNavigate } from "react-router-dom"
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

    const onSubmit = handleSubmit((data) => {
        try {
            api.post('/users/register', {
                data
            }).then(res => {
                navigate(0)
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
                <input type="text" name="username" id="username" placeholder="Usuario" 
                {...register("username", {
                    required: {
                        value: true,
                        message: "Usuario es requerido."
                    },
                    minLength: {
                        value: 2,
                        message: "Usuario deber tener al menos 2 caracteres."
                    }
                })} />
                {errors.username && <span className="span-form-error">{errors.username.message}</span>}
                </div>
                <div className="input-group">
                <input type="password" name="password" id="password" placeholder="Contraseña" {...register("password", {
                    required: {
                        value: true,
                        message: "La contraseña es requerida"
                    },
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres."
                    }
                })}/>
                {errors.password && <span className="span-form-error">{errors.password.message}</span>}
                </div>

                <div className="input-group">
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Contraseña" {...register("confirmPassword", {
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
            </form>
        </>
    )
}

SignUpForm.propTypes = {
    setShowLoginForm: PropTypes.func
}