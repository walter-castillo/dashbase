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
                    ...state,
                    isLoading: true,
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


            case types.auth.onToken:
                return {
                    ...state,
                    isLogged: true,
                    user: action.payload.user,
                    token: action.payload.token,
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
                     ...state,
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