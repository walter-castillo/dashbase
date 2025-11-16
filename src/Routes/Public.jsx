import { Route, Navigate, useLocation, Outlet } from "react-router-dom";

import { AuthLayout } from "../layouts/AuthLayout";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import GuestLayout from "../layouts/GuestLayout";
import { VisorStudy } from "../components/ui/action/VisorStudy";


// Componente inline que protege rutas públicas
const PublicRoute = ({ children }) => {
  const location = useLocation();
  const  tokenName =  import.meta.env.VITE_TOKEN_NAME 
  const token = localStorage.getItem(tokenName);

  if (token) {
    // Redirige a la ruta anterior si existe, o al dashboard por defecto
    const from = location.state?.from?.pathname || "/dashboard/estudios";
     return <Navigate to={from} replace />;
  }

  return children;
};

export const Public = () => {
  return (
    <>
      <Route
        path="/visor-estudios/:id"
        element={<VisorStudy endpointBack="api/visor" />}
      />
      <Route
        path="/visor-paciente/:id"
        element={<VisorStudy endpointBack="view/patient" />}
      />
      <Route
        path="/visor-invitado/:id"
        element={<VisorStudy endpointBack="api/share/view/invitado" />}
      />
      {/* <Route path="/view/study/invitado/:id" element={<ViewStudyInvitado />} /> */}

      <Route path="/invitado/:token" element={<GuestLayout />} />

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
    </>
  );
};
