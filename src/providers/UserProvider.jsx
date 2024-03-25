import { useReducer, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { UserReducer } from "../reducers/UserReducer"
import { dashAxios } from "../config/DashRcAxios"
import { types } from "../types/types"


const initialState = {
    isLoading: true,
    users: null,
    user: null,
    roles: null,
    total: 0,

}


export const UserProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(UserReducer,  initialState);


    const getUsers = async (params) =>  {
        const{page, limit, field, operator, value, sort, fieldSort} = params;

        dispatch({type: types.user.startLoading})
        try {        
            await new Promise(resolve => setTimeout(resolve, 500));
            
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
            await new Promise(resolve => setTimeout(resolve, 500));
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

    };

    const userUpdate = async (user) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const { data } = await dashAxios.put(`user/${user.id}`, user);
      console.log('response', data)
    //   dispatch({ 
    //      type: types.user.editRole,
    //      payload: {
    //         success: {accion: 'edit', msg:"El rol fue editado con exito"}
    //      }
    //   });      
   }


    const errorsUser = (errors) => {
        console.log(errors)
        dispatch({ 
            type: types.user.errors, 
            payload: errors
        });
    };


    return (
        <UserContext.Provider value={{
            state,
            getUsers,
            errorsUser,
            userById,
            userUpdate

        }}>
            { children }
        </UserContext.Provider>
    )

}





  /*    const getUsers = async (page = 0) =>  {

        const limit = 25;
        const { data } = await dashAxios.get(`users?limit=${limit}&page=${page}`);
        
        if(!data){
            return dispatch({
                type: types.user.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No Existen usuarios en el sistema',
                }
            })
        };
        
        dispatch({
            type: types.user.getUsers,
            payload:  {
                users:  data.res.users,
                totalRows: data.res.totalRows
            }
        });
    }


    const getUser = (id) => {

        try {
            const user = state.users.find((item) => item.id == id);
  
            if(!user){
                return dispatch({
                    type: types.user.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existe el usuario en el sistema',
                    }
                })
            }

            dispatch({
                type: types.user.getOneUser,
                payload: {
                    user
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }


    const editUser = async (dataUser) => {

        const { id } = dataUser;

        const { data } = await dashAxios.put(`users/${id}`, {
            dataUser,
        });

        console.log(data)
    }

        
    const deleteUser = async (id) => {

        const { data } = await dashAxios.delete(`users/${id}`);

        if(data){
            const users = state.users.filter( (item) => {
                if(item.id == id){
                    item.is_active = false
                }

                return item;
            });

            dispatch({
                type: types.user.deleteUser,
                payload: {
                    users,
                }
            })
        }

    }


    const activeUser = async (id) => {

        const { data }  =  await dashAxios.put(`users/${id}`, {
            is_active: true,
        });

        if(data){
            const users =  state.users.filter( (item) => {
                if(item.id == id){
                    item.is_active = true
                }

                return item;
            });

            dispatch({
                type: types.user.activeUser,
                payload: {
                    users
                }
            });
        }


    }  */
   