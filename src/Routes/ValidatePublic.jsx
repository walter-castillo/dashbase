import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const  tokenName =  import.meta.env.VITE_TOKEN_NAME

export const ValidatePublic = ({ children, isLogged }) => {
  const {state} = useAuth();
  const token = !!localStorage.getItem(tokenName);

  const path = '/dashboard';
  // const path = localStorage.getItem('lastRoute') || '/dashboard';
  return (state.isLogged || token )? <Navigate to={path} />  : children;
};