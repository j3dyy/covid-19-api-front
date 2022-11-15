import axiosInstance from './api'

const setup = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = JSON.parse(localStorage.getItem('user'))
            if (token){
                config.headers['Authorization'] = `Bearer ${token.token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    );

    axiosInstance.interceptors.response.use(
        (res)   => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config

            if (originalConfig.url !== "/login"  && err.response){
                if (err.response.status === 401 && !originalConfig._retry){
                    originalConfig._retry = true
                    try {
                        localStorage.removeItem('user')
                        document.location = '/login'
                        return axiosInstance(originalConfig)
                    }catch (_error){
                        return Promise.reject(_error)
                    }
                }
            }
            return  Promise.reject(err)
        }
    )
}

export default setup;