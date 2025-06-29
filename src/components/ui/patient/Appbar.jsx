import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';

const Appbar = ({patient}) => {
const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {await PatientAxios.post('/logout') } 
    catch (error) { console.error('Error al cerrar sesión:', error)}
    finally {navigate('/loginPatient')}
  };

  return (
      <AppBar position="static">
         <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
               Portal del Paciente
            </Typography>
            <IconButton onClick={handleMenu} color="inherit">
               <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
               <MenuItem disabled>
                  Nombre: {patient?.name.replaceAll("^", " ").replace(/\s+/g, ' ').trim() || 'Desconocido'}
               </MenuItem>
               <MenuItem disabled>
                  DNI: {Number(patient?.id || 0).toLocaleString("es-AR")}
               </MenuItem>
               <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
         </Toolbar>
    </AppBar>
  )
}

export default Appbar