import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { PatientAxios } from '../../config/PatientAxios';
import { useNavigate } from 'react-router-dom';

const LoginPatient = () => {
  const [code, setCode] = useState('9IPA8S');
  const [dni, setDni] = useState('5394119');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await PatientAxios.post('/validateCode', { code, dni });
      console.log(res.data);
      localStorage.setItem('patientSession', JSON.stringify({ dni, patientId: res.data.patientId }));
      localStorage.setItem('studies', JSON.stringify(res.data.studies));
      navigate('/patient');
    } catch (err) {
      alert(err.response?.data?.error || 'Error'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        height: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" gutterBottom>Acceso a Estudios</Typography>
        <TextField
          fullWidth
          label="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Código de Acceso"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          margin="normal"
        />
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
        </Button>
      </Container>
    </Box>
  );
};

export default LoginPatient;
