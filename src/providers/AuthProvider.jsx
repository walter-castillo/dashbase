import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/DashRcAxios";

const  token =  import.meta.env.VITE_TOKEN_NAME

const initialState = {
  user: null, 
  isLogged: false,
  token: '',
  success: null,
  error: [],
  isLoading: false,

}
 
export const AuthProvider = ({ children }) =>  {

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const register = async (dataUserRegister) =>  {
        try {
            dispatch({ type: types.auth.startLoading });
            const {data} = await dashAxios.post('user/', dataUserRegister);
            // console.log(data.user)
           return dispatch({type: types.auth.onRegister});

        } catch (error) {
            return dispatch({
                type: types.auth.error,
                payload: { error: error.response.data.errors},
            })

        } finally { dispatch({ type: types.auth.stopLoading }) }            
    }
    
    const login = async (dataUserLogin) =>  {

        dispatch({ type: types.auth.startLoading })        
        try {
            const { data } = await dashAxios.post('auth/login', dataUserLogin);
             localStorage.setItem(token, data.token);
    
           dispatch({
                type:  types.auth.onLogin,
                payload:  {
                    user: data.user,
                    token: data.token
                }
            });
        } catch (error) {  
           return dispatch({
                type: types.auth.error,
                payload: { error: error.response.data.errors},
            })
        }finally { dispatch({ type: types.auth.stopLoading }) }         
    }
    
    
    const logout = () => {
        dispatch({ type: types.auth.startLoading });
        storage.removeItem(token);
        dispatch({ type: types.auth.onLogout });
        dispatch({ type: types.auth.stopLoading }); 
    }


    const checkAuthToken = async () => {

        try {
            const token = localStorage.getItem('tokenRc');
            if(!token){ return dispatch({type: types.auth.onLogout})}

            const { data } = await dashAxios.get('auth//token/user');
            localStorage.setItem('tokenRc', data.res.token);

            dispatch({
                type:  types.auth.onLogin,
                payload: {
                    user: data.res
                }
            });
            
        } catch (error) {
            localStorage.clear();
            dispatch({
                type: types.auth.onLogout,
                payload: {
                    errorMessage: ''
                }
            });
        }
    }

   

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