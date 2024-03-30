import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Divider, Alert, Grid } from "@mui/material";
import { Loading } from '../../components/ui/Loading';
import { Error404Page } from '../error/Error404Page';
import Errors from '../../components/ui/Errors';
import { UserContext } from '../../contexts/UserContext';
import { AuthContext } from '../../contexts/AuthContext';


export const CreateUser = () => {
  const navigate = useNavigate();
  const { state, isLoading, setIsLoading, allRoles, userCreate } = useContext(UserContext);
  const { state:userAuth} = useContext(AuthContext);

  const [idsRoles, setIdsRoles] = useState([]);
  const [errorCreate, setErrorCreate] = useState(null)
  const [buttonLoading, setButtonLoading] = useState(false)



  const createUserInicial = {
    name: '',
    email: '',
    phone: '',
    status: true,
    roles: [] ,
    password: '123123Abc',
    passwordConfirmation: '123123Abc'
  }
  const [createUser, setCreateUser] = useState(createUserInicial);
 
 useEffect(() => {
  const fetchData = async () => {
    try {
      await allRoles(); 
    } catch (error) {console.log(error.response.data.errors) }
  };
 fetchData();
}, []);

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    setErrorCreate(null)
    try {
      createUser.roles = idsRoles;
      await userCreate(createUser);
      navigate('/dashboard/usuarios')
    } catch (error) {
      console.log(error.response.data.errors) 
      setErrorCreate(error.response.data.errors)
      setIsLoading(false)
    }
  };
  
  const onchangeInput = ({ target }) => {
    const { name, value } = target;
    setCreateUser({
        ...createUser,
        [ name ]: value
    });
    
  }


const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    checked ?
      setIdsRoles([...idsRoles, value]) :
      setIdsRoles(idsRoles.filter(item => item !== value));
  };

  if (isLoading ) { return <Loading />}   
  if (!state.roles  ) { return <Loading />}   

 return (
    <>
      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <form noValidate onSubmit={handleSubmit}>
          <h3>Editar Usuario:</h3>
          {errorCreate && <Errors errorsBack={errorCreate} />}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={createUser.name}
                onChange={onchangeInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={createUser.email}
                onChange={onchangeInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="telefono"
                name="phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={createUser.phone}
                onChange={onchangeInput}
                //  error helperText="Este campo es obligatorio" 
              />
            </Grid>
          </Grid>


          <Divider sx={{ my: 1 }} />
          <RadioGroup
            aria-label="Estado del Rol"
            name="status"
            value={createUser.status}

            onChange={onchangeInput}
          >
            <FormControlLabel value="true" control={<Radio />} label="Activo" />
            <FormControlLabel value="false" control={<Radio />} label="Inactivo" />
          </RadioGroup>

          <Divider sx={{ my: 1 }} />
          {state.roles?.map(role => (
            <div key={role._id}>
              <label>
                <input
                  type="checkbox"
                  value={role._id}
                  name={role.role}
                  onChange={handleRoleChange}
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '5px 0' }}>
                  {role.role}</span>
              </label> <br />
            </div>
          ))}
          <Divider sx={{ my: 3 }} />
        {userAuth.user &&(
          <Button
            type="submit"
            variant="contained"
            size='large'
            sx={{ mt: 3, ml: 2 }}
          >
            {buttonLoading ? "Cargando..." : "Crear Rol"}

          </Button>
        )}
        
          <Button
            component={Link}
            to="/dashboard/usuarios"
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
