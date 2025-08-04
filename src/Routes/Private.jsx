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
import { StudiesPage } from "../pages/studies/StudiesPage";
import { Unauthorized } from "../pages/error/Unauthorized";
import { Error404Page } from "../pages/error/Error404Page";

import { PERMISOS, ROLES } from '../data/constants';
const  tokenName =  import.meta.env.VITE_TOKEN_NAME

import { useAuth } from "../providers/AuthProvider";
import { Loading } from "../components/ui/Loading";
import GenerateCode from "../pages/code/GenerateCode";

export const ProtectedRoutes = () => {
   const token = localStorage.getItem(tokenName);
  const { state } = useAuth();
if (!token) return <Navigate to="/login" replace />
  if (state.isLoading) return <Loading />;

//   if (!state.user) return <Navigate to="/login" replace />;

  return <Outlet />;
};


export const Private = () => {
   return (
     <Route element={<ProtectedRoutes />}>
       <Route element={<GeneralLayout />}>
         <Route
           path="/dashboard/usuarios"
           element={
             <ValidatePrivate
               component={UserPage}
               requiredPermissions={[PERMISOS.USUARIOS_VER_TODOS]}
             />
           }
         />

         <Route
           path="/dashboard/usuarios/editar/:id"
           element={
             <ValidatePrivate
               component={EditUser}
               requiredPermissions={[PERMISOS.USUARIO_ACTUALIZAR]}
             />
           }
         />

         <Route
           path="/dashboard/usuarios/crear"
           element={
             <ValidatePrivate
               component={CreateUser}
               requiredPermissions={[PERMISOS.USUARIO_CREAR]}
             />
           }
         />

         <Route
           path="/dashboard/roles"
           element={
             <ValidatePrivate
               component={RolesPage}
               requiredPermissions={[PERMISOS.ROLES_VER_TODOS]}
             />
           }
         />

         <Route
           path="/dashboard/roles/editar/:id"
           element={
             <ValidatePrivate
               component={EditRole}
               requiredPermissions={[PERMISOS.ROL_ACTUALIZAR]}
             />
           }
         />

         <Route
           path="/dashboard/roles/crear"
           element={
             <ValidatePrivate
               component={CreateRole}
               requiredPermissions={[PERMISOS.ROL_CREAR]}
             />
           }
         />

         <Route
           path="/dashboard/estudios"
           element={
             <ValidatePrivate component={StudiesPage} requiredPermissions={[PERMISOS.ESTUDIOS_VER_TODOS]} />
            //  <StudiesPage />
           }
         />

         <Route
           path="/dashboard/generarcodigo"
            element={
             <ValidatePrivate
              requiredPermissions={[PERMISOS.GENERAR_CODIGO]}
              component={GenerateCode}
            />
           }
         />

         {/* <Route path="/dashboard/generateCode" element={<GenerateCode />} /> */}

         <Route path="/dashboard/*" element={<Error404Page />} />
       </Route>
     </Route>
   );
};




