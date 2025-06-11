import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Divider, Alert, Grid } from "@mui/material";
import { Loading } from '../../components/ui/Loading';
import { Error404Page } from '../error/Error404Page';
import Errors from '../../components/ui/Errors';
  import  {showAlert} from '../../helpers/showAlert';
import { useRole } from '../../providers/RoleProvider';


export const CreateRole = () => {

  const navigate = useNavigate();
  const { state, allPermissions, roleCreate } = useRole();
  const [idsPermissionsRole, setIdsPermissionsRole] = useState([]);
  const [errorCreateLoad, setErrorCreateLoad] = useState(null)
  const [errorCreate, setErrorCreate] = useState(null)
  const [buttonLoading, setButtonLoading] = useState(false)

  const createRoleInicial = {
    role: '',
    description: '',
    permissions: [] ,
    status: true
  }
  const [createRole, setCreateRole] = useState(createRoleInicial);
 
 useEffect(() => {
  setErrorCreateLoad(null)
  state.isLoading = true
  const fetchData = async () => {
    try {
      const allPerm = await allPermissions();
      
    } catch (error) {
      console.log(error.response.data); 
      setErrorCreateLoad(error.response.data.errors);
    }
 };
 fetchData();
 state.isLoading = false

}, []);

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    setButtonLoading(true)
    setErrorCreate(null)
    try {
      createRole.permissions = idsPermissionsRole;
      console.log(createRole)
      await roleCreate(createRole);
      navigate('/dashboard/roles')
    } catch (error) {
      console.log(error.response.data) 
      setErrorCreate(error.response.data.errors)
    }
    setButtonLoading(false)
  };
  
  
  const onchangeInput = ({ target }) => {
    const { name, value } = target;
    setCreateRole({
        ...createRole,
        [ name ]: value
    });
    
  }


const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    checked ?
      setIdsPermissionsRole([...idsPermissionsRole, value]) :
      setIdsPermissionsRole(idsPermissionsRole.filter(item => item !== value));
  };

 


  if (errorCreateLoad) { return <Error404Page /> }
  
  // if (state.isLoading  ) { return <Loading />}   
  // if (!state.permissions  ) { return <Loading />}   
  if (!state.permissions || state.permissions.length === 0) { return <Loading />}

 return (
    <>
      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <form noValidate onSubmit={handleSubmit}>
          <h3>Crear rol</h3>
          {errorCreate && <Errors errorsBack={errorCreate} />}
          <TextField
            label="Nombre del Rol"
            name="role"
            variant="outlined"
            fullWidth
            margin="normal"
           value = {createRole.role}
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
            value={createRole.description}
            onChange={onchangeInput}
          />

          <Divider sx={{ my: 1 }} />
          <RadioGroup
            aria-label="Estado del Rol"
            name="status"
            value={createRole.status}

            onChange={onchangeInput}
          >
            <FormControlLabel value="true" control={<Radio />} label="Activo" />
            <FormControlLabel value="false" control={<Radio />} label="Inactivo" />
          </RadioGroup>

          <Divider sx={{ my: 1 }} />
          {state.permissions?.map(permission => (
            <div key={permission._id}>
              <label>
                <input
                  type="checkbox"
                  value={permission._id}
                  name={permission.permission}
                  onChange={handlePermissionChange}
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '5px 0' }}>
                  {permission.permission}</span> - ({permission.description})
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
            {buttonLoading ? "Cargando..." : "Crear Rol"}

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
     </>
  );

}
