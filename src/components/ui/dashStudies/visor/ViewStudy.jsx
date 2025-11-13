import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

export  function ViewStudyPage() {
  const { id, token } = useParams(); // <-- ID dinámico del estudio

  const viewerUrl = `http://localhost:3000/visor/stone-webviewer/index.html?study=${id}`;
console.log( viewerUrl, "desde ViewStudyPage");
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
