import { useState } from "react"
import { useAuth } from "../../components/AuthProvider.jsx"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import './LoginForm.css'
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage.jsx"

export function LoginForm (props) {
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

    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        if (username === '') {
            setFormMessage('Debes ingresar un nombre de usuario!')
            return
        }

        if (password === '') {
            setFormMessage('Debes ingresar una contraseña!')
            return
        }
        
        try {
            await login({username, password})
            navigate('/')
        } catch (error) {
            if (error?.response.status === 401) {
                setFormMessage('Nombre de usuario o contraseña incorrecto.')
            }
        }
        
    }
    return (
        <>
            <form onSubmit={handleSubmitLogin} className="login-form">
                <h2>Inicio de Sesión</h2>
                <input type="text" name="username" id="username" placeholder="Usuario" onChange={(e) => onChangeUsername(e)}/>
                <input type="password" name="password" id="password" placeholder="Contraseña" onChange={(e) => onChangePassword(e)} />
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