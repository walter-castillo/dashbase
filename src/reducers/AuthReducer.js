import { types } from "../types/types";

export const AuthReducer = (state={}, action ) => {

        switch (action.type) {
            case types.auth.onRegister:
                return {
                    ...state,
                    success: "Usuario registrado con exito",
                    error: null                 
                };

            case types.auth.onLogin:
                return {
                    user: action.payload.user,
                    isLogged: true,
                    token: action.payload.token,
                    success: 'Usuario logueado con éxito',  
                };

            case types.auth.onLogout:
                return {
                    user: null, 
                    isLogged: false,
                    token: '',
                    success: 'Sesion cerrada correctamente',
                    error: null
                };

            case types.auth.userAuth:
                return {};

            case types.auth.onToken:
                return {
                    ...state,
                    isLogged: true,
                    user: action.payload.user,
                    token: action.payload.token,
                    loading: false,
                };

            case types.auth.startLoading:
                return {
                    ...state,
                    isLoading: true
                };

            case types.auth.stopLoading:
                return {
                    ...state,
                    isLoading: false,
                };
            
            case types.auth.error:
                 return {
                    error: action.payload.error
                };
        
            case types.auth.resetAuthContext:
                return {
                    user: null, 
                    isLogged: false,
                    token: '',
                    success: null,
                    error: null,
                    isLoading: false,
                }

            default:
            return state;
        }

}