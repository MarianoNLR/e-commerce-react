import { useState } from "react"
import PropTypes from 'prop-types'
import './SignUpForm.css'

export function SignUpForm (props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        console.log(username)
        console.log(password)
        console.log(confirmPassword)
        try {
            //await login({username, password})
            console.log('Sesion Iniciada! Supuestamente.')
            //navigate('/')
        } catch (error) {
            console.error('Error: ', error)
        }
        
    }
    return (
        <>
            <form onSubmit={handleSubmitLogin} className="signup-form">
                <h2>Registro</h2>
                <input type="text" name="username" id="username" placeholder="Usuario" onChange={(e) => onChangeUsername(e)}/>
                <input type="password" name="password" id="password" placeholder="Contraseña" onChange={(e) => onChangePassword(e)} />
                <input type="password" name="confirmPassword" id="confirm-password" placeholder="Confirmar Contraseña" onChange={(e) => onChangeConfirmPassword(e)} />
                <input type="submit" value="Inciar Sesion" />
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