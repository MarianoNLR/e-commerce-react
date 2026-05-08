import { useState, useEffect} from "react";
import { login as authServiceLogin, getUserFromToken, logout as logoutUser, registerUser } from "../services/auth.service.js";

export function useAuthLogic() {
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
            const localStorageUser = window.localStorage.getItem('access_token') ? window.localStorage.getItem('access_token') : null
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
            const res = await authServiceLogin(credentials)
            console.log("Login response: ", res)
            //fetchUser()
            window.localStorage.setItem('access_token', res.data)
            fetchUser()
            return res
        } catch (error) {
            throw error
        }
    }

    const register = async (userInfo) => {
        const res = await registerUser(userInfo)
        if (res.success) {
            window.localStorage.setItem('access_token', res.data.accessToken)
            fetchUser()
        }
        return res
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

    return { user, fetchUser, loadingUser, login, logout, registerNewUser: register }
}