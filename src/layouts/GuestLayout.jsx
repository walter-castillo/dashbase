import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvitadoAxios } from "../config/InvitadoAxios";
import GuestTableStudies from "../components/ui/guest/GuestTableStudies";
import { Loading } from "../components/ui/Loading";
import Appbar from "../components/ui/patient/Appbar";

const GuestLayout = () => {
  const { token } = useParams();
  const [patient, setPatient] = useState(null);
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Guarda el token si viene por URL
  (token) && sessionStorage.setItem("guestToken", token);
    


    const fetchStudies = async () => {
      try {
        const response = await InvitadoAxios.get(`/invitado/${token}`);
        console.log(sessionStorage.getItem("guestToken"));
        const { patient, study } = response.data;
        setPatient(patient);
        setStudies(study);
      } catch (error) {
        console.error("Error al cargar estudios:", error);
        // navigate("/");
      }
    };

    fetchStudies();
  }, [token, navigate]);

  if (!studies || !patient) return <Loading />;

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

          <GuestTableStudies studies={studies} patient={patient} />
        </Box>
      </Box>
    </Box>
  );
};

export default GuestLayout;
