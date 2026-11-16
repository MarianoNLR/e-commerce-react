import api from "../api.js";

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    console.log("Login: ", response.data)
    return response;
};

// Throws on failure so the caller can tell an invalid session from a network error.
export const getUserFromToken = async () => {
    return api.get('/users/me')
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