// EyeLabPreviewButton.jsx
import {
  Tooltip,
  Dialog,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

import { formatDate } from "../../../utils/formatDate";

export default function ButtonVerLab({ est, fetcher, endpoint }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);

  const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = async () => {
    if (!est) return;

    if (mobile) {
      try {
        const res = await fetcher.get(`${endpoint}${est.Study.ID}`, {
          responseType: "blob",
        });
        const blobUrl = URL.createObjectURL(res.data);
        const fileName = `${est.Patient.PatientID}-${est.Patient.PatientName}-${est.Study.AccessionNumber}.pdf`;

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("❌ Error descarga móvil:", err);
      }
      return;
    }

    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    let tempBlob = null;

    const fetchPdf = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetcher.get(`${endpoint}${est.Study.ID}`, {
          responseType: "blob",
        });
        tempBlob = URL.createObjectURL(res.data);
        setPdfUrl(tempBlob);
      } catch (err) {
        console.error("❌ Error al cargar PDF:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (tempBlob) URL.revokeObjectURL(tempBlob);
      setPdfUrl(null);
      setError(false);
    };
  }, [open]);

  return (
    <>
      {/* --- BOTÓN CON ESTILO DE LABORATORIO --- */}
      <Tooltip title="Ver Laboratorio">
        <IconButton
          onClick={handleClick}
          aria-label="Ver Lab"
          sx={{ position: "relative" }}
        >
          <PreviewOutlinedIcon
            sx={{
              color: "#2fd332f0",
              cursor: "pointer",
              transition: "0.2s",
              fontSize: 22,
              "&:hover": {
                color: "#2fd36af0",
                transform: "scale(1.25)",
              },
            }}
          />
        </IconButton>
      </Tooltip>

      {/* --- VISOR INTERNO --- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        {/* HEADER */}
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
            {`Laboratorio - N° ${
              est?.Study.AccessionNumber || ""
            }, ${formatDate(est?.Study.StudyDate)}`}
          </h3>

          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* LOADER */}
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

        {/* ERROR */}
        {!loading && error && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            gap={2}
          >
            <Typography color="error" variant="h6">
              No se pudo cargar el PDF 😕
            </Typography>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </Box>
        )}

        {/* PDF */}
        {pdfUrl && !error && (
          <iframe
            src={pdfUrl}
            style={{ border: "none", width: "100%", height: "100%" }}
            title="Laboratorio PDF"
          />
        )}
      </Dialog>
    </>
  );
}
