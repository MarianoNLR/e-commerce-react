import { useState } from "react"
import {EmailForm } from "./SignInForms/EmailForm/EmailForm.jsx"
import{ GoogleForm } from "./SignInForms/GoogleForm/GoogleForm.jsx"
import axios from "axios"
import './SignIn.css'
import { useAuthModal } from "../../hooks/useAuthModal.jsx"
import { useAuth } from "../../hooks/useAuth.jsx"

export function SignIn (props) {
    const { closeModal } = useAuthModal()
    const [method, setMethod] = useState(null)
    const [googleTempData, setGoogleTempData] = useState(null)
    const { fetchUser } = useAuth()
    const handleSelectMethod = async (selectedMethod) => {
        if (selectedMethod === "google") {
            try {
                handleGoogleLogin()
            } catch (error) {
                console.error("Error fetching Google OAuth URL:", error)
            }
        } else if (selectedMethod === "email") {
            setMethod("email")
        }
    }

    const handleGoogleLogin = () => {
        const popup = window.open(
            'http://localhost:3000/users/google?state=signup',
            "googleLogin",
            "width=500,height=600"
        )

        window.addEventListener('message', async (event) => {
            if (event.origin !== 'http://localhost:3000') {
                return
            }
            const { token, email, isNewUser } = event.data;

            if (isNewUser) {
                setGoogleTempData({ token, email, isNewUser })
                setMethod("google")
            } else {
                window.localStorage.setItem('access_token', JSON.stringify(token))
                await fetchUser()
                closeModal()
            }
            popup.close()
        })
    }

    return (
        <div className="signin-popup">
            <div className="signin-popup-container">
                <button className="signin-popup-close-button" onClick={closeModal}>X</button>
                {!method && (
                    <>
                        <div className="signin-popup-header">
                            <h2>Elige una opción para Iniciar Sesión</h2>
                        </div>
                        <div className="signin-popup-body">
                            <button onClick={() => handleSelectMethod("email")}>Continuar con Correo</button>
                            <button onClick={() => handleSelectMethod("google")}>Continuar con Google</button>
                        </div>
                    </>
                )}
                {method === "email" && (
                    <EmailForm onBack={() => setMethod(null)} />
                )}

                {method === "google" && (
                    <GoogleForm
                        googleTempData={googleTempData}
                        onBack={() => setMethod(null)}
                    />
                )}
            </div>
        </div>
    )
}