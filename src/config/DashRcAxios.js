import axios from 'axios';
const baseURL =  import.meta.env.VITE_URL
const  token =  import.meta.env.VITE_TOKEN_NAME


export const dashAxios = axios.create({
    baseURL,
    timeout: 3000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWQ3OGE5ZjJmOThmODM0ZDNmNTRhNzIiLCJpYXQiOjE3MDg2MjQ1NjAsImV4cCI6MTc0MDE4MjE2MH0.Kgh7L2d3isW8Xa_1HcmVa-IMdkqR4tu0T0PlBoC4du8',
        // bearer: localStorage.getItem(token),
    }
    return  config;
});
