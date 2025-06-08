import { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { PatientAxios } from '../../config/PatientAxios';

const GenerateCode = () => {
  const [dni, setDni] = useState(5394119);
  const [expiresInMinutes, setExpiresInMinutes] = useState('');
  const [code, setCode] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await PatientAxios.post('/generateCode', { dni, expiresInMinutes });
      

      // console.log("Fecha legible:", new Date(res.data.expiresAt).toLocaleString());

      setCode(res.data.code);
    } catch (err) { alert(err.response?.data?.error || 'Error');}
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>Generar Código de Acceso</Typography>

      <TextField
        fullWidth
        label="DNI del paciente"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Tiempo de expiración</InputLabel>
        <Select
          value={expiresInMinutes}
          onChange={(e) => setExpiresInMinutes(e.target.value)}
          label="Tiempo de expiración"
        >
          <MenuItem value={60}>1 hora</MenuItem>
          <MenuItem value={120}>2 horas</MenuItem>
          <MenuItem value={1440}>1 día</MenuItem>
          <MenuItem value={10080}>1 semana</MenuItem>
        </Select>
      </FormControl>

      <Button
        fullWidth
        variant="contained"
        onClick={handleGenerate}
        disabled={!expiresInMinutes}
      >
        Generar
      </Button>

      {code && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Código generado: {code}
        </Typography>
      )}
    </Container>
  );
};

export default GenerateCode;
