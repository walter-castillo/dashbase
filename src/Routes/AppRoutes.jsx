import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes} from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { GeneralLayout } from '../layouts/GeneralLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../providers/AuthProvider';
import { useRole } from '../providers/RoleProvider';
import { Loading } from '../components/ui/Loading';

export const AppRoutes = () => {
  const { state: stateRole } = useRole();
  const { checkAuthToken, state } = useAuth();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (stateRole.isLoading || state.isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={
          <PublicRoutes isLogged={state.isLogged}>
            <AuthLayout />
          </PublicRoutes>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoutes isLogged={state.isLogged}>
            <GeneralLayout />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};