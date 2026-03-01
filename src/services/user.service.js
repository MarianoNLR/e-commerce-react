import api from "../api.js"

export const emailCheck = async (email) => {
    const response = await api.post('/users/email-check', { email });
    console.log('emailCheck response', response);
    return response;
}

export const getMe = async () => {
    const response = await api.get('/users/me');
    console.log('getMe response', response);
    return response;
}