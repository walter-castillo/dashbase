// ============================================================================
// 📌 Configuración base
// ============================================================================

import axios from "axios";

const baseURL = import.meta.env.VITE_URL_API;
const tokenName = import.meta.env.VITE_TOKEN_NAME; // Token principal
const tokenGuest = import.meta.env.VITE_TOKEN_GUEST; // Token invitado

// ============================================================================
// 🟦 Cliente: Dashboard (Admin / Usuario normal)
// ============================================================================

export const dashAxios = axios.create({
  baseURL,
  timeout: 0,
});

// Interceptor de cabecera con token de localStorage
dashAxios.interceptors.request.use((config) => {
  // console.log('Solicitando a:', `${config.baseURL}${config.url}`);

  config.headers = {
    ...config.headers,
    // bearer: 'token-hardcodeado-para-testing...

    bearer: localStorage.getItem(tokenName),
  };

  return config;
});

// ============================================================================
// 🟩 Cliente: Invitado / Compartido (token temporal)
// ============================================================================

export const InvitadoAxios = axios.create({
  baseURL: `${baseURL}share`,
  timeout: 0,
});

// Interceptor para agregar token de sesión
InvitadoAxios.interceptors.request.use(
  (config) => {
    const guestToken = sessionStorage.getItem(tokenGuest);

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
      sessionStorage.removeItem(tokenGuest);
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// 🟧 Cliente: Paciente (usa cookies / sesiones HTTP Only)
// ============================================================================

export const PatientAxios = axios.create({
  baseURL: `${baseURL}patient`,
  timeout: 0,
  withCredentials: true,
});

// Interceptor opcional (lo dejo comentado como pediste)

// PatientAxios.interceptors.request.use((config) => {
//
//   /*   config.headers = {
//         ...config.headers,
//         // bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//         bearer: localStorage.getItem(token),
//     } */
//
//   return config;
// });

// ============================================================================
// ✔️ Fin del archivo unificado
// ============================================================================
