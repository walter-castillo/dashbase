import { types } from "../types/types";

export const RoleReducer = (state={}, action) => {
  
    switch (action.type) {

        case types.role.getRoles:
          return {
            ...state,
            role: "",
            roles: action.payload.roles,
          }

        case types.role.allPermissions:
          return {
            ...state,
            permissions: action.payload.permissions,
          }
            
        case types.role.getRoleById:
          return {
            ...state,
            role: action.payload.role,
          }

        case types.role.editRole:
          return {
              ...state,
              error: null,
              success: action.payload.success
          }

        case types.role.createRole:
          return {
              error: null,
              success: action.payload.success

          }

        case types.role.deleteRole:
          return {
              ...state,
              roles: action.payload.roles,
          }

           
        case types.role.error:
              return {
                errors: action.payload.errors
            };
    
        case types.role.success:
            return {
                ...state,
                  success: action.payload.success
            };
    
        default: state;
    }
}

