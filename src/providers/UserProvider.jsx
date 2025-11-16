import { useReducer, useState, createContext, useContext } from "react"
import { UserReducer } from "../reducers/UserReducer"
import { dashAxios } from "../config/axiosClients";
import { types } from "../types/types"

const UserContext = createContext();

const initialState = {
    users: null,
    user: null,
    roles: null,
    total: 0,
    isLoading: false,
} 

export const UserProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(UserReducer,  initialState);
    const [isLoading, setIsLoading] = useState(false);


    const getUsers = async (params) =>  {
        const{page, limit, field, operator, value, sort, fieldSort} = params;
        try {        
            // await new Promise(resolve => setTimeout(resolve, 5000));
            
            let url = `user?limit=${limit}&page=${page}`;
            
            if (field && operator && value)  url += `&field=${field}&operator=${operator}&value=${value}`
    
            if (fieldSort && sort) url += `&fieldSort=${fieldSort}&sort=${sort}`
    
            const {data} = await dashAxios.get(url);  
            dispatch({
                type: types.user.getUsers,
                payload:  {
                    users:  data.users,
                    total: data.total
                }
            });
        } catch (error) {errorsUser(error.response.data.errors)
        }finally{ dispatch({type: types.user.stopLoading}) }
    }

    const userById = async (id) => {
        dispatch({ type: types.user.startLoading });
        // await new Promise(resolve => setTimeout(resolve, 500));
        const [rolesResponse, userResponse] = await Promise.all([
            dashAxios.get('role/all'),
            dashAxios.get(`user/${id}`)
        ]);

        const dataRoles = rolesResponse.data.roles;
        const dataUser = userResponse.data.user;

        dispatch({
            type: types.user.userById,
            payload: {
                user: dataUser,
                roles: dataRoles
            }
        });

        dispatch({ type: types.user.stopLoading });      
        return { user: dataUser, roles: dataRoles }; 

    }

    const userUpdate = async (user) => {
        // await new Promise(resolve => setTimeout(resolve, 500));
        const { data } = await dashAxios.put(`user/${user.id}`, user); 
    }
   
    const allRoles = async () => {
        setIsLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 500));
        const { data } = await dashAxios.get('role/all')
            dispatch({
            type: types.user.allRoles,
            payload: {
                ...state,
                roles: data.roles
            }
            });
        setIsLoading(false);
    }

    const userCreate = async (createUser) => {
        setIsLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const { data } = await dashAxios.post('user/', createUser);
        dispatch({ 
            type: types.user.createUser,
            payload:{success: {accion: 'create', msg:"El rol fue creado con exito"}
            } 
        });   
        setIsLoading(false);
    }

    const errorsUser = (errors) => {
        dispatch({ 
            type: types.user.errors, 
            payload: errors
        });

    }

    const resetUserContext = () => {
        dispatch({ 
            type: types.user.resetUserContext
        });
    }

    const contextValue = {
        state,
        isLoading,
        setIsLoading,
        getUsers,
        errorsUser,
        userById,
        userUpdate,
        allRoles,
        userCreate,
        resetUserContext
    }

    return (
        <UserContext.Provider value={contextValue}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => {
  return useContext(UserContext);
};
