import axios from 'axios';
const baseURL =  import.meta.env.VITE_URL


export const dashAxios = axios.create({
    baseURL,
    timeout: 12000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('tokenRc'),
    }
    return  config;
});
