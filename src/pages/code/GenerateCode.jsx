import { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress
} from '@mui/material';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { dashAxios } from '../../config/DashAxios';

const GenerateCode = () => {
  const [dni, setDni] = useState(5394119);
  const [expiresInMinutes, setExpiresInMinutes] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await dashAxios.post('dashboard/generateCode', {
        dni,
        expiresInMinutes
      });

      const { code: generatedCode, expiresAt } = res.data;
      setCode(res.data);
      setExpiresInMinutes('');

      const formattedDate = new Date(expiresAt).toLocaleString();
      const accessUrl = `https://tusistema.com/acceso/${generatedCode}`; 

      // Generar el QR Code como data URL
      const qrDataUrl = await QRCode.toDataURL(accessUrl);

      // Crear el PDF
      const doc = new jsPDF();

      // Título
      doc.setFontSize(14);
      doc.text("Código de Acceso ", 20, 20);

      // Información básica
      doc.setFontSize(12);
      doc.text(`DNI del paciente: ${dni}`, 20, 40);
      doc.text(`Código: ${generatedCode}`, 20, 50);
      doc.text(`Expira el: ${formattedDate}`, 20, 60);
      doc.textWithLink(`${accessUrl}`, 50, 75, { url: accessUrl });

      // QR code
      doc.addImage(qrDataUrl, 'PNG', 60, 85, 60, 60);

      // Guardar PDF
      doc.save(`codigo_acceso_${dni}.pdf`);

    } catch (err) {
      alert(err.response?.data?.error || 'Error al generar el código');
    } finally {
      setLoading(false);
    }
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
        type="number"
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
        disabled={!expiresInMinutes || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generar'}
        
      </Button>

      {code && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Código generado: {code.code}
          <br />
          Expira: {new Date(code.expiresAt).toLocaleString()}
        </Typography>
      )}
    </Container>
  );
};

export default GenerateCode;




/* import { useState } from 'react';
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
import  {dashAxios}  from '../../config/DashAxios';

const GenerateCode = () => {
  const [dni, setDni] = useState(5394119);
  const [expiresInMinutes, setExpiresInMinutes] = useState('');
  const [code, setCode] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await dashAxios.post('dashboard/generateCode', { dni, expiresInMinutes });
      console.log("Fecha legible:", new Date(res.data.expiresAt).toLocaleString());
      setCode(res.data);
      // setDni("");
      setExpiresInMinutes("");
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
          Código generado: {code.code}
          <br />
          Fecha de expiración: {new Date(code.expiresAt).toLocaleString()}
        </Typography>
      )}
    </Container>
  );
};

export default GenerateCode;
 */