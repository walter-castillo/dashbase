import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload,
  Description,
  CheckCircle,
  Error,
  Close,
  UploadFile,
} from "@mui/icons-material";

const UpLoadPdfDialog = ({ open, onClose, studyId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Configuración de validación
  const MAX_FILE_SIZE = import.meta.env.VITE_MAX_FILE_SIZE;
  const ALLOWED_FILE_TYPES = import.meta.env.VITE_ALLOWED_FILE_TYPES;

  // Limpiar estados cuando se cierra el modal
  useEffect(() => {
    if (!open) {
      setFile(null);
      setIsHover(false);
      setError("");
      setUploadProgress(0);
    }
  }, [open]);

  const validateFile = (file) => {
    // Validar tipo de archivo
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Tipo de archivo no permitido. Solo se aceptan archivos PDF.");
      return false;
    }

    // Validar tamaño de archivo
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `El archivo es demasiado grande. Tamaño máximo: ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHover(false);
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleSelectFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
    e.target.value = ""; // permite volver a seleccionar el mismo archivo
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setUploadProgress(0);

    try {
      // Simulamos la subida con una progresión
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // En una implementación real, aquí iría la llamada a dashAxios.post
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(interval);
      setUploadProgress(100);

      if (onSuccess) onSuccess(file.name);
      setFile(null);
      onClose();
    } catch (err) {
      console.error("Error al subir PDF:", err);
      setError("❌ Error al subir el PDF. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <CloudUpload color="primary" />
        Subir informe PDF
      </DialogTitle>

      <DialogContent>
        <Box
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsHover(true);
          }}
          onDragLeave={() => setIsHover(false)}
          sx={{
            border: "2px dashed",
            borderColor: isHover
              ? "primary.main"
              : error
              ? "error.main"
              : file
              ? "success.main"
              : "grey.300",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backgroundColor: isHover
              ? "primary.light"
              : file
              ? "success.light"
              : "grey.50",
            mt: 2,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <input
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            id="pdf-upload-input"
            onChange={handleSelectFile}
          />

          {!file ? (
            <label htmlFor="pdf-upload-input" style={{ cursor: "pointer" }}>
              <Box>
                <CloudUpload
                  sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h6" gutterBottom>
                  Arrastra un PDF aquí o haz clic para seleccionarlo
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Formatos permitidos: PDF • Tamaño máximo: 10MB
                </Typography>
                <Button variant="contained" component="span" sx={{ mt: 2 }}>
                  Seleccionar archivo
                </Button>
              </Box>
            </label>
          ) : (
            <Box>
              <CheckCircle color="success" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Archivo seleccionado
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Description color="primary" />
                <Typography variant="body1" noWrap sx={{ maxWidth: "300px" }}>
                  {file.name}
                </Typography>
                <IconButton size="small" onClick={removeFile}>
                  <Close />
                </IconButton>
              </Box>
              <Chip
                label={formatFileSize(file.size)}
                variant="outlined"
                size="small"
              />

              {loading && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Subiendo: {uploadProgress}%
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={loading} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Subiendo..." : "Cargar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
  export default UpLoadPdfDialog;