import { useState } from "react"
import {EmailForm } from "./SignInForms/EmailForm/EmailForm.jsx"
import{ GoogleForm } from "./SignInForms/GoogleForm.jsx"
import axios from "axios"
import './SignIn.css'
import { useAuthModal } from "../../context/AuthModalContext.jsx"

export function SignIn (props) {
    const { closeModal } = useAuthModal()
    const [method, setMethod] = useState(null)
    const [googleTempData, setGoogleTempData] = useState(null)

    const handleSelectMethod = async (selectedMethod) => {
        if (selectedMethod === "google") {
            try {
                setMethod("google")
                handleGoogleLogin()
            } catch (error) {
                console.error("Error fetching Google OAuth URL:", error)
            }
        } else if (selectedMethod === "email") {
            setMethod("email")
        }
        setMethod(selectedMethod)
    }

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
            if (tempToken) {
                console.log('Received tempToken from Google OAuth:', tempToken);
                // You can now use the tempToken as needed
            }
            props.setTempToken(tempToken);
            props.setEmail(email);
            popup.close();
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