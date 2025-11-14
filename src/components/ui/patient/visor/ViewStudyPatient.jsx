import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
const urlBackEnd = import.meta.env.VITE_URL_BACKEND;

export  function ViewStudyPatient() {
  const { id } = useParams(); // <-- ID dinámico del estudio
  const endpoint = "view/patient";
  const viewerUrl = `${urlBackEnd}/${endpoint}/stone-webviewer/index.html?study=${id}`;
  useEffect(() => {
    // Actualiza el título dinámicamente
    document.title = `Visor DICOM - Estudio ${id || ""}`;
    return () => {
      // Opcional: restaurar el título anterior al desmontar
      document.title = "Visor DICOM";
    };
  }, [id]);
 
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        p: "15px",
        m: 0,
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <iframe
        src={viewerUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
        }}
        title="Stone Viewer"
      />
    </Box>
  );
}
