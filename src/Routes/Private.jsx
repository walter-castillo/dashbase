import React from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import {  ValidatePrivate } from "./ValidatePrivate";
import { GeneralLayout } from "../layouts/GeneralLayout";
import { UserPage } from "../pages/user/UserPage";
import { EditUser } from "../pages/user/EditUser";
import { CreateUser } from "../pages/user/CreateUser";
import { RolesPage } from "../pages/roles/RolesPage";
import { EditRole } from "../pages/roles/EditRole";
import { CreateRole } from "../pages/roles/CreateRole";
import { ProductsPage } from "../pages/products/ProductsPage";
import { Unauthorized } from "../pages/error/Unauthorized";
import { Error404Page } from "../pages/error/Error404Page";

import { PERMISOS, ROLES } from '../data/constants';
const  tokenName =  import.meta.env.VITE_TOKEN_NAME



const ProtectedLayout = () => {
  const token = localStorage.getItem(tokenName);
  // return <Outlet />;
  return (!!token) ? <Outlet />   : <Navigate to={'/login'} />;
}

export const Private = () => {

   return (
    // <Route path="/dashboard/*" element={token ? < Outlet /> : <Navigate to='/login' /> }>
    // <Route element={<ProtectedLayout />}>
      <Route element={<GeneralLayout />}> 
         <Route path="/dashboard/usuarios" element={
            <ValidatePrivate component={UserPage} requiredPermissions={[PERMISOS.USUARIOS_VER_TODOS]} redirectTo="/login" />
         } />

         <Route path="/dashboard/usuarios/editar/:id" element={<EditUser />} />
         <Route path="/dashboard/usuarios/crear" element={
            <ValidatePrivate component={CreateUser} requiredPermissions={[PERMISOS.USUARIO_CREAR]} redirectTo="/login" />
         } />
         <Route path="/dashboard/roles" element={<RolesPage />} />
         <Route path="/dashboard/roles/editar/:id" element={<EditRole />} />


         {/* <Route path="/dashboard/roles/crear" element={<CreateRole />}/> */}
         <Route path="/dashboard/roles/crear" element={
            <ValidatePrivate component={CreateRole} requiredPermissions={[PERMISOS.ROL_CREAR]} redirectTo="/login" />
         } />
         <Route path="/dashboard/productos" element={<ProductsPage />} />
         <Route path="*" element={<Error404Page />} />
      </Route>
    // </Route>

  );
};





