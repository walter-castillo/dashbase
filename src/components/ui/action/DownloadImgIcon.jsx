import { useState } from "react";
import {
  Tooltip,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

export default function DownloadImgIcon({
  fetcher,
  endpoint,
  id,
  label = "DCM",
  tooltip = "Descargar archivo",
  color = "#1976d2", // azul por defecto
  fileType = "zip", // tipo MIME por defecto
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      // 📦 Petición POST con el ID en el body
      const res = await fetcher.post(
        endpoint,
        { studyId: id },
        { responseType: "blob" }
      );

      // 💾 Crear blob con tipo de archivo dinámico
      const blob = new Blob([res.data], { type: `application/${fileType}` });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // 📄 Nombre del archivo (si viene desde headers)

      let filename = `informe_${id}.pdf`;

      const contentDisposition = res.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(
          /filename\*=UTF-8''(.+)|filename="?([^"]+)"?/
        );
        if (match) {
          filename = decodeURIComponent(match[1] || match[2]);
        }
      }

      // const filename =
      //   res.headers["content-disposition"]
      //     ?.split("filename=")[1]
      //     ?.replace(/['"]/g, "") || `study_${id}.${fileType}`;

      link.download = decodeURIComponent(filename);
      link.click();
      URL.revokeObjectURL(link.href);

      setSuccess(true);
    } catch (err) {
      console.error(`❌ Error al descargar ${label}:`, err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title={loading ? "Preparando descarga..." : tooltip}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 32,
            width: 32,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s",
            "&:hover": {
              transform: "scale(1.1)",
              filter: "brightness(1.2)",
            },
          }}
          onClick={!loading ? handleDownload : undefined}
        >
          {loading ? (
            <CircularProgress size={18} color="primary" thickness={5} />
          ) : (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.55rem",
                  color: color,
                  mb: "-2px",
                }}
              >
                {label}
              </Typography>

              {/* Flecha SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={color}
              >
                <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-6 2v2h12v-2H6z" />
              </svg>
            </>
          )}
        </Box>
      </Tooltip>

      {/* ✅ Éxito */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`${label} descargado correctamente`}
        </Alert>
      </Snackbar>

      {/* ⚠️ Error */}
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {`Error al descargar ${label}`}
        </Alert>
      </Snackbar>
    </>
  );
}
