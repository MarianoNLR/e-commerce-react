import { useState, useEffect } from "react"
import { LoginForm } from "../../components/LoginForm/LoginForm.jsx"
import { SignUpForm } from "../../components/SignUpForm/SignUpForm.jsx"
import './LoginPage.css'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../components/AuthProvider.jsx"
import { useLocation } from "react-router-dom";

export function LoginPage () {
    const [showLoginForm, setShowLoginForm] = useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (user) {
          navigate('/')
        }
      }, [user, navigate])

    return (
        <>
            <main>  
                <div className={`form-wrapper ${showLoginForm ? 'login-active' : 'register-active'}`}>
                    {showLoginForm ? 
                    <LoginForm setShowLoginForm={setShowLoginForm} location={location}></LoginForm>
                    : 
                    <SignUpForm setShowLoginForm={setShowLoginForm}></SignUpForm>
                    }
                </div>
            </main>
        </>
    )
}