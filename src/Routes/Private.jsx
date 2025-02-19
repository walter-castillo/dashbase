import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
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

export const Private = () => {
  return (
    <>
      <Route path="/dashboard/*" element={<GeneralLayout />}>
        <Route path="usuarios" element={<PrivateRoutes component={UserPage} requiredRoles={["Medico"]} redirectTo="/login" /> }/>
        <Route path="usuarios/editar/:id" element={<EditUser />} />
        <Route path="usuarios/crear" element={<CreateUser />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="roles/editar/:id" element={<EditRole />} />
        <Route path="roles/crear" element={<CreateRole />} />
        <Route path="productos" element={<ProductsPage />} />
      </Route>
    </>
  );
};
