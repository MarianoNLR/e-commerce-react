import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("asdasdasd", error)
        if (
            error.response.status === 401 &&
            error.response.data.code === 'ACCESS_TOKEN_EXPIRED' &&
            !originalRequest._retry
        ) {
            try {
                originalRequest._retry = true;
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {}, { withCredentials: true });
                console.log("Refresh token response: ", res);
                window.localStorage.setItem('access_token', res.data.accessToken);
                api.defaults.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
                return api(originalRequest);
            } catch (err) {
                window.localStorage.removeItem('access_token');
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)

api.interceptors.request.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(originalRequest)
        if (error.response.status === 401 &&
            
            !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const res = await api.post("/auth/refresh-token", {}, { withCredentials: true });
                    console.log("Refresh token response: ", res);
                    window.localStorage.setItem('access_token', res.data.accessToken);
                    api.defaults.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
                    return api(originalRequest);
                } catch (err) {
                    window.localStorage.removeItem('access_token');
                    return Promise.reject(err);
                }
        }
        return Promise.reject(error);
    }
    // (config) => {
    //     const token = window.localStorage.getItem('access_token')
    //     if (!token) return config
    //     config.headers.Authorization = `Bearer ${token}`

    //     return config
    // },
    // (error) => {
    //     localStorage.removeItem('access_token')
    //     return Promise.reject(error)
    // }
);

export default api