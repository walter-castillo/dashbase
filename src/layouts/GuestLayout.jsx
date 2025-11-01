import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientAxios } from '../config/PatientAxios';
import StudyTablePatient from "../components/ui/patient/StudyTablePatient";
import { Loading } from '../components/ui/Loading';
import Appbar from '../components/ui/patient/Appbar';
import { InvitadoAxios } from '../config/InvitadoAxios';
import StudyTableGuest from '../components/ui/guest/StudyTableGuest';

const GuestLayout = () => {
  const {token} = useParams()
  // console.log(token);

  const [patient, setPatient] = useState(null);
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await InvitadoAxios.get(`/invitado/${token}`);
        // console.log(`Response data:`, response.data);
        const { patient, study } = response.data;
        // console.log(patient, studies);

        setPatient(patient);
        setStudies(study);
      } catch (error) {
        console.error('Error al cargar estudios:', error);
        navigate('/');
      }
    };
    fetchStudies();
  }, [navigate]);

if (!studies || !patient ) { return <Loading />}

  return (
    <Box>
      <Appbar patient={patient} guest={true} />
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
            ¡Acceso temporal a un estudio de:{" "}
            {patient?.PatientName?.replaceAll("^", " ").trim() || "Paciente"}!
          </Typography>


          {/* <StudyTablePatient studies={studies} patient={patient} /> */}
          <StudyTableGuest studies={studies} patient={patient} />
        </Box>
      </Box>
    </Box>
  );
};

export default GuestLayout;