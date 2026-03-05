import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

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
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.code === 'ACCESS_TOKEN_EXPIRED' &&
            !originalRequest._retry
        ) {
            if (originalRequest._retry) return Promise.reject(error);

            // If there's already a token refresh in progress, queue the request
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return api(originalRequest);
                })
            }

            isRefreshing = true;
            try {
                originalRequest._retry = true;
                const res = await api.post('/auth/refresh-token', {}, { withCredentials: true })
                window.localStorage.setItem('access_token', res.data.accessToken);
                api.defaults.headers['Authorization'] = 'Bearer ' + res.data.accessToken;

                // Process the queued requests with the new token
                processQueue(null, res.data.accessToken);
                const response = await api(originalRequest);
                return response;
            } catch (err) {
                processQueue(err, null);
                window.localStorage.removeItem('access_token');
                window.location.href = '/';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
)

export default api