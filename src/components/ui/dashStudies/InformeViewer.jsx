import { Dialog, IconButton, CircularProgress, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { dashAxios } from "../../../config/DashAxios";

export default function InformeViewer({ open, onClose, selectedStudy }) {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  // hooks siempre se llaman, incluso si selectedStudy es null

/*   useEffect(() => {
    if (!open || !selectedStudy) return;

    const { Study } = selectedStudy;
    setLoading(true);

    const fetchPdf = async () => {
      try {
        const response = await dashAxios.get(`/dashboard/informe/${Study.ID}`, {
          responseType: "blob",
        });
        const blobUrl = URL.createObjectURL(response.data);
        setPdfUrl(blobUrl);
      } catch (err) {
        console.error("Error al cargar PDF:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    };
  }, [open, selectedStudy]); */

  useEffect(() => {
    if (!open || !selectedStudy) return;

    const { Study } = selectedStudy;
    setLoading(true);

    let blobUrlTemp = null;

    const fetchPdf = async () => {
      try {
        const response = await dashAxios.get(`/dashboard/informe/${Study.ID}`, {
          responseType: "blob",
        });
        blobUrlTemp = URL.createObjectURL(response.data);
        setPdfUrl(blobUrlTemp);
      } catch (err) {
        console.error("Error al cargar PDF:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (blobUrlTemp) URL.revokeObjectURL(blobUrlTemp);
      setPdfUrl(null);
    };
  }, [open, selectedStudy]);


  // Render
  if (!selectedStudy) return null; // ahora es solo render, hooks ya fueron llamados

  const { Patient, Study } = selectedStudy;

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h3 style={{ margin: 0 }}>
          {`Informe de ${Patient.PatientName} - N° ${
            Study.AccessionNumber
          }, ${formatDate(Study.StudyDate)}`}
        </h3>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Loader */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Iframe con PDF */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            display: loading ? "none" : "block",
          }}
          title="Informe PDF"
        />
      )}
    </Dialog>
  );
}
