import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../contexts/RoleContext';
import { Loading } from "../../components/ui/Loading";
import { Button, Grid, TextField, RadioGroup, Radio, FormControlLabel, Divider } from "@mui/material";

/* 
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from 'yup';

const registerSchema = object().shape({
    name: string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre no debe exceder los 50 caracteres')
        .required('El nombre es requerido'),

    lastName: string()
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(50, 'El apellido no debe exceder los 50 caracteres')
        .required('El apellido es requerido'),

    email: string()
        .email('Ingrese un correo electrónico válido')
        .required('El correo electrónico es requerido'),

    phone: string()
        .matches(/^\d{5}$/, 'Ingrese un número de teléfono válido de 10 dígitos')
        .required('El teléfono es requerido'),

    password: string()
        .min(4, 'La contraseña debe tener al menos 8 caracteres')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida'),

    passwordConfirmation: string()
        .required('Debe confirmar la contraseña')
        .oneOf([ref('password'), null], 'Las contraseñas deben coincidir'),
});
 */

export const EditRole = () => {
  const { id } = useParams();
  const { state, allPermissions, getRoleById } = useContext(RoleContext);
  const [idsPermissionsRole, setIdsPermissionsRole] = useState([]);

  const [roleName, setRoleName] = useState(undefined);
  const [roleDescription, setRoleDescription] = useState(undefined);
  const [roleStatus, setRoleStatus] = useState(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [allPerm, roleById] = await Promise.all([allPermissions(), getRoleById(id)]);
    setIdsPermissionsRole(roleById.permissions.map(permission => permission._id));
    setRoleName(roleById.role.role);
    setRoleDescription(roleById.role.description);
    setRoleStatus(roleById.role.status ? "true" : "false");
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    checked ?
    setIdsPermissionsRole([...idsPermissionsRole, value]):
    setIdsPermissionsRole(idsPermissionsRole.filter(item => item !== value))
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  

  const dataToSend = {
    roleName,
    roleDescription,
    roleStatus,
    idsPermissionsRole
  };
		
  console.log("Datos a enviar:", dataToSend);

};

  if (!state.role || !state.permissions) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre del Rol"
            name="roleName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={roleName || ""}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <RadioGroup
            aria-label="Estado del Rol"
            name="roleStatus"
            value={roleStatus || ""}
            onChange={(e) => setRoleStatus(e.target.value)}
          >
            <FormControlLabel value="active" control={<Radio />} label="Activo" />
            <FormControlLabel value="inactive" control={<Radio />} label="Inactivo" />
          </RadioGroup>
          <TextField
            label="Descripción del Rol"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={roleDescription || ""}
            onChange={(e) => setRoleDescription(e.target.value)}
          />
          <h3>{state.role.role}</h3>
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
            // disabled={loading}
          >
            Guardar Cambios
            {/* {loading ? "Guardando..." : "Guardar Cambios"} */}
          </Button>
          <Button
            component={Link}
            to="/dashboard/roles"
            variant="contained"
            size='large'
            sx={{ mt: 3, ml: 2 }}
            // disabled={loading}
          >
            Volver
          </Button>
        </form>
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