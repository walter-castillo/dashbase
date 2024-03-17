import { types } from "../types/types";


export const UserReducer = (state={}, action) => {
  
    switch (action.type) {

        case types.user.getUsers:
          return {
            ...state,
            isLoading: false,
            users: action.payload.users,
            total: action.payload.total
          }

        case types.user.getOneUser:
          return {
            ...state,
            isLoading: false,
            user: action.payload.user
          }

        case types.user.deleteUser:
          return {
            ...state,
            isLoading: false,
            users: action.payload.users
          }
          

        case types.user.isLoading:
          return {
            ...state,
            isLoading: true,
          }
    
        default: state;
    }
}
