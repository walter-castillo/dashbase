import axios from 'axios';
const baseURL =  import.meta.env.VITE_URL
const  token =  import.meta.env.VITE_TOKEN_NAME

export const PatientAxios = axios.create({
    baseURL: `${baseURL}patient`,
    timeout: 3000,
    withCredentials: true, 
});

// dashAxios.interceptors.request.use( config  => {

//   /*   config.headers = {
//         ...config.headers,
//         // bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2Nzc3ZTViMDdkODIxOThmYzQ0ZjE3ODQiLCJpYXQiOjE3NDMyNzU0MTIsImV4cCI6MTc3NDgzMzAxMn0.3ZmunB2Z569KFoEbNd8hB33N704ehFzgqeonX86QaXs',
//         bearer: localStorage.getItem(token),
//     } */
//     return  config;
// });
 