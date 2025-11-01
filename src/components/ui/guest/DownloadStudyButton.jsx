import { useState } from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { PatientAxios } from "../../../config/PatientAxios";
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
 */
const DownloadStudyButton = ({
  study,
  enabled,
  format = "jpg",
  label,
  patient,
}) => {
  const params = useParams(); // { token: "..." } si está en la ruta
  const [searchParams] = useSearchParams(); // ?token=...

  const token = params.token || searchParams.get("token");

  console.log("Token:", token);
  const ID = format === "dcm" ? study?.ID : study?.StudyInstanceUID;
  // console.log(ID, format);
  const [loading, setLoading] = useState(false);
  const isEnabled = !!(ID && enabled && !loading);

  const handleDownload = async (e) => {
    
    e.preventDefault();
    if (!isEnabled) return;
    setLoading(true);

    // 🪟 Abrir el popup apenas se hace clic
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
        
      // 🔹 Descargar desde el backend (esperando el blob)
      const response = await PatientAxios.get(
        `/study/download/${format}/${ID}`,
        { responseType: "blob" }
      );

      // 🔹 Intentar obtener nombre del backend
      const contentDisposition = response.headers["content-disposition"];
      const filenameMatch = contentDisposition?.match(/filename="?(.+?)"?$/);

      // 🔹 Fallback: usar nombre personalizado
      const fallbackFilename = `${patient?.PatientID || "Paciente"}-${
        patient?.PatientName?.replaceAll(" ", "_") || "SinNombre"
      }-${study?.AccessionNumber || "Estudio"}-${format}.zip`;

      const filename = filenameMatch?.[1] || fallbackFilename;

      // 🔹 Crear blob y disparar descarga
      const blobUrl = window.URL.createObjectURL(response.data);

      if (popup && !popup.closed) {
        popup.document.body.innerHTML = `
          <h3>✅ Descarga lista</h3>
          <p>Tu archivo <b>${filename}</b> se descargará automáticamente.</p>
          <p>Esta ventana se cerrará en unos segundos.</p>
        `;

        const link = popup.document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        link.click();

        setTimeout(() => popup.close(), 4000);
      } else {
        // Fallback si popup bloqueado
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        a.click();
      }

      // 🔹 Liberar memoria
      window.URL.revokeObjectURL(blobUrl);
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

/* import { useState } from "react";
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


//  * Componente reutilizable para descargar archivos de estudios.
//  *
//  * @param {string} ID - UID del estudio.
//  * @param {boolean} enabled - Si está habilitado o no.
//  * @param {string} format - Tipo de formato a descargar ("jpg" | "dcm" | "zip" | etc).
//  * @param {string} label - Texto del tooltip opcional.

const DownloadButton = ({ study, enabled, format = "jpg", label , patient}) => {
  const { ID } = study;
  const [loading, setLoading] = useState(false);
  const isEnabled = !!(ID && enabled && !loading);

  const handleDownload = async (e) => {
    if (!isEnabled) {
      e.preventDefault();
      return;
    }
    // console.log(patient, study);
    try {
      setLoading(true);
      const response = await PatientAxios.get(
        `/study/download/${format}/${ID}`,
        {
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const filenameMatch = contentDisposition?.match(/filename="?(.+?)"?$/);
      const filename =  `${patient.PatientID}-${patient.PatientName.replaceAll(" ", "_")}-${study.AccessionNumber}-${format}`;
              // filenameMatch?.[1] || `estudio.${format === "jpg" ? "zip" : format}`;

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error en la descarga:", err);
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
 */
