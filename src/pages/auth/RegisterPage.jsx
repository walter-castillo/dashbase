import { Link, useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Grid, 
  Box, 
  Alert 
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from 'yup';
import { HeaderAuth } from './HeaderAuth';
import { useAuth } from '../../providers/AuthProvider';
import Errors from '../../components/ui/Errors';

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
        .matches(/^\d{4}$/, 'Ingrese un número de teléfono válido de 10 dígitos')
        .required('El teléfono es requerido'),

    password: string()
        .min(4, 'La contraseña debe tener al menos 8 caracteres')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida'),

    passwordConfirmation: string()
        .required('Debe confirmar la contraseña')
        .oneOf([ref('password'), null], 'Las contraseñas deben coincidir'),
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerContext, state } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await registerContext({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
    reset();
    navigate('/login');
  });

  return (
    <>
      <HeaderAuth />
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ mt: 3, maxWidth: 600, mx: 'auto' }}
      >
        <Grid container spacing={2}>
          {[
            { id: 'name', label: 'Nombre', autoFocus: true },
            { id: 'lastName', label: 'Apellido' },
            { id: 'email', label: 'Correo Electrónico', type: 'email' },
            { id: 'phone', label: 'Teléfono', type: 'tel' },
            { id: 'password', label: 'Contraseña', type: 'password' },
            { id: 'passwordConfirmation', label: 'Confirmar Contraseña', type: 'password' },
          ].map((field) => (
            <Grid key={field.id} size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                id={field.id}
                label={field.label}
                type={field.type || 'text'}
                autoComplete={
                  field.id === 'passwordConfirmation' ? 'new-password' : field.id
                }
                {...register(field.id)}
                {...(field.autoFocus && { autoFocus: true })}
              />
              {errors[field.id] && (
                <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                  {errors[field.id].message}
                </Alert>
              )}
            </Grid>
          ))}
        </Grid>

        {state.error && <Errors errorsBack={state.error} />}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          Registrarse
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid size={{ xs: 'auto' }}>
            <Button component={Link} to="/login" variant="text">
              ¿Ya tienes cuenta? Ingresar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}