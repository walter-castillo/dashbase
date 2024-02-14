import { useParams,  Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../contexts/RoleContext';
import { Loading } from "../../components/ui/Loading";
import { Button, Grid, ListItemButton } from "@mui/material";

export const EditRole = () => {
  const { id } = useParams();
  const { state, allPermissions, getRoleById } = useContext(RoleContext);
  const [idsPermissionsRole, setIdsPermissionsRole] = useState([]);

  useEffect(() => { fetchData()}, []);

  const fetchData = async () => {
    const [allPerm, roleById] = await Promise.all([allPermissions(), getRoleById(id)]);
    setIdsPermissionsRole(roleById.permissions.map(permission => permission._id));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIdsPermissionsRole([...idsPermissionsRole, value]);
    } else {
      setIdsPermissionsRole(idsPermissionsRole.filter(item => item !== value));
    }
  };

  if (!state.role || !state.permissions) {  
    return <Loading /> 
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <div>
          <h3>{state.role.role}</h3>
          {state.permissions.map(permission => (
            <div key={permission._id}>
              <label>
                <input
                  type="checkbox"
                  value={permission._id}
                  name={permission.permission}
                  checked={idsPermissionsRole?.includes(permission._id)}
                  onChange={handlePermissionChange}
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '5px 0' }}>{permission.permission}</span> - ({permission.description})
              </label> <br />
            </div>
          ))}
          <Button
            variant="contained"
            size='large'
            sx={{ mt: 3, ml: 2 }}
            component={Link}
            to="/dashboard/roles"
          >
            Volver
          </Button>
          <Button
            type="submit"
            variant="contained"
            size='large'
            sx={{ mt: 3, ml: 2 }}
          >
            Registrarse
          </Button> 
        </div>
      </Grid>
    </Grid>
  );
};


{/*    {
    "role": "Medico",
    "description": "Solo permisos para ver todos los estudios",
    "status": true,
    "permissions": [
            "659200c0c020a40feb03d133",
            "6599a57dabbe13def65945e5"
        ]
}
 */}

{/*  {state.error && <Errors errorsBack={state.error} />} 

         <Button
        type="submit"
        fullWidth
        variant="contained"
        size='large'
        sx={{ mt: 3, mb: 2 }}
        >
        Registrarse
        </Button>  */}