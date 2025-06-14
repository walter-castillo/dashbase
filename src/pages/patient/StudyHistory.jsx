import { Box, Typography } from '@mui/material';
import PatientLayout from '../../layouts/PatientLayout';
import StudyTable from '../../components/ui/patient/StudyTable';

const styles = {
  container: {
    maxWidth: '1000px',
    mx: 'auto',
    mt: 4,
    px: 0,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#1976d2',
    mb: 3,
  },
};

const StudyHistory = () => {
  const patient = JSON.parse(localStorage.getItem('patientSession'));
  const studies = JSON.parse(localStorage.getItem('studies')) || [];

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        Historial de Estudios
      </Typography>

      <StudyTable studies={studies} />
    </Box>
  );
};

export default StudyHistory;
