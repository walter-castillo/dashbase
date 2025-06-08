import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Loading } from "../components/ui/Loading";
import { useResetContext } from "../hooks/useResetContext";
import PropTypes from "prop-types";

const tokenName = import.meta.env.VITE_TOKEN_NAME;

export const ValidatePrivate = ({
  component: Component,
  requiredRoles = [],
  requiredPermissions = [],
  redirectTo = "/",
}) => {
  const { state, checkAuthToken } = useAuth();
  const { resetAllContexts } = useResetContext();
  const token = localStorage.getItem(tokenName);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const validateToken = async () => {
      if (token ) 
      {   await checkAuthToken()  }
      setLoading(false);
    };

    validateToken();
  }, []);

  if (loading) { return <Loading /> }

  if (!state.isLogged && !token) {
    return <Navigate to="/login" replace />;
  }
 

const hasRole = requiredRoles.length === 0 ||             requiredRoles.some((role) => state.user.roles?.includes(role));
const hasPermission = requiredPermissions.length === 0 || requiredPermissions.some((perm) => state.user.permissions?.includes(perm));

if (!hasRole || !hasPermission) {
  return <Navigate to="/unauthorized" replace />;
}

return <Component />;

};

ValidatePrivate.propTypes = {
  component: PropTypes.elementType.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
  requiredPermissions: PropTypes.arrayOf(PropTypes.string),
  redirectTo: PropTypes.string,
};