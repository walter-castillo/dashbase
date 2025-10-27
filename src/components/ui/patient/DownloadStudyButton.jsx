import { useState } from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { PatientAxios } from "../../../config/PatientAxios";

const baseURL = import.meta.env.VITE_URL;

const styles = {
  icon: (enabled) => ({
    color: enabled ? "#1976d2" : "#ccc",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.5,
  }),
};

/**
 * Componente reutilizable para descargar archivos de estudios.
 *
 * @param {object} study - Objeto del estudio DICOM.
 * @param {boolean} enabled - Si está habilitado o no.
 * @param {string} format - Tipo de formato a descargar ("jpg" | "dcm" | "zip" | etc).
 * @param {string} label - Texto del tooltip opcional.
 * @param {object} patient - Datos del paciente (para armar nombre de archivo o logs).
 */
const DownloadButton = ({ study, enabled, format, label, patient }) => {
  const ID = format === "dcm" ? study?.ID : study?.StudyInstanceUID;
  // const { ID } = study;
  const [loading, setLoading] = useState(false);
  const isEnabled = !!(ID && enabled && !loading);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!isEnabled) return;

    setLoading(true);

    try {
      // 🔹 Construir URL absoluta del backend
      const downloadUrl = `${baseURL}patient/study/download/${format}/${ID}`;

      // 🔹 Abrir ventana temporal para disparar la descarga
      const popup = window.open("", "_blank", "width=400,height=220");

      if (popup) {
        // Se escribe HTML básico dentro de la ventana
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
              </style>
            </head>
            <body>
              <h3>📦 Descargando estudio...</h3>
              <p>Tu descarga debería comenzar automáticamente.</p>
              <p>Esta ventana se cerrará en unos segundos.</p>
              <script>
                window.location.href = "${downloadUrl}";
                setTimeout(() => window.close(), 5000);
              </script>
            </body>
          </html>
        `);
      } else {
        // Fallback si el popup es bloqueado por el navegador
        window.location.href = downloadUrl;
      }
    } catch (err) {
      console.error("Error al iniciar la descarga:", err);
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
