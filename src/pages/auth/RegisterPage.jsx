import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm} from 'react-hook-form'
import Errors from '../../components/ui/Errors';



export default function RegisterPage() {
    const {register:sendForm, state}= useContext(AuthContext)

     const { register, handleSubmit, formState: { errors }, reset } = useForm();
      
  const onSubmit = handleSubmit(async (data)=>{
    await sendForm({
            // name: formState.name,
            // email: formState.email,
            // phone: formState.phone,
            // password: formState.password,
            // passwordConfirmation: formState.passwordConfirmation,
        });
    reset();
  })
    
return (
    <>
    {/* {state.user && <Navigate to={"/dashboard"} />} */}
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
    {import.meta.env.VITE_COMPANY}
    </Typography>
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
            autoComplete="given-name"
            name="name"
            required
            fullWidth
            label="Nombre"
            autoFocus
            {...register("name", {
            required: {
                value: true,
                message: "Nombre es requerido",
            },
            maxLength: 25,
            minLength: 2,
            })}
            />
            {errors.name?.type === "required" &&  <Alert severity="error">Password es requerido</Alert>}
            {errors.name?.type === "minLength" &&  <Alert severity="error">Password debe ser mayor a 2 caracteres</Alert>}
            {errors.name?.type === "maxLength" &&  <Alert severity="error">Password debe ser menor a 25 caracteres</Alert>}
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
)}
