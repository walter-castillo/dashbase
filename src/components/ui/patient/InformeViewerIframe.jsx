import { Dialog, IconButton, CircularProgress, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";

import { PatientAxios } from "../../../config/PatientAxios";
import { dashAxios } from "../../../config/DashAxios";

export default function InformeViewerIframe({ open, onClose, selectedStudy }) {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    if (!open || !selectedStudy) return;

    let blobUrlTemp = null;

    const fetchPdf = async () => {
      setLoading(true);
      try {
        const res = await PatientAxios.get(
          `/informe/ver/${selectedStudy.ID}`,
          { responseType: "blob" }
        );
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
  }, [open]);
  // }, [open, selectedStudy]);

  if (!selectedStudy) return null;

  const { Study } = selectedStudy;

  return (
    <Dialog
      open={open}
      onClose={() => {
        document.activeElement?.blur(); // Limpia foco antes de cerrar
        onClose();
      }}
      fullScreen
      disableEnforceFocus
      disableRestoreFocus
    >
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
          {`Informe - N° ${selectedStudy?.AccessionNumber}, ${formatDate(
            selectedStudy.StudyDate
          )}`}
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
      {/* PDF */}
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
