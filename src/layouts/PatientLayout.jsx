import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientAxios } from '../config/axiosClients';
import PatientTableStudies from "../components/ui/patient/PatientTableStudies";
import { Loading } from '../components/ui/Loading';
import Appbar from '../components/ui/patient/Appbar';

const PatientLayout = () => {

  const [patient, setPatient] = useState(null);
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await PatientAxios.post('/studies');
        const { patient, studies } = response.data;
        // console.log(patient, studies);

        setPatient(patient);
        setStudies(studies);
      } catch (error) {
        console.error('Error al cargar estudios:', error);
        navigate('/loginPatient');
      }
    };
    fetchStudies();
  }, [navigate]);

if (!studies || !patient ) { return <Loading />}

  return (
    <Box>
      <Appbar patient={patient} />
      <Box sx={{ p: 0 }}>
        <Box
          sx={{
            maxWidth: "900px",
            mx: "auto",
            mt: 4,
            px: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "1.20rem", color: "#1976d2" }}
          >
            ¡Hola,{" "}
            {patient?.PatientName?.replaceAll("^", " ").trim() || "Paciente"}!
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontSize: "0.95rem", color: "#1976d2" }}
          >
            DNI:{" "}
            {patient?.PatientID.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            ) || "No disponible"}
          </Typography>

          <PatientTableStudies studies={studies} patient={patient} />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientLayout;