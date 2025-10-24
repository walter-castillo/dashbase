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

/**
 * Componente reutilizable para descargar archivos de estudios.
 *
 * @param {string} ID - UID del estudio.
 * @param {boolean} enabled - Si está habilitado o no.
 * @param {string} format - Tipo de formato a descargar ("jpg" | "dcm" | "zip" | etc).
 * @param {string} label - Texto del tooltip opcional.
 */
const DownloadButton = ({ ID, enabled, format = "jpg", label , patient}) => {
  const [loading, setLoading] = useState(false);
  const isEnabled = !!(ID && enabled && !loading);

  const handleDownload = async (e) => {
    if (!isEnabled) {
      e.preventDefault();
      return;
    }

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
      const filename = `estudio.zip`
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
