import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/DashRcAxios";

const initialState = {
  user: {}, 
  isLogged: false,
  isLoading: false,
  token: '',
  success: [],
  error: [],
  users: [],

}
 



export const AuthProvider = ({ children }) =>  {

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);
    // const [isLoading, setIsLoading] = useState(true);

 const register = async (dataUserRegister) =>  {
        /* try {
  
            const {data} = await dashAxios.post('user/', dataUserRegister);
               console.log(data.user);
            dispatch({
                type:  types.auth.onRegister,
                payload: data.user,
            });

        } catch (error) {
            
             console.error(error.response.data);
            dispatch({
                type: types.auth.onRegister,
                payload: error
            })
        } */
        try {
  
            const {data} = await dashAxios.post('user/', dataUserRegister);
                 return  dispatch({
            type: types.auth.onRegister,
            payload:  {
                
                          user: data.user
            },
        });

        } catch (errors) {
            console.log('desde catch', errors.response.data)
           return dispatch({
                type: types.auth.error,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No Existen usuarios en el sistema',
                    error: errors.response.data.errors
                }
            })
        };
      /*   try {
  
            const {data} = await dashAxios.post('user/', dataUserRegister);
                 return  dispatch({
            type: types.auth.onRegister,
            payload:  {
                          user: data.user
            },
        });

        } catch (errors) {
            console.log('desde catch', errors.response.data)
           return dispatch({
                type: types.auth.onRegister,
                payload: {
                    ...state,
                    user:null,
                    messageStatus: 'ERROR',
                    msg: 'No Existen usuarios en el sistema',
                    errors
                }
            })
        }; */
         
        
    }
    
    const login = async (email,  password) =>  {

    /*     try {
            const { data } = await dashAxios.post('auth/login', {
                email,
                password
            });

            localStorage.setItem('tokenRc', data.res.token);
    
            dispatch({
                type:  types.auth.onLogin,
                payload:  {
                    user: data.res
                }
            });
        } catch (error) {
            const { data }  = error.response
            
            dispatch({
                type: types.auth.onLogout,
                payload: {
                    errorMessage: data.msg
                }
            })
        } */
    }
    
    
    const logout = () => {
        
       /*  localStorage.clear();

        dispatch({
            type: types.auth.onLogout,
            payload: {
                errorMessage: ''
            }
        }); */
    }


    const checkAuthToken = async () => {

     /*    try {
            const token = localStorage.getItem('tokenRc');
            if(!token){
                return dispatch({
                    type: types.auth.onLogout,
                    payload: {
                        errorMessage: ''
                    }
                });
            }

            const { data } = await dashAxios.get('auth/user/review/token');
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
        } */
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
        </AuthContext.Provider>
    )
}