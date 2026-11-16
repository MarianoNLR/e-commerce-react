import { useState, useEffect} from "react";
import { login as authServiceLogin, getUserFromToken, logout as logoutUser, registerUser } from "../services/auth.service.js";

const USER_KEY = 'user'

// Last user returned by /users/me. Lets the UI render right away while the server wakes up.
const readCachedUser = () => {
    if (!window.localStorage.getItem('access_token')) return null
    try {
        return JSON.parse(window.localStorage.getItem(USER_KEY))
    } catch {
        return null
    }
}

export function useAuthLogic() {
    const [user, setUser] = useState(readCachedUser)
    // Only block the UI when there is no cached user to show.
    const [loadingUser, setLoadingUser] = useState(() => readCachedUser() === null)
    // 'checking' | 'verified' | 'unverified': whether the server confirmed the session.
    // Protected routes rely on this instead of the cached user.
    const [sessionStatus, setSessionStatus] = useState('checking')

    const clearSession = () => {
        setUser(null)
        setSessionStatus('unverified')
        window.localStorage.removeItem(USER_KEY)
        window.localStorage.removeItem('access_token')
    }

    const fetchUser = async () => {
        setSessionStatus('checking')
        try {
            const res = await getUserFromToken()
            const fetchedUser = res?.data?.user
            if (fetchedUser) {
                setUser(fetchedUser)
                setSessionStatus('verified')
                window.localStorage.setItem(USER_KEY, JSON.stringify(fetchedUser))
            } else {
                clearSession()
            }
        } catch (error) {
            console.error('An error has ocurred while obtaining your user: ', error)
            const status = error.response?.status
            if (status === 401 || status === 404) {
                clearSession()
            } else {
                // Server unreachable: keep the cached user for public UI, but don't trust it.
                setSessionStatus('unverified')
            }
        } finally {
            setLoadingUser(false)
        }
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
                setSessionStatus('unverified')
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
            clearSession()
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return { user, fetchUser, loadingUser, sessionStatus, login, logout, registerNewUser: register }
}