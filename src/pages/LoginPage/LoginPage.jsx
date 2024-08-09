import { useState } from "react"
import { LoginForm } from "../../components/LoginForm/LoginForm.jsx"
import { SignUpForm } from "../../components/SignUpForm/SignUpForm.jsx"
import './LoginPage.css'
export function LoginPage () {
    const [showLoginForm, setShowLoginForm] = useState(true)

    return (
        <>
            <main>
                <div className={`form-wrapper ${showLoginForm ? 'login-active' : 'register-active'}`}>
                    {showLoginForm ? 
                    <LoginForm setShowLoginForm={setShowLoginForm}></LoginForm>
                    : 
                    <SignUpForm setShowLoginForm={setShowLoginForm}></SignUpForm>
                    }
                </div>
            </main>
        </>
    )
}