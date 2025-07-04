import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { PatientAxios } from '../../config/PatientAxios';
import { useNavigate } from 'react-router-dom';

const LoginPatient = () => {
  // const [code, setCode] = useState('G9WYCA');
  const [code, setCode] = useState('QTZQ8A');
  const [dni, setDni] = useState('5394119');
  // const [dni, setDni] = useState('39814413');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await PatientAxios.post('/validateCode', { code, dni });   
      navigate('/patient');
    } catch (err) {
      console.log(err);
      alert('FALLÓ: ' + JSON.stringify(err.response?.data || err.message));
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
