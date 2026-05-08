import api from "../api.js";

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    console.log("Login: ", response.data)
    return response;
};

export const getUserFromToken = async () => {
    try {
        const res = await api.get('/users/me')
        return res
    } catch (error) {
        console.error('An error has ocurred while obtaining your token: ', error)
        return null
    }
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const registerUser = async (userInfo) => {
    const response = await api.post('/auth/register', userInfo);
    return response;
};

export const loginWithGoogle = async (googleToken) => {
    const response = await api.post('/auth/google', { token: googleToken });
    return response.data;
};