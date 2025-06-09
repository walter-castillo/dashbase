import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Loading } from "../components/ui/Loading";
import PropTypes from "prop-types";

export const ValidatePrivate = ({
  component: Component = null,
  requiredRoles = [],
  requiredPermissions = [],
  redirectTo = "/login",
}) => {
  const { state } = useAuth();

  if (state.loading) return <Loading />;

  if (!state.isLogged) return <Navigate to={redirectTo} replace />;

  const hasRole =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => state.user?.roles?.includes(role));

  const hasPermission =
    requiredPermissions.length === 0 ||
    requiredPermissions.some((perm) => state.user?.permissions?.includes(perm));

  if (!hasRole || !hasPermission) {
    return <Navigate to="/Unauthorized" replace />;
  }

  return Component ? <Component /> : <Outlet />;
};

ValidatePrivate.propTypes = {
  component: PropTypes.elementType,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
  requiredPermissions: PropTypes.arrayOf(PropTypes.string),
  redirectTo: PropTypes.string,
};