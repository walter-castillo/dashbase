import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes} from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { GeneralLayout } from '../layouts/GeneralLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../providers/AuthProvider';
import { useRole } from '../providers/RoleProvider';
import { Loading } from '../components/ui/Loading';

import { Error404Page } from '../pages/error/Error404Page';
import { UserPage } from '../pages/user/UserPage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { EditUser } from '../pages/user/EditUser';
import { RolesPage } from '../pages/roles/RolesPage';
import { EditRole } from '../pages/roles/EditRole';
import { CreateRole } from '../pages/roles/CreateRole';
import { CreateUser} from '../pages/user/CreateUser';


import { RegisterPage} from '../pages/auth/RegisterPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { HomePage } from '../pages/home/HomePage';
import { Unauthorized } from '../pages/error/Unauthorized';


export const AppRoutes = () => {

  const { state } = useAuth();

  return (
    <Routes>
        <Route path="/*" element={<AuthLayout />}>
            <Route index element={<HomePage />} />  
            <Route path="login" element={<PublicRoutes>
				<LoginPage />
			</PublicRoutes>} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>
     
    <Route path="/" element={<GeneralLayout />}>
      <Route
        path="usuarios"
        element={<PrivateRoutes component={UserPage} requiredRoles={['admin']} />}
      />  
      <Route path="*" element={<Error404Page />} />
    </Route>




{/* <PrivateRoutes
  component={Dashboard}
  requiredRoles={["admin", "editor"]}
  requiredPermissions={["view_dashboard", "edit_posts"]}
  redirectTo="/login"
/> */}






<Route path="/dashboard/*" element={<GeneralLayout />}>

                {/* <Route path="usuarios"  index element={<UserPage />} /> */}
                <Route path="usuarios"  index element={<PrivateRoutes
                    component={UserPage}
                    requiredRoles={["Medico"]}
                    // requiredPermissions={["view_dashboard", "edit_posts"]}
                    redirectTo="/login"
                  /> } />

                <Route path="usuarios/editar/:id" element={<EditUser />} />
                <Route path="usuarios/crear" element={<CreateUser />} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="roles/editar/:id" element={<EditRole />} />
                <Route path="roles/crear" element={<CreateRole />} />
                <Route path="productos" element={<ProductsPage />} />
            
        </Route> 
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<Error404Page />} />



</Routes>



       
       
  )
};

{/* <Route path="/dashboard/*" element={<GeneralLayout />}>

                <Route path="usuarios"  index element={<UserPage />} />

                <Route path="usuarios/editar/:id" element={<EditUser />} />
                <Route path="usuarios/crear" element={<CreateUser />} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="roles/editar/:id" element={<EditRole />} />
                <Route path="roles/crear" element={<CreateRole />} />
                <Route path="productos" element={<ProductsPage />} />
            
        </Route> 
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<Error404Page />} />
    </Routes> */}