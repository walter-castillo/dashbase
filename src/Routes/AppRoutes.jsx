import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./ValidatePrivate";
import { GeneralLayout } from "../layouts/GeneralLayout";
import { UserPage } from "../pages/user/UserPage";
import { EditUser } from "../pages/user/EditUser";
import { CreateUser } from "../pages/user/CreateUser";
import { RolesPage } from "../pages/roles/RolesPage";
import { EditRole } from "../pages/roles/EditRole";
import { CreateRole } from "../pages/roles/CreateRole";
import { ProductsPage } from "../pages/products/ProductsPage";

import { Error404Page } from "../pages/error/Error404Page";
import { Unauthorized } from "../pages/error/Unauthorized";
import { useAuth } from "../providers/AuthProvider";

import { PublicRoutes } from "./ValidatePublic";
import { AuthLayout } from "../layouts/AuthLayout";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { Public } from "./Public";
import { Private } from "./Private";


export const AppRoutes = () => {
  const { state } = useAuth();
  return (
    <Routes>

if (state.isLogged) {
  
      Public()
}
      {Private()}
  
     {/*  <Route path="/" element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Route> */}


    {/*  <Route path="/dashboard/*" element={<GeneralLayout />}>
        <Route path="usuarios" element={<PrivateRoutes component={UserPage} requiredRoles={["Medico"]} redirectTo="/login" /> }/>
        <Route path="usuarios/editar/:id" element={<EditUser />} />
        <Route path="usuarios/crear" element={<CreateUser />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="roles/editar/:id" element={<EditRole />} />
        <Route path="roles/crear" element={<CreateRole />} />
        <Route path="productos" element={<ProductsPage />} />
      </Route> */}
      
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<Error404Page />} />
    </ Routes>
  );
};