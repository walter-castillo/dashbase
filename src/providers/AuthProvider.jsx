import { useEffect, useReducer, createContext, useContext } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/axiosClients";

const AuthContext = createContext();

const  tokenName =  import.meta.env.VITE_TOKEN_NAME 

const initialState = {
   
  user: null,
  isLogged: false,
  token: '',
  isLoading: false,
  success: null,
  error: null
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
        console.log('desde login');
        dispatch({ type: types.auth.startLoading })        
        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const { data } = await dashAxios.post('auth/login', dataUserLogin);
            localStorage.setItem(tokenName, data.token);
            console.log(data);
            dispatch({
                type:  types.auth.onLogin,
                payload:  {
                    user: data.user,
                    token: data.token
                }
            });

            successClear();
            dispatch({ type: types.auth.stopLoading }) 
        } catch (error) {  
            dispatch({
                type: types.auth.error,
                payload: { error: error?.response.data.errors},
            })
            dispatch({ type: types.auth.stopLoading }) 

            errorsClear()
           
        }
    }
    
    const logout =async () => {
        console.log('desde logout');
        dispatch({ type: types.auth.startLoading });
        localStorage.removeItem(tokenName);
        dispatch({ type: types.auth.onLogout });
        dispatch({ type: types.auth.stopLoading }); 
        successClear()
    };

    const checkAuthToken = async () => {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const tokenlogin= localStorage.getItem(tokenName);

        console.log('desde checkAuthToken');

        if(!tokenlogin){
            dispatch({ type: types.auth.onLogout });
            return;
        }

        try {
            const { data } = await dashAxios.post('auth/token/user');

            localStorage.setItem(tokenName, data.token);
            dispatch({
                type:  types.auth.onToken,
                payload: { 
                    user: data.user,
                    token: data.token
                 }
            });
            
        } catch (error) {  
            localStorage.removeItem(tokenName);
            dispatch({
                type: types.auth.error,
                payload: { error: error.response.data.errors},
            })
            errorsClear()
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

    const resetAuthContext = () => {
        dispatch({ 
            type: types.auth.resetAuthContext,
        });
    }

    useEffect(() => {
    checkAuthToken()
  }, []);

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
        register,
        resetAuthContext
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

