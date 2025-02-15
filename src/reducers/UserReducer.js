import { types } from "../types/types";

export const UserReducer = (state={}, action) => {
  
    switch (action.type) {

        case types.user.getUsers:
          return {
            isLoading: false,
            users: action.payload.users,
            total: action.payload.total
          }

          case types.user.startLoading:
          return {
            ...state,
            isLoading: true,
          }

        case types.user.stopLoading:
          return {
            ...state,
            isLoading: false,
          }

        case types.user.errors:
          return {
            ...state,
            errors: action.payload.errors,
          }

        case types.user.userById:
          return {
            user: action.payload.user,
            roles: action.payload.roles,
          }

        case types.user.allRoles:
          return {
            roles: action.payload.roles,
          }
            
        case types.user.createUser:
          return {
            ...state,
            success: {accion: 'create', msg:"El rol fue creado con exito"}
          }

        case types.user.resetUserContext:
            return {
                isLoading: true,
                users: null,
                user: null,
                roles: null,
                total: 0,
            }

             
        



        // case types.user.getOneUser:
        //   return {
        //     ...state,
        //     isLoading: false,
        //     user: action.payload.user
        //   }

        // case types.user.deleteUser:
        //   return {
        //     ...state,
        //     isLoading: false,
        //     users: action.payload.users
        //   }
          



    
        default: state;
    }
}
