import { Dialog, IconButton, CircularProgress, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";
import { dashAxios } from "../../config/DashAxios";

export default function InformeViewerIframe({ open, onClose, selectedStudy }) {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!open || !selectedStudy) return;

    const { Study } = selectedStudy;
    let blobUrlTemp = null;

    const fetchPdf = async () => {
      setLoading(true);
      try {
        const res = await dashAxios.get(`/dashboard/informe/ver/${Study.ID}`, {
          responseType: "blob",
        });
        blobUrlTemp = URL.createObjectURL(res.data);
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

  if (!selectedStudy) return null;

  const { Patient, Study } = selectedStudy;

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        bgcolor="#f5f5f5"
      >
        <h3 style={{ margin: 0 }}>
          Informe de {Patient.PatientName} - N° {Study.AccessionNumber},{" "}
          {formatDate(Study.StudyDate)}
        </h3>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Loader o PDF */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        pdfUrl && (
          <iframe
            src={pdfUrl}
            title="Informe PDF"
            style={{
              border: "none",
              width: "100%",
              height: "100%",
            }}
          />
        )
      )}
    </Dialog>
  );
}
