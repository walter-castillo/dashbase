import { types } from "../types/types";

//  auth: {
//         onRegister: '[AUTH]-REGISTER',


//         onLogin:    '[AUTH]-LOGIN',
//         onLogout:   '[AUTH]-LOGOUT',
//         userAuth:   '[AUTH]-USER AUTH',
//         onToken:    '[AUTH]-TOKEN',
//         startLoading:  '[AUTH]-LOADING',
//         stopLoading:'[AUTH]-STOP LOADING',
//         error:      '[AUTH]-ERROR',
//         success:    '[AUTH]-SUCCESS',
//     },


// const initialState = {
//   user: null, 
//   isLogged: false,
//   token: '',
//   success: null,
//   error: null,
//   isLoading: false,

// }

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
                    success: null,
                    error: null,
                };

            case types.auth.userAuth:
                return {};

            case types.auth.onToken:
                return {
                    ...state,
                    token: action.payload
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
        
            case types.auth.success:
                return {};

            default:
            return state;
        }

}