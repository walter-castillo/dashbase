import axios from 'axios';
const baseURL =  import.meta.env.VITE_URL
const  token =  import.meta.env.VITE_TOKEN_NAME


export const dashAxios = axios.create({
    baseURL,
    timeout: 12000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        bearer: localStorage.getItem(token),
    }
    return  config;
});
