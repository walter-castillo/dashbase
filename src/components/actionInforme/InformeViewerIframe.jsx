import {
  Dialog,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { formatDate } from "../../utils/formatDate";

export default function InformeViewerIframe({
  open,
  onClose,
  selectedStudy,
  fetcher,
  endpoint,
}) {
  
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open || !selectedStudy || !fetcher || !endpoint) return;
    let blobUrlTemp = null;
    const fetchPdf = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetcher.get(endpoint, { responseType: "blob" });
        blobUrlTemp = URL.createObjectURL(res.data);
        setPdfUrl(blobUrlTemp);
      } catch (err) {
        console.error("❌ Error al cargar PDF:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (blobUrlTemp) URL.revokeObjectURL(blobUrlTemp);
      setPdfUrl(null);
      setError(false);
    };
  }, [open, selectedStudy, fetcher, endpoint]);

  if (!selectedStudy) return null;

  return (
    <Dialog
      open={open}
      onClose={() => {
        document.activeElement?.blur();
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
          {`Informe - N° ${selectedStudy?.AccessionNumber || ""}, ${formatDate(
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

      {/* Error */}
      {!loading && error && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          textAlign="center"
          gap={2}
        >
          <Typography color="error" variant="h6">
            No se pudo cargar el informe PDF 😕
          </Typography>
          <Button variant="outlined" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      )}

      {/* PDF */}
      {pdfUrl && !error && (
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
