import axios from 'axios'

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

//en todas las llamadas de este servicio, vamos a buscar el Token e incluirlo
service.interceptors.request.use((config) => {
    //1. buscar el tojen en localStorage de forma manual
    const authToken = localStorage.getItem("authToken")

    const tokenFull = `Bearer ${authToken}`
    //2. anexar el token a la solicitud
    if (authToken) {
        //el token viene por req.headers
        config.headers.authorization = tokenFull
    }
    return config

})

export default service