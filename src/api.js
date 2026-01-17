import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('access_token')
        if (!token) return config
        config.headers.Authorization = `Bearer ${token}`

        return config
    },
    (error) => {
        localStorage.removeItem('access_token')
        return Promise.reject(error)
    }
);

export default api