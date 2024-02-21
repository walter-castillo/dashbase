
import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Divider, Alert, Grid } from "@mui/material";
import { RoleContext } from '../../contexts/RoleContext';
import { Loading } from '../../components/ui/Loading';
// import {useForm} from '../../hooks/useform';



export const EditRole = () => {
  const { id } = useParams();
   const navigate = useNavigate();
  const { state, allPermissions, getRoleById, roleUpdate } = useContext(RoleContext);
  const [idsPermissionsRole, setIdsPermissionsRole] = useState([]);
  const [roleEdit, setRoleEdit] = useState({
    id: '',
    role: '',
    description: '',
    permission:[],
  status: ''
  });

const handleSubmit = async(e) => {
  e.preventDefault(); 
  try {
    console.log({ id, role: roleEdit.role,
    description: roleEdit.description,
    status: roleEdit.status,
    permissions: idsPermissionsRole})
    await roleUpdate({
    id,
    role: roleEdit.role,
    description: roleEdit.description,
    status: roleEdit.status,
    permissions: idsPermissionsRole
  })  

   navigate('/dashboard/roles')
  } catch (error) {
    console.log(error.response.data)
  }

}

  useEffect(() => {
     const fetchData = async () => {
    const [allPerm, roleById] = await Promise.all([allPermissions(), getRoleById(id)]);
    setIdsPermissionsRole(roleById.permissions.map(permission => permission._id));
    setRoleEdit({
      ...roleEdit,
      role: roleById.role,
      description: roleById.description,
      status: roleById.status ,
      permissions: roleById.permissions.map(permission => permission._id)
    });
  };
    fetchData();
  }, []);

 

  const onchangeInput = (e) => {
  const { name, value } = e.target;
  setRoleEdit({ ...roleEdit, [name]: value });

  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    checked ?
      setIdsPermissionsRole([...idsPermissionsRole, value]) :
      setIdsPermissionsRole(idsPermissionsRole.filter(item => item !== value));
  };

  if (!state.role || !state.permissions) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <form noValidate onSubmit={handleSubmit}>
          <h3>Editar rol</h3>
          <TextField
            label="Nombre del Rol"
            name="role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={roleEdit.role}
            onChange={onchangeInput}
          />

          <TextField
            label="Descripción del Rol"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            name="description"
            value={roleEdit.description}
            onChange={onchangeInput}
          />

          <Divider sx={{ my: 1 }} />
          <RadioGroup
            aria-label="Estado del Rol"
            name="status"
            value={roleEdit.status}
            onChange={onchangeInput}
          >
            <FormControlLabel value="true" control={<Radio />} label="Activo" />
            <FormControlLabel value="false" control={<Radio />} label="Inactivo" />
          </RadioGroup>

          <Divider sx={{ my: 1 }} />
          {state.permissions.map(permission => (
            <div key={permission._id}>
              <label>
                <input
                  type="checkbox"
                  value={permission._id}
                  name={permission.permission}
                  checked={idsPermissionsRole.includes(permission._id)}
                  onChange={handlePermissionChange}
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '5px 0' }}>{permission.permission}</span> - ({permission.description})
              </label> <br />
            </div>
          ))}
          <Divider sx={{ my: 3 }} />

          <Button
            type="submit"
            variant="contained"
            size='large'
            sx={{ mt: 3, ml: 2 }}
          >
            Guardar Cambios
          </Button>


          <Button
            component={Link}
            to="/dashboard/roles"
            variant="contained"
            size='large'
            sx={{ mt: 3, ml: 2 }}
          >
            Volver
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}; 
