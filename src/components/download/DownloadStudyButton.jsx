import { useState } from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams, useSearchParams } from "react-router-dom";

const styles = {
  icon: (enabled) => ({
    color: enabled ? "#1976d2" : "#ccc",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.5,
  }),
};

/**
 * Componente de descarga con ventana emergente + renombrado de ZIP
 *
 * @param {Object} props
 * @param {Object} props.study
 * @param {boolean} props.enabled
 * @param {string} props.format
 * @param {string} props.label
 * @param {Object} props.patient
 * @param {function} props.downloadFn - async (ID, format, token) => Blob
 */
const DownloadStudyButton = ({
  study,
  enabled,
  format = "jpg",
  label,
  patient,
  downloadFn,
}) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const token = params.token || searchParams.get("token");

  const ID = format === "dcm" ? study?.ID : study?.StudyInstanceUID;
  const [loading, setLoading] = useState(false);
  const isEnabled = !!(ID && enabled && !loading);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!isEnabled) return;
    setLoading(true);

    // Abrir popup
    const popup = window.open("", "_blank", "width=400,height=220");
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Descargando...</title>
            <style>
              body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f7f9fc; }
              h3 { color: #1976d2; }
              p { color: #555; font-size: 14px; }
              .spinner { border: 4px solid #eee; border-top: 4px solid #1976d2; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-top: 10px; }
              @keyframes spin { 100% { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <h3>📦 Preparando descarga...</h3>
            <div class="spinner"></div>
            <p>Por favor espera unos segundos...</p>
          </body>
        </html>
      `);
    }

    try {
      const blob = await downloadFn(ID, format, token);

      const fallbackFilename = `${patient?.PatientID || "Paciente"}-${
        patient?.PatientName?.replaceAll(" ", "_") || "SinNombre"
      }-${study?.AccessionNumber || "Estudio"}-${format}.zip`;

      const url = window.URL.createObjectURL(blob);

      if (popup && !popup.closed) {
        popup.document.body.innerHTML = `
          <h3>✅ Descarga lista</h3>
          <p>Tu archivo <b>${fallbackFilename}</b> se descargará automáticamente.</p>
          <p>Esta ventana se cerrará en unos segundos.</p>
        `;
        const link = popup.document.createElement("a");
        link.href = url;
        link.download = fallbackFilename;
        link.click();
        setTimeout(() => popup.close(), 4000);
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = fallbackFilename;
        a.click();
      }

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar:", err);
      if (popup && !popup.closed) {
        popup.document.body.innerHTML = `
          <h3 style="color:red;">❌ Error</h3>
          <p>No se pudo completar la descarga.</p>
        `;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip
      title={
        loading
          ? "Descargando..."
          : isEnabled
          ? label || `Descargar ${format.toUpperCase()}`
          : "No disponible"
      }
    >
      <span>
        <IconButton onClick={handleDownload} disabled={!isEnabled}>
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#2cdb26a3" }} />
          ) : (
            <DownloadIcon sx={styles.icon(isEnabled)} />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default DownloadStudyButton;
