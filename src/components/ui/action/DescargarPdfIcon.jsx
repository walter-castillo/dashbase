import { useState } from "react";
import { Tooltip, CircularProgress, Box } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function DescargarPdfIcon({ onClick }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onClick();
    } catch (err) {
      console.error("❌ Error al generar PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={loading ? "Generando PDF..." : "Descargar PDF del estudio"}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%", // centra verticalmente en la celda
          width: "100%", // opcional: ajusta si querés más espacio de clic
          cursor: loading ? "not-allowed" : "pointer",
          position: "relative",
          py: 1.2, // un poquito de aire vertical
        }}
        onClick={!loading ? handleClick : undefined}
      >
        {loading ? (
          <CircularProgress size={20} color="error" thickness={5} />
        ) : (
          <PictureAsPdfIcon
            fontSize="small"
            color="error"
            sx={{
              transition: "0.2s",
              "&:hover": { color: "#d32f2f", transform: "scale(1.25)" },
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}
