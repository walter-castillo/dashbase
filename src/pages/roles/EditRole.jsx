import {useParams} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { RoleContext } from '../../contexts/RoleContext';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';

export const EditRole = () => {
  const { id } = useParams();
  const { state, allPermissions, getRoleById } = useContext(RoleContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getRoleById(id);
    await allPermissions();
  };

 const handlePermissionChange = async (permissionId) => {
  // Encuentra el índice del permiso seleccionado en el estado del rol
  const index = state.role.permissions.findIndex(rolePermission => rolePermission._id === permissionId);

  // Si el permiso está presente en el estado del rol, quítalo; de lo contrario, agrégalo
  let updatedPermissions = [...state.role.permissions];
  if (index !== -1) {
    updatedPermissions.splice(index, 1); // Quita el permiso
  } else {
    updatedPermissions.push(state.permissions.find(permission => permission._id === permissionId)); // Agrega el permiso
  }
console.log(updatedPermissions)
  // Actualiza el estado del rol con los permisos actualizados
//   await updateRolePermissions(updatedPermissions);
};
  if (!state.role || !state.permissions) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h3>{state.role.role}</h3>
      {state.permissions.map(permission => (
        <div key={permission._id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.role.permissions.some(rolePermission => rolePermission._id === permission._id)}
                onChange={() => handlePermissionChange(permission._id)}
                name={permission.permission}
              />
            }
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" style={{ marginRight: '0.5rem' }}>{permission.permission}</Typography>
                <Typography variant="body2">{` - ( ${permission.description} )`}</Typography>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};
