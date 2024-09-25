import { useState } from "react"
import { useAuth } from "../../components/AuthProvider.jsx"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import './LoginForm.css'
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage.jsx"
import { useForm } from "react-hook-form"

export function LoginForm (props) {
    const {register, handleSubmit,
         formState: {errors}
        } = useForm()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formMessage, setFormMessage] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()
    
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
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
        
    //     try {
    //         await login({username, password})
    //         navigate('/')
    //     } catch (error) {
    //         if (error?.response.status === 401) {
    //             setFormMessage('Nombre de usuario o contraseña incorrecto.')
    //         }
    //     }
        
    // }

    const onSubmit = handleSubmit(async (data) => {
        try {
            await login(data)
            navigate('/')
        } catch (error) {
            if (error?.response.status === 401) {
                setFormMessage('Nombre de usuario o contraseña incorrecto.')
            }
        }
    })
    return (
        <>
            <form onSubmit={onSubmit} className="login-form">
                <h2>Inicio de Sesión</h2>
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
                        value: 4,
                        message: "La contraseña debe tener al menos 6 caracteres."
                    }
                })}/>
                {errors.password && <span className="span-form-error">{errors.password.message}</span>}
                </div>
                <input type="submit" value="Inciar Sesion" />
                <FormErrorMessage message={formMessage}></FormErrorMessage>
                <a href="#">Olvidaste tu contraseña?</a>
                <div className="link-register-wrapper">
                    <p>No tienes una cuenta aún?</p>
                    <a href="#" onClick={() => props.setShowLoginForm(false)}>Registrarme</a>
                </div>
            </form>
        </>
    )
}


LoginForm.propTypes = {
    setShowLoginForm: PropTypes.func
}