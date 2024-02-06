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


export const LoginPage = () => {

  const { login, state } = useContext(AuthContext);
      
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
      
  const onSubmit = handleSubmit(async (data)=>{
    await login({email:data.email, password:data.password});
    reset();
  })

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {import.meta.env.VITE_COMPANY}
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Usuario / correo"
          name="email"
          autoComplete="email"
          autoFocus
          {...register("email", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Correo no válido",
          },
        })}
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
          {...register("password", {
          required: {
            value: true,
            message: "el password es requerido",
          },
          maxLength: 25,
          minLength: 2,
        })}
        />
        {errors.password?.type === "required" &&  <Alert severity="error">Password es requerido</Alert>}
        {errors.password?.type === "minLength" &&  <Alert severity="error">Password debe ser mayor a 2 caracteres</Alert>}
        {errors.password?.type === "maxLength" &&  <Alert severity="error">Password debe ser menor a 25 caracteres</Alert>}

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