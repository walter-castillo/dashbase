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
        bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWY2NTdmMGYzOWMwNzk1ODljYzcxZTciLCJpYXQiOjE3MTA2NDMyNDcsImV4cCI6MTc0MjIwMDg0N30.WpeQ8V1t7ngIfOcV-FzCbfuRC1PHy0MUQDZ9t4pe6NY',
        // bearer: localStorage.getItem(token),
    }
    return  config;
});
