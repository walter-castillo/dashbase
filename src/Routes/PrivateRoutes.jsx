import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const  tokenName =  import.meta.env.VITE_TOKEN_NAME

export const PrivateRoutes = ({
  component: Component,
  requiredRoles = [],
  requiredPermissions = [],
  redirectTo = "/",
}) => {
  const { state } = useAuth();
  const token = localStorage.getItem(tokenName);
  const [isValidToken, setIsValidToken] = useState(null); // null indica que aún no se ha validado

if (! state.user) { return <Navigate to="/login" />; }

  /* 
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch("https://tu-api.com/auth/validate-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsValidToken(true);
        } else {
          localStorage.removeItem("token");
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Error validando el token:", error);
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]); */

  // // Mientras se valida el token, se puede mostrar un loader
  // if (isValidToken === null) {
  //   return <div>Cargando...</div>;
  // }

  // Si el token no es válido o el usuario no está logueado, redirige
  // if (!isValidToken || !state.isLogged) {
  //   return <Navigate to={redirectTo} replace />;
  // }

  // Validación de roles (si se proporcionan)
  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some(role => state.user.roles?.includes(role))
  ) {
    return <Navigate to={redirectTo} replace />;
  }

  // Validación de permisos (si se proporcionan)
  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every(permission => state.user.permissions?.includes(permission))
  ) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si todo está bien, renderiza el componente
  return <Component />;
};


/* import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoutes = ({ children, isLogged }) => {
  const { pathname } = useLocation();
  localStorage.setItem('lastRoute', pathname);

  return isLogged ? children : <Navigate to="/auth/login" />;
};

 */