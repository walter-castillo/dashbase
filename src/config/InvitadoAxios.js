import axios from 'axios';
const baseURL =  import.meta.env.VITE_URL

export const InvitadoAxios = axios.create({
  baseURL: `${baseURL}share`,
  timeout: 0,
});

