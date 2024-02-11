import axios from 'axios';
const baseURL =  import.meta.env.VITE_URL
const  token =  import.meta.env.VITE_TOKEN_NAME


export const dashAxios = axios.create({
    baseURL,
    timeout: 5000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWM2NzcwOWE3NTI4MGQ1YmEyMTNiZWMiLCJpYXQiOjE3MDc1MDU1NTUsImV4cCI6MTczOTA2MzE1NX0.HwGy4zXiWanGsZNon5PtkLF89jm8ktVR91YLmBccp8o',
        // bearer: localStorage.getItem(token),
    }
    return  config;
});
