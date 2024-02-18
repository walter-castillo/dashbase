import { types } from "../types/types";


export const RoleReducer = (state={}, action) => {
  
    switch (action.type) {

        case types.role.getRoles:
          return {
            ...state,
            isLoading: false,
            roles: action.payload.roles,
            // totalRoles: action.payload.totalRows
          }

          case types.role.allPermissions:
            return {
              ...state,
              isLoading: false,
              permissions: action.payload.permissions,
            }
            
          case types.role.getRoleById:
            return {
              ...state,
              isLoading: false,
              role: action.payload.role,
              // totalRoles: action.payload.totalRows
            }
        case types.role.editRole:
          return {
              ...state,
              success: "Role editado con exito",
              error: null 
          }

     /*    case types.role.deleteRole:
          return {
            ...state,
            isLoading: false,
            roles: action.payload.roles
          }

        case types.role.activeRole:
          return {
            ...state,
            isLoading: false,
            roles: action.payload.roles
          } */

    
        default:  state;
    }
}


/* export const RoleReducer = (state = {}, action) => {
  
    switch (action.type) {

        case types.role.getRoles:
            return {
                ...state,
                isLoading: false,
                roles: action.payload.roles,
                // totalRoles: action.payload.totalRows
            }

        default:
            return state;
    }
} */
