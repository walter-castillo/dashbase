import { Route,  Navigate, useLocation, Outlet} from "react-router-dom";

import { AuthLayout } from "../layouts/AuthLayout";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPassword } from "../pages/auth/ForgotPassword";

import { useAuth } from '../providers/AuthProvider';



export const Public = () => {
  return (
      // <Route element={<ValidatePublic />} >
        <Route path="/" element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />}/>
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Route>
      // </Route>
  );
};

const  tokenName =  import.meta.env.VITE_TOKEN_NAME
 const ValidatePublic = ({ children, isLogged }) => {
  const {state} = useAuth();
  const token = !!localStorage.getItem(tokenName);
  const path = '/dashboard/productos';
  // const path = localStorage.getItem('lastRoute') || '/dashboard';
  return (state.isLogged || token )? <Navigate to={path} />  : <Outlet />;
};


