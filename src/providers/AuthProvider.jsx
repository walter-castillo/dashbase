import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/DashRcAxios";

const  tokenName =  import.meta.env.VITE_TOKEN_NAME

const initialState = {
  user: null, 
  isLogged: false,
  token: '',
  success: null,
  error: null,
  isLoading: false,
}
 

export const AuthProvider = ({ children }) =>  {

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);
   
    const register = async (dataUserRegister) =>  {
        try {
            dispatch({ type: types.auth.startLoading });
            const {data} = await dashAxios.post('user/', dataUserRegister);
            dispatch({type: types.auth.onRegister});

            successClear();

        } catch (error) {
            dispatch({
                type: types.auth.error,
                payload: { error: error.response.data.errors},
            })

            errorsClear()

        } finally { dispatch({ type: types.auth.stopLoading }) }            
    };
    
    const login = async (dataUserLogin) =>  {

        dispatch({ type: types.auth.startLoading })        
        try {
            const { data } = await dashAxios.post('auth/login', dataUserLogin);
            localStorage.setItem(tokenName, data.token);
            dispatch({
                type:  types.auth.onLogin,
                payload:  {
                    user: data.user,
                    token: data.token
                }
            });

            successClear();

        } catch (error) {  
            dispatch({
                type: types.auth.error,
                payload: { error: error.response.data.errors},
            })

            errorsClear()
            
        }finally { dispatch({ type: types.auth.stopLoading }) }         
    };
    
    const logout = () => {
        dispatch({ type: types.auth.startLoading });
        localStorage.removeItem(tokenName);
        dispatch({ type: types.auth.onLogout });
        dispatch({ type: types.auth.stopLoading }); 
        successClear()
    };

    const checkAuthToken = async () => {
        try {
            const token = localStorage.getItem(tokenName);
            if(!token){ return dispatch({type: types.auth.onLogout})}

            const { data } = await dashAxios.get('auth/token/user');
            localStorage.setItem(tokenName, data.res.token);

            dispatch({
                type:  types.auth.onLogin,
                payload: { user: data.res }
            });
            
        } catch (error) {
            localStorage.clear();
            dispatch({
                type: types.auth.onLogout,
                payload: {  errorMessage: '' }
            });
        }
    };

    const errorsClear = () => {
        return setTimeout(() => {
            dispatch({ 
                type: types.auth.error, 
                payload: { error: null } 
            });
        }, 3000);
    };

    const successClear = () => {
        return setTimeout(() => {
            dispatch({ 
                type: types.auth.success, 
                payload: { success: null } 
            });
        }, 3000);
    };

    return (
        <AuthContext.Provider value={{
            state,
            login,
            logout,
            checkAuthToken,
            register
        }}>
            { children }
        </ AuthContext.Provider>
    )
}