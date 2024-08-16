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

        const checkCookieAndFetchUser = () => {
            const cookieName = "access_token"
            const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`))
            
            if (cookieExists) {
                fetchUser()
            } else {
                setLoadingUser(false)
            }
        };
    
        checkCookieAndFetchUser();
    }, [])

    const login = async (credentials) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const user = await authenticateUser(credentials)
            setUser(user)
            return user
        } catch (error) {
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