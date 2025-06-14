import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StudyTable from '../../components/ui/patient/StudyTable';

const styles = {
  container: {
    maxWidth: '900px',
    mx: 'auto',
    mt: 4,
    px: 0,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  button: {
    fontWeight: 'bold',
    borderRadius: 2,
    textTransform: 'none',
    px: 4,
    py: 1,
    boxShadow: 3,
  },
};

const PatientDashboard = () => {
  const patient = JSON.parse(localStorage.getItem('patientSession'));
  const studies = JSON.parse(localStorage.getItem('studies')) || [];

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        ¡Hola, {patient?.name || 'Paciente'}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        DNI: {patient?.dni || 'No disponible'}
      </Typography>

      <StudyTable studies={studies.slice(0, 1)} />

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/patient/studies"
          sx={styles.button}
        >
          Ver historial...
        </Button>
      </Box>
    </Box>
  );
};

export default PatientDashboard;
