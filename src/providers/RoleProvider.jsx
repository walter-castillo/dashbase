import { useReducer, useState, createContext, useContext } from "react"
import { RoleReducer } from "../reducers/RoleReducer"
import { dashAxios } from "../config/DashRcAxios"
import { types } from "../types/types"


const RoleContext = createContext();

const initialState = {
   roles: null,
   success: null,

}

export const RoleProvider = ({ children }) => {

   const [ state, dispatch ] = useReducer(RoleReducer,  initialState);
    
   const getRoles = async () =>  {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      try {
         const { data } = await dashAxios.get('role');
         dispatch({
            type: types.role.getRoles,
            payload: {
               roles: data.roles
            }
         })
      } catch (error) {
         console.log(error.response.data.errors)
         dispatch({
            type: types.role.error,
            payload: { 
               errors: error.response.data.errors
            }
         })
      }
   }

   const allPermissions = async () =>  {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const { data } = await dashAxios.get('permission');
      dispatch({
         type: types.role.allPermissions,
         payload: {
            permissions: data.permission
         }
      })
      return data.permission
   }

   const getRoleById = async (id) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { data } = await dashAxios.get(`role/${id}`);
      dispatch({
         type: types.role.getRoleById,
         payload: {
            role: data.role
         }
      })   
      return data.role;     
   }

   const roleUpdate = async (dataEditRole) => {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const { data } = await dashAxios.put(`role/${dataEditRole.id}`, dataEditRole);
      dispatch({ 
         type: types.role.editRole,
         payload: {
            role: data.role ,
            success: {accion: 'edit', msg:"El rol fue editado con exito"}
         }
      });      
      successClear() 
   }

   const roleCreate = async (dataCreateRole) => {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const { data } = await dashAxios.post('role', dataCreateRole);
      dispatch({ 
         type: types.role.createRole,
         payload:{success: {accion: 'create', msg:"El rol fue creado con exito"}
         } 
      });   
      successClear()   
   }

   const roleDelete = async (id) => {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      try {
         const { data } = await dashAxios.delete(`role/${id}`);
            const roles = state.roles.filter((item) => item._id !== id);
            dispatch({ 
               type: types.role.deleteRole,
               payload: {roles: roles }
            }); 
            dispatch({ type:
               types.role.success,
               payload: {
                  success: "Rol eliminado correctamente"
               }
            });
            successClear()     
            console.log("Rol eliminado:", data);
      } catch (error) {
         console.error("Error al eliminar el rol:", error);
      }
   };

   const successClear = () => {
      return setTimeout(() => {
         dispatch({ 
            type: types.role.success, 
            payload: { success: null } 
         });
      }, 2000);
   };

   const resetRoleContext = () => {
        dispatch({ 
            type: types.role.resetRoleContext
        });
    }


   const contextValue = {
      state,
      getRoles,
      allPermissions,
      getRoleById,
      roleUpdate,
      roleCreate,
      roleDelete,
      resetRoleContext
    };
 
   return (
      <RoleContext.Provider value={contextValue}>
         { children }
      </RoleContext.Provider>
   )
}

export const useRole = () => {
   return useContext(RoleContext);
};