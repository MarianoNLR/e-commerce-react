import React, {createContext, useState, useContext, useEffect} from "react";
import { authenticateUser, getUserFromToken, logoutUser } from "../utils/authUserService.jsx";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserFromToken()
            if (user) {
                setUser(user)
            }
            setLoadingUser(false)
        }
        fetchUser()
    }, [])

    const login = async (credentials) => {
        try {
            const user = await authenticateUser(credentials)
            setUser(user)
            console.log(user)
        } catch (error) {
            console.error('Error in Login: ', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await logoutUser()
            setUser(null)
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return (
        <AuthContext.Provider value={{user, loadingUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)