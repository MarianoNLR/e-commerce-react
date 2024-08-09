import { useState } from "react"
import { useAuth } from "../../components/AuthProvider.jsx"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import './LoginForm.css'

export function LoginForm (props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
        console.log(username)
        console.log(password)
        
        try {
            await login({username, password})
            console.log('Sesion Iniciada! Supuestamente.')
            navigate('/')
        } catch (error) {
            console.error('Error: ', error)
        }
        
    }
    return (
        <>
            <form onSubmit={handleSubmitLogin} className="login-form">
                <h2>Inicio de Sesión</h2>
                <input type="text" name="username" id="username" placeholder="Usuario" onChange={(e) => onChangeUsername(e)}/>
                <input type="password" name="password" id="password" placeholder="Contraseña" onChange={(e) => onChangePassword(e)} />
                <input type="submit" value="Inciar Sesion" />
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