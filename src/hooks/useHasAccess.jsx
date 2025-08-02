import { useAuth } from '../providers/AuthProvider';

export const useHasAccess = ({ permiso, rol }) => {

  
  const { state } = useAuth();
  const permissions = state?.user?.permissions || [];
  const roles = state?.user?.roles || [];
  const tienePermiso = permiso ? permissions.includes(permiso) : false;
  const tieneRol = rol ? roles.includes(rol) : false;

  return tienePermiso || tieneRol;
};
