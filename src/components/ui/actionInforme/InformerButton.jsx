import {
  Tooltip,
  Dialog,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
// import { formatDate } from "../../utils/formatDate";
// import { dashAxios } from "../../config/axiosClients";
import { formatDate } from "../../../utils/formatDate";
import { dashAxios } from "../../../config/axiosClients";



export default function InformeButton({
  est,
  fetcher = dashAxios,
  endpoint = "/dashboard/informe/ver/",
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);

  const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const handleClick = async () => {
    if (!est) return;
    if (mobile) {
      // descarga directa en móviles
      try {
        const res = await fetcher.get(`${endpoint}${est.Study.ID}`, {
          responseType: "blob",
        });
        const blobUrl = URL.createObjectURL(res.data);
        const fileName = `${est.Patient.PatientID}-${est.Patient.PatientName}-${est.Study.AccessionNumber}.pdf`;

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("❌ Error al descargar PDF:", err);
      }
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!open) return;
    let blobUrlTemp = null;

    const fetchPdf = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetcher.get(`${endpoint}${est.Study.ID}`, {
          responseType: "blob",
        });
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
  }, [open]);

  return (
    <>
      <Tooltip title="Ver informe">
        <DescriptionIcon
          fontSize="small"
          color="primary"
          sx={{ cursor: "pointer", mr: 2, color: "#9c27b0" }}
          onClick={handleClick}
        />
      </Tooltip>

      {/* Viewer interno */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen
        disableEnforceFocus
        disableRestoreFocus
      >
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
            {`Informe - N° ${est.Study.AccessionNumber || ""}, ${formatDate(
              est.Study.StudyDate
            )}`}
          </h3>
          <IconButton onClick={() => setOpen(false)}>
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
            <Button variant="outlined" onClick={() => setOpen(false)}>
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
            }}
            title="Informe PDF"
          />
        )}
      </Dialog>
    </>
  );
}
