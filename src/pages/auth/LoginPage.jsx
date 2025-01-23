import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import {useAuth} from '../../providers/AuthProvider';
import { useForm} from 'react-hook-form'
import Errors from '../../components/ui/Errors';

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from 'yup';
import { HeaderAuth } from './HeaderAuth';

const loginSchema = object().shape({
    email: string(),
      // .email('Ingrese un correo electrónico válido')
      // .required('El correo electrónico es requerido'),
    password: string()
      // .required('El password es requerida')
      // .min(3, 'Debe tener al menos 3 caracteres')
      // .max(30,'Debe tener máximo  30 caracteres')
});

export const LoginPage = () => {
  const { login, state } = useAuth();
  const { register, handleSubmit, reset, formState: { errors }} = 
  useForm({resolver: yupResolver(loginSchema)});

  const onSubmit = async(data) => {
    // await login({email:data.email, password:data.password});
    await login({email:'email3@email.com', password: '123123Abc' });
    reset();
  };

  return (
    <>
      <HeaderAuth  />

      <Box component="form"  onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Usuario / correo"
          name="email"
          autoComplete="email"
          autoFocus
          {...register("email")}
        />
        {errors.email && <Alert severity="error">{errors.email.message}</Alert> }  
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <Alert severity="error">{errors.password.message}</Alert> } 

        {state.error && <Errors errorsBack={state.error} />}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size='large'
        >
          Ingresar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to={'/auth/forgotPassword'} >
              <Button variant='text'>
                Olvide la contraseña
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to={'/auth/register'}>
              <Button variant='text'>
                Registrarse
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}