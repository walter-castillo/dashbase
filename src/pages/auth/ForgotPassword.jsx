import { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import {useAuth} from '../../providers/AuthProvider';
import { useForm} from 'react-hook-form'
import Errors from '../../components/ui/Errors';

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from 'yup';
import { HeaderAuth } from './HeaderAuth';

const loginSchema = object().shape({
    email: string()
      .email('Ingrese un correo electrónico válido')
      .required('El correo electrónico es requerido')
});

export const ForgotPassword = () => {
    const { login, state } = useAuth();
  const { register, handleSubmit, reset, formState: { errors }} = 
  useForm({resolver: yupResolver(loginSchema)});

  const onSubmit = async(data) => {
    await login({email:data.email, password:data.password});
    reset();
  };

  return (
    <>
      
      <HeaderAuth titleHeader={'Recuperar Contraseña'} />

      {state.error && <Errors errorsBack={state.error} />}
      <Box component="form"  onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 5 }}>
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
        
        

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size='large'
        >
          Recuperar password
        </Button>
      </Box>
    </>
  )
}