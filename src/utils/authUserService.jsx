import api from '../api.js'

export const authenticateUser = async (credentials) => {
    try {
        const res = await api.post('/users/login', credentials)
        console.log("Auth user: ", res)
        return res
    } catch (error) {
        console.error('Authentication failed: ', error)
        throw error
    }
}

export const getUserFromToken = async () => {
    try {
        const res = await api.get('/users/me')
        console.log('User fetched from token: ', res)
        return res
    } catch (error) {
        console.error('An error has ocurred while obtaining your token: ', error)
        return null
    }
}

export const logoutUser = async () => {
    try {
        return await api.post('users/logout')
    } catch (error) {
        console.error('We could not close your session.')
    }
}