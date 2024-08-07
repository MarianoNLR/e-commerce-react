import { useState } from "react"
import axios from "axios"
import { useAuth } from "../../components/AuthProvider.jsx"

export function LoginPage () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()
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
        } catch (error) {
            console.error('Error: ', error)
        }
        
    }

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmitLogin} className="form">
                <input type="text" name="username" id="username" onChange={(e) => onChangeUsername(e)}/>
                <input type="password" name="password" id="password" onChange={(e) => onChangePassword(e)} />
                <input type="submit" value="Login" />
            </form>
        </>
    )
}