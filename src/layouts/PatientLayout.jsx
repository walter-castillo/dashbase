import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PatientLayout = ({ children, patient }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const navigate = useNavigate();

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
              <MenuItem disabled>DNI: {patient?.dni}</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}><Outlet /></Box>
    </Box>
  );
};

export default PatientLayout;