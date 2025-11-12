import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(window.localStorage.getItem('access_token'))
        if (!token) return config
        config.headers['authorization'] = `Bearer ${token}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default api