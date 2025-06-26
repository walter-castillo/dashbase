import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientAxios } from '../config/PatientAxios';
import StudyTable from '../components/ui/patient/StudyTable';
import { Loading } from '../components/ui/Loading';

const PatientLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [patient, setPatient] = useState(null);
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await PatientAxios.post('/studies');
        const { patient, studies } = response.data;
        setPatient(patient);
        setStudies(studies);
      } catch (error) {
        console.error('Error al cargar estudios:', error);
        navigate('/loginPatient');
      }
    };
    fetchStudies();
  }, [navigate]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {await PatientAxios.post('/logout') } 
    catch (error) { console.error('Error al cerrar sesión:', error)}
    finally {navigate('/loginPatient')}
  };


if (!studies || !patient ) { return <Loading />}

  return (
    <Box>
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
              Nombre: {patient?.name?.replaceAll("^", " ").replace(/\s+/g, ' ').trim() || 'Desconocido'}
            </MenuItem>
            <MenuItem disabled>
              DNI: {Number(patient?.id || 0).toLocaleString("es-AR")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 0 }}>
        <Box sx={{
          maxWidth: '900px',
          mx: 'auto',
          mt: 4,
          px: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            ¡Hola, {patient?.name?.replaceAll("^", " ").trim() || 'Paciente'}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            DNI: {patient?.id || 'No disponible'}
          </Typography>

          <StudyTable studies={studies} />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientLayout;



/* import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
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
 */