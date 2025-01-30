import { useReducer, createContext, useContext } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/DashRcAxios";
import { useNavigate } from "react-router-dom";




const AuthContext = createContext();

const  tokenName =  import.meta.env.VITE_TOKEN_NAME

const initialState = {
    user: null, 
    isLogged: false,
    token: '',
    success: null,
    error: null,
    isLoading: false,
}

export  const AuthProvider = ({ children }) =>  {
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);
   
    const register = async (dataUserRegister) =>  {
        try {
            dispatch({ type: types.auth.startLoading });
            const {data} = await dashAxios.post('auth/register', dataUserRegister);
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
        const navigate = useNavigate(); 
        try {
            const token = localStorage.getItem(tokenName);
            if(!token){ return dispatch({type: types.auth.onLogout})}

            const { data } = await dashAxios.post('auth/token/user');
            localStorage.setItem(tokenName, data.res.token);

            dispatch({
                type:  types.auth.onToken,
                payload: { user: data.res }
            });
            
        } catch (error) {
            localStorage.clear();
            dispatch({
                type: types.auth.onLogout,
                payload: {  errorMessage: '' }
            });
              navigate('/auth/login');
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


  const contextValue = {
    state,
        // user: state.user,
        // isLogged: state.isLogged,
        // token: state.token,
        // success: state.success,
        // error: state.error,
        login,
        logout,
        checkAuthToken,
        register
    };
 
    return ( 
        <AuthContext.Provider value={contextValue}>
            { children }
        </ AuthContext.Provider>
    )
}


export const useAuth = () => {
  return useContext(AuthContext);
};
