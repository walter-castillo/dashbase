import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useEffect } from 'react';

export const PrivateRoutes = ({ children, isLogged}) => {
    const { checkAuthToken, state }  = useAuth();

    // useEffect(() => { checkAuthToken()}, [checkAuthToken]);

  const { pathname  } = useLocation();
  localStorage.setItem('lastRoute', pathname);

  return (isLogged)
    ? children
    : <Navigate to='/auth/login' />
}
