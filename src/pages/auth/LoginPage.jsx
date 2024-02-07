import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm} from 'react-hook-form'
import Errors from '../../components/ui/Errors';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema= yup.object().shape({
    email: yup.string()
      .email('Ingrese un correo electrónico válido')
      .required('El correo electrónico es requerido'),
    password: yup.string()
      .required('El password es requerida')
      .min(3, 'Debe tener al menos 3 carácteres')
      .max(20,'Debe tener máximo  20 carácteres')
})

export const LoginPage = () => {
  const { login, state } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors }} = 
  useForm({resolver: yupResolver(loginSchema)});

  const onSubmit = async(data) => {
    await login({email:data.email, password:data.password});
    reset();
  };


  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {import.meta.env.VITE_COMPANY}
      </Typography>
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
            <Link to={'/auth/forgot'} >
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