import { Route, Navigate, useLocation, Outlet } from "react-router-dom";

import { AuthLayout } from "../layouts/AuthLayout";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPassword } from "../pages/auth/ForgotPassword";

// Componente inline que protege rutas públicas
const PublicRoute = ({ children }) => {
  const location = useLocation();
  const  tokenName =  import.meta.env.VITE_TOKEN_NAME 
  const token = localStorage.getItem(tokenName);

  if (token) {
    // Redirige a la ruta anterior si existe, o al dashboard por defecto
    const from = location.state?.from?.pathname || "/dashboard";
    console.log(from);
    return <Navigate to={from} replace />;
  }

  return children;
};

export const Public = () => {
  return (
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<HomePage />} />

      <Route
        path="login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="forgotPassword"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
    </Route>
  );
};
