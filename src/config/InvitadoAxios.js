import axios from "axios";
const baseURL = import.meta.env.VITE_URL;

export const InvitadoAxios = axios.create({
  baseURL: `${baseURL}share`,
  timeout: 0, 
});

// Interceptor para agregar el token a cada request
InvitadoAxios.interceptors.request.use(
  (config) => {
    const guestToken = sessionStorage.getItem("guestToken");
    if (guestToken) {
      // Se puede enviar como header o query, recomiendo header
      config.headers["bearer"] = guestToken;
      // Si Orthanc o tu middleware lo espera en query:
      // config.params = { ...(config.params || {}), token };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
InvitadoAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token de invitado inválido o expirado.");
      sessionStorage.removeItem("guestToken");
    }
    return Promise.reject(error);
  }
);
