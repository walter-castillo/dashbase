import { useState } from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { PatientAxios } from "../../../config/PatientAxios";

const styles = {
  icon: (enabled) => ({
    color: enabled ? "#1976d2" : "#ccc",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.5,
  }),
};

const DownloadButton = ({ study, enabled, format = "jpg", label, patient }) => {
  const ID = format === "dcm" ? study?.ID : study?.StudyInstanceUID;
  const [loading, setLoading] = useState(false);
  const isEnabled = !!(ID && enabled && !loading);
console.log(study);
  const handleDownload = async (e) => {
    e.preventDefault();
    if (!isEnabled) return;
    setLoading(true);

    // 🪟 Abre el popup de inmediato
    const popup = window.open("", "_blank", "width=400,height=220");

    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Descargando...</title>
            <style>
              body {
                font-family: sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                background: #f7f9fc;
              }
              h3 { color: #1976d2; }
              p { color: #555; font-size: 14px; }
              .spinner {
                border: 4px solid #eee;
                border-top: 4px solid #1976d2;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin-top: 10px;
              }
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
      // 🔹 Obtener el archivo desde backend
      const response = await PatientAxios.get(
        `/study/download/${format}/${ID}`,
        { responseType: "blob" }
      );

      // 🔹 Nombre de archivo personalizado
      const cleanName = (str = "") =>
        str
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "_")
          .trim();
      const filename = `${patient?.PatientID || "Paciente"}-${cleanName(
        patient?.PatientName || ""
      )}-${study?.AccessionNumber || "Estudio"}_${format}.zip`;

      const blobUrl = window.URL.createObjectURL(response.data);

      if (popup && !popup.closed) {
        // 🔹 Actualiza el popup para mostrar progreso final
        popup.document.body.innerHTML = `
          <h3>✅ Descarga lista</h3>
          <p>Tu archivo se descargará automáticamente.</p>
          <p>Esta ventana se cerrará en unos segundos.</p>
        `;

        // 🔹 Dispara la descarga dentro del popup
        const link = popup.document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        link.click();

        setTimeout(() => popup.close(), 4000);
      } else {
        // Fallback si el popup fue bloqueado
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        a.click();
      }

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error al descargar:", err);
      if (popup && !popup.closed) {
        popup.document.body.innerHTML = `
          <h3 style="color:red;">❌ Error</h3>
          <p>No se pudo completar la descarga.</p>
          <p>Intenta nuevamente.</p>
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

export default DownloadButton;
