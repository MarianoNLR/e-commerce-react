import { createContext, useState } from 'react'
import { AuthModalContext } from '../contexts/AuthModalContext.jsx'
import { SignIn } from '../components/SignIn/SignIn.jsx'

export function AuthModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <AuthModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {isOpen && <SignIn />}
            {children}
            
        </AuthModalContext.Provider>
    )
}