import { types } from "../types/types";


export const AuthReducer = (state={}, action ) => {

        switch (action.type) {

            case types.auth.onLogin:
                return {
                    ...state,
                    user: action.payload.user,
                    isLogged: true,
                    errorMessage: '',
                    isLoading: false
                };

            case types.auth.onRegister:
                return {
                    user:action.payload.user,
                };

            case types.auth.onLogout:
                return {
                    ...state,
                    user: null,
                    isLogged: false,
                    errorMessage: action.payload.errorMessage,
                    isLoading: false
                };

            case types.auth.userAuth:
                return {};

            case types.auth.onToken:
                return {
                    ...state,
                    token: action.payload
                };

            case types.auth.loading:
                return {};
            
            case types.auth.error:
                 return {
                    messageStatus: 'ERROR',
                    msg: 'No Existen usuarios en el sistema',
                    error: action.payload.error
                };
        
            case types.auth.success:
                return {};

                default:
                return state;
        }

}