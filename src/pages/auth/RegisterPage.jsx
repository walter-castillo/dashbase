import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from '../../hooks/useForm';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export default function RegisterPage() {
  
  const { formState, onInputChange} = useForm({})
  const {register, state}= useContext(AuthContext)
   
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        password: formState.password,
        passwordConfirmation: formState.passwordConfirmation,
      });

      console.log('Registro exitoso');
    } catch (error) {
      console.error('Error durante el registro', error);
    }
  };

  return (
        <>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          DashBoard
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="Nombre"
                  autoFocus
                  onChange={ (e) => onInputChange(e) }
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={ (e) => onInputChange(e) }
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                  onChange={ (e) => onInputChange(e) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Telefono"
                  type="phone"
                  id="phone"
                  autoComplete="tel"
                  onChange={ (e) => onInputChange(e) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={ (e) => onInputChange(e) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirmar Password"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  onChange={ (e) => onInputChange(e) }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size='large'
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/auth/login'}>
                  <Button variant='text'>
                    Ingresar
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </>
  );
}
