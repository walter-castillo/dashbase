 import React, { useState, useEffect, useContext } from 'react'
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Divider, Alert, Grid, Typography } from "@mui/material";
import { UserContext } from '../../contexts/UserContext';
import { Loading } from '../../components/ui/Loading';
import { useParams, Link, useNavigate } from "react-router-dom";
import Errors from '../../components/ui/Errors';

 

export const EditUser = () => {
    const { id } = useParams();
       const navigate = useNavigate();
    const {  state, userById, userUpdate } = useContext(UserContext);
    const [roles, setRoles] = useState({roles:[]})
    const [user, setUser] = useState({
        uid:"" ,
        name: "" ,
        email:"" ,
        phone:"",
        role:[],
        status:""
    });

    const [idsRolesUser, setIdsRolesUser] = useState([])
    const [errorEdit, setErrorEdit] = useState(null)
  

useEffect(() => {
    const fetchData = async () => {
        try {
           const data = await userById(id);
            setUser(data.user);
            setRoles(data.roles);
            setIdsRolesUser(data.user.roles.map(role => role._id)); 
        } catch (error) { 
            console.log(error.response.data) 
             setErrorEdit(error.response.data.errors)
        }
    };
    fetchData();
}, []); 


  const handleSubmit = async(e) => {
    e.preventDefault(); 
    setErrorEdit(null)
   try {
    await userUpdate({
      id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: idsRolesUser,
      status: user.status,
    })
navigate('/dashboard/usuarios')
   } catch (error) {
    console.log(error.response.data)
    setErrorEdit(error.response.data.errors)
   } 
  }

 const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    checked ?
      setIdsRolesUser([...idsRolesUser, value]) :
      setIdsRolesUser(idsRolesUser.filter(item => item !== value));
  };


if (!state.user && !state.roles) { return <Loading />  }


return (
<>
    {/* {JSON.stringify(user.roles, null,10)} */}
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={12} >
        <form noValidate onSubmit={handleSubmit}>
          <h3>Editar Usuario:</h3>
          {errorEdit && <Errors errorsBack={errorEdit} />}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.name}
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
                value={user.email}
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
                value={user.phone}
                onChange={onchangeInput}
                //  error helperText="Este campo es obligatorio" 
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Estado del usuario:</Typography>
          <RadioGroup
            aria-label="Estado del usuario"
            name="status"
            value={user.status}
            onChange={onchangeInput}
            >
            <FormControlLabel value="true" control={<Radio />} label="Activo" />
            <FormControlLabel value="false" control={<Radio />} label="Inactivo" />
          </RadioGroup>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Roles:</Typography>
          {state.roles?.map(role => (
            <div key={role._id}>
              <label>
                <input
                  type="checkbox"
                  value={role._id}
                  name={role.role}
                  checked={idsRolesUser.includes(role._id)}
                  onChange={handleRoleChange}
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '5px 0' }}>{role.role}</span>
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
)
}