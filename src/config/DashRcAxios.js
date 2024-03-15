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
        bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NWVlMzFjY2NjOWJkZWRiNDFhNTUxZTAiLCJpYXQiOjE3MTAxMDkyNzEsImV4cCI6MTc0MTY2Njg3MX0.dMwSg70clH1VSnoLpICtqPLJsMaTvSmYGLV08XoQ1uM',
        // bearer: localStorage.getItem(token),
    }
    return  config;
});
