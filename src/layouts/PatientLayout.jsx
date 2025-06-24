import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PatientLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Recuperar paciente desde localStorage
  const patient = JSON.parse(localStorage.getItem('patientSession'));

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('patientSession');
    navigate('/loginPatient');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Portal del Paciente
          </Typography>

          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem disabled>Nombre: {patient?.name.replaceAll("^", " ").replace(/\s+/g, ' ').trim() || 'Desconocido'}</MenuItem>
              <MenuItem disabled>DNI: {Number(patient?.id).toLocaleString("es-AR")}</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PatientLayout;
