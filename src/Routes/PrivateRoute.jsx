import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { PERMISSIONS, ROLES } from '../constants/rolesAndPermissions';

const PrivateRoute = ({ component: Component, requiredRoles = [], requiredPermissions = [], ...rest }) => {
  const { isAuthenticated, roles, permissions } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRoles = requiredRoles.some(role => roles.includes(role));
  const hasRequiredPermissions = requiredPermissions.some(permission => permissions.includes(permission));

  if (!hasRequiredRoles && !hasRequiredPermissions) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;