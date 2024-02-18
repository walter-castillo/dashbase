import { useReducer, useState } from "react"
import { RoleContext } from '../contexts/RoleContext'
import { RoleReducer } from "../reducers/RoleReducer"
import { dashAxios } from "../config/DashRcAxios"
import { types } from "../types/types"


const initialState = {
    roles: null,
    role: null,
    isLoading: false,
    totalRows: 0,
    errorMessage: null,
    succesMessage: null,
}


export const RoleProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(RoleReducer,  initialState);
    


    const getRoles = async () =>  {
        try {
            const { data } = await dashAxios.get('role');
            // console.log(data.roles)
            dispatch({
                    type: types.role.getRoles,
                    payload: {
                        roles: data.roles
                    }})
         /*    if(!data){
                return dispatch({
                    type: types.user.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existen usuarios en el sistema',
                    }
                })
            }; */
            
        } catch (error) {
            console.log(error)
        }
        // finally{  dispatch({ type: types.user.stopLoading })
        // }

        
       
    }
    const allPermissions = async () =>  {
        try {
            const { data } = await dashAxios.get('permission');
            // console.log(data.permission)
            dispatch({
                    type: types.role.allPermissions,
                    payload: {
                        permissions: data.permission
                    }})
         /*    if(!data){
                return dispatch({
                    type: types.user.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existen usuarios en el sistema',
                    }
                })
            }; */
            return data.permission
        } catch (error) {
            console.log(error)
        }
        // finally{  dispatch({ type: types.user.stopLoading })
        // }

        
       
    }


    const getRoleById = async (id) => {

          try {
            const { data } = await dashAxios.get(`role/${id}`);
            // console.log(data)
            dispatch({
                type: types.role.getRoleById,
                payload: {
                    role: data.role
            }})
         /*    if(!data){
                return dispatch({
                    type: types.user.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existen usuarios en el sistema',
                    }
                })
            }; */
            return data.role;  
            
        } catch (error) {
            console.log(error)
        }
        // finally{  dispatch({ type: types.user.stopLoading })
        // }

    }

    const roleUpdate = async (dataEditRole) => {

            const  data  = await dashAxios.put(`role/${dataEditRole.id}`, dataEditRole);
            /* dispatch({
                type: types.role.editRole,
                payload: {
                    role: data.role
            }}) */
            console.log(data)
           
    }

/* 
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


    } */

    return (
        <RoleContext.Provider value={{
            state,
            getRoles,
            allPermissions,
            getRoleById,
            roleUpdate
        }}>
            { children }
        </RoleContext.Provider>
    )

}