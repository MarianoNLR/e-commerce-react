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
            const localStorageUser = window.localStorage.getItem('user')
            const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`))
            
            if (cookieExists || localStorageUser) {
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
            const data = await authenticateUser(credentials)
            console.log(data)
            setUser(data.user)
            window.localStorage.setItem('user', JSON.stringify(data))
            return data
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            await logoutUser()
            setUser(null)
            window.localStorage.removeItem('user')
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