import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Errors from '../../components/ui/Errors';

import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { HeaderAuth } from './HeaderAuth';
import { useResetContext } from '../../hooks/useResetContext';
import { Loading } from '../../components/ui/Loading';

const loginSchema = object().shape({
  email: string(),
  password: string(),
});

export const LoginPage = () => {
  const { login, state } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    const ok = await login({
      email: "email3@email.com",
      password: "123123Abc",
    });
    navigate('/dashboard/usuarios');
  };

  if (!!state.isLoading) return <Loading />;

  return (
    <>
      <HeaderAuth />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Usuario / correo"
          name="email"
          autoComplete="email"
          autoFocus
          {...register('email')}
        />
        {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password')}
        />
        {errors.password && <Alert severity="error">{errors.password.message}</Alert>}

        {state.error && <Errors errorsBack={state.error} />}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          Ingresar
        </Button>

        <Grid container columns={12} spacing={2}>
          <Grid span={6}>
            <Link to="/forgotPassword">
              <Button variant="text">Olvidé la contraseña</Button>
            </Link>
          </Grid>
          <Grid span={6}>
            <Link to="/register">
              <Button variant="text">Registrarse</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
