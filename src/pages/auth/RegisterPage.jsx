import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { useForm} from 'react-hook-form'
import Errors from '../../components/ui/Errors';

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from 'yup';
import { HeaderAuth } from './HeaderAuth';

import {useAuth} from '../../providers/AuthProvider';

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

export  function RegisterPage() {
    const navigate = useNavigate();

  const { register:registerContext, state } = useAuth();
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({resolver: yupResolver(registerSchema)});
      
    const onSubmit = handleSubmit(async (data)=>{
      await registerContext({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      reset();
      navigate('/login');
    })
 
return (
    <>
    <HeaderAuth  />
    <Box component="form" noValidate   onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                label="Nombre"
                autoFocus
                {...register("name")}
                />
                {errors.name && <Alert severity="error" sx={{ mt: 1, mb:2 }}>{errors.name.message}</Alert> }    
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="family-name"
                {...register("lastName")}   
                />
                {errors.lastName && <Alert severity="error" sx={{ mt: 1, mb:2 }}>{errors.lastName.message}</Alert> }  
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                {...register("email")}
                />
                {errors.email && <Alert severity="error" sx={{ mt: 1, mb:2 }}>{errors.email.message}</Alert> }                 
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
                {...register("phone")}
                />
                {errors.phone && <Alert severity="error" sx={{ mt: 1, mb:2 }}>{errors.phone.message}</Alert> }                 
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
                {...register("password")}
                />
                {errors.password && <Alert severity="error" sx={{ mt: 1, mb:2 }}>{errors.password.message}</Alert> }                 
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
                {...register("passwordConfirmation")}
                />
                {errors.passwordConfirmation && <Alert severity="error" sx={{ mt: 1, mb:2 }}>{errors.passwordConfirmation.message}</Alert> }                 
            </Grid>
        </Grid>

        {state.error && <Errors errorsBack={state.error} />}

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
            <Link to={'/login'}>
            <Button variant='text'>
                Ingresar
            </Button>
            </Link>
        </Grid>
        </Grid>
    </Box>
    
    </>
)}
