import { createContext, useContext, useState } from "react"
import { SignIn } from "../components/SignIn/SignIn.jsx"

const AuthModalContext = createContext()

export function AuthModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <AuthModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
            {isOpen && <SignIn />}
        </AuthModalContext.Provider>
    )
}

export function useAuthModal() {
    return useContext(AuthModalContext)
}