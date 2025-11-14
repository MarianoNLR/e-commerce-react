import React, {createContext, useState, useContext, useEffect} from "react";
import { authenticateUser, getUserFromToken, logoutUser } from "../utils/authUserService.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    const fetchUser = async () => {
        const res = await getUserFromToken()
        if (res && res.data.user) {
            setUser(res.data.user)
        }
        setLoadingUser(false)
        }

    useEffect(() => {
        // fetchUser()
        const checkCookieAndFetchUser = () => {
            const cookieName = "access_token"
            const localStorageUser = window.localStorage.getItem('access_token') ? JSON.parse(window.localStorage.getItem('access_token')) : null
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
            const res = await authenticateUser(credentials)
            fetchUser()
            window.localStorage.setItem('access_token', JSON.stringify(res.data.token))
            return res
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            await logoutUser()
            setUser(null)
            window.localStorage.removeItem('access_token')
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return (
        <AuthContext.Provider value={{user, fetchUser, loadingUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}