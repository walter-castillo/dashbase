import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";


export const PrivateRoutes = ({
  component: Component,
  requiredRole,
  requiredPermissions = [],
  redirectTo = '/',
}) => {

  const { state } = useAuth();

  if (!state.isLogged)  <Navigate to={redirectTo} replace /> 

  

  if (requiredRole && state.user.role !== requiredRole) { return <Navigate to={redirectTo} replace />  }

  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.every(permission =>
      state.user.permissions?.includes(permission)
    );

  if (!hasPermission) { return <Navigate to={redirectTo} replace />   }

  }

  return <Component />;
};


/* import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoutes = ({ children, isLogged }) => {
  const { pathname } = useLocation();
  localStorage.setItem('lastRoute', pathname);

  return isLogged ? children : <Navigate to="/auth/login" />;
};

 */