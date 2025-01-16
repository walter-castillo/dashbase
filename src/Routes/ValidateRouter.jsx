import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export const ValidateRouter = ({children}) =>{
    const { state, checkAuthToken } = useContext(AuthContext);
if (!state.isLogged) {
  console.log('desde islogged')
  return <Navigate to={"/register"} />;
  
}
    // console.log(state.user)
    // checkAuthToken()


    
    // if (!rolesAllowed.includes(userAuth?.role))  return  <Navigate to={"/login"} />;
    // if (!rolesAllowed.includes(userAuth?.role))  return <Navigate to={-1} />;
    // if (!userAuth) return <Navigate to={"/login"}  />;
    // if (localStorage.getItem("token")) {
    //   loginToken()
    //   .then(resp => console.log(resp))
    //   .catch( (error) => {
    //           console.log(error.errors)
    //           localStorage.removeItem("token");
    //           <Navigate to={'/'} />;
    //           return
    //   })
    // }     
    return children ? children : <Outlet />;
  };
