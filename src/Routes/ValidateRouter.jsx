import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext} from "../context/UserContext";
import { Navigate } from "react-router-dom";


const ProtectedRouteToken = ({children}) =>{
    const { state, loginToken } = useContext(UserContext);


    
    if (!rolesAllowed.includes(userAuth?.role))  return  <Navigate to={"/login"} />;
    // if (!rolesAllowed.includes(userAuth?.role))  return <Navigate to={-1} />;
    if (!userAuth) return <Navigate to={"/login"}  />;
    if (localStorage.getItem("token")) {
      loginToken()
      .then(resp => console.log(resp))
      .catch( (error) => {
              console.log(error.errors)
              localStorage.removeItem("token");
              <Navigate to={'/'} />;
              return
      })
    }     
    return children ? children : <Outlet />;
  };

export default ProtectedRouteToken;
