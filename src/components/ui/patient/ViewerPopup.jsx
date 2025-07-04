// ViewerPopup.jsx
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PatientAxios } from "../../../config/PatientAxios";

const theme = createTheme();

const ViewerPopup = ({ studyUID }) => {
  const [loading, setLoading] = useState(true);
  const [studyInstanceUID, setStudyInstanceUID] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientAxios.post("/viewer2", { studyUID });
        const { study } = response.data;
        if (study?.studyInstanceUID) {
          setStudyInstanceUID(study.studyInstanceUID);
        } else {
          setError("Estudio no encontrado.");
        }
      } catch (error) {
        console.error("Error al cargar el estudio:", error);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studyUID]);

  return (
    <ThemeProvider theme={theme}>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
          <Typography ml={2}>Cargando visor DICOM...</Typography>
        </Box>
      ) : error ? (
        <Box p={4}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <iframe
          title="OHIF Viewer"
          src={`http://localhost:8042/ohif/viewer?StudyInstanceUIDs=${studyInstanceUID}`}
          width="100%"
          height="100%"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </ThemeProvider>
  );
};

export default ViewerPopup;
