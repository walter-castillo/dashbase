import React, { useEffect, useState, useRef } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PatientAxios } from "../../config/PatientAxios";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

const ViewerPopup3 = ({ studyUID, onClose }) => {
  const [state, setState] = useState({
    loading: true,
    studyInstanceUID: null,
    error: null,
    retryCount: 0,
  });
  const iframeRef = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const fetchStudyData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await PatientAxios.post("/viewer2", { studyUID });

      if (!response.data?.study?.studyInstanceUID) {
        throw new Error("El estudio no contiene un UID válido");
      }

      setState((prev) => ({
        ...prev,
        studyInstanceUID: response.data.study.studyInstanceUID,
        loading: false,
      }));
    } catch (error) {
      console.error("Error al cargar el estudio:", error);
      setState((prev) => ({
        ...prev,
        error: error.message || "Error al cargar el estudio",
        loading: false,
      }));
    }
  };

  const handleRetry = () => {
    setState((prev) => ({
      ...prev,
      retryCount: prev.retryCount + 1,
      error: null,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state.loading) {
        setState((prev) => ({
          ...prev,
          error: "El visor está tardando demasiado en cargar",
          loading: false,
        }));
      }
    }, 15000); // Timeout de 15 segundos

    fetchStudyData();

    return () => clearTimeout(timeout);
  }, [studyUID, state.retryCount]);

  useEffect(() => {
    const handleIframeMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return;
      console.log("Mensaje desde iframe:", event.data);
    };

    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={true}
        onClose={onClose}
        fullScreen={fullScreen}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          style: {
            height: fullScreen ? "100vh" : "90vh",
            width: "100%",
          },
        }}
      >
        <DialogTitle>
          Visor DICOM - Estudio {studyUID}
          {state.error && (
            <Typography color="error" variant="subtitle2">
              <ErrorIcon fontSize="small" /> {state.error}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent dividers style={{ padding: 0, overflow: "hidden" }}>
          {state.loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              minHeight="300px"
              flexDirection="column"
            >
              <CircularProgress size={60} thickness={4} />
              <Typography mt={2} variant="h6">
                Cargando visor DICOM...
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Esto puede tomar unos momentos
              </Typography>
            </Box>
          ) : state.error ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              minHeight="300px"
              flexDirection="column"
              p={4}
            >
              <ErrorIcon color="error" style={{ fontSize: 60 }} />
              <Typography variant="h6" color="error" mt={2}>
                Error al cargar el visor
              </Typography>
              <Typography align="center" mt={1}>
                {state.error}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={handleRetry}
                style={{ marginTop: 20 }}
              >
                Reintentar
              </Button>
            </Box>
          ) : (
            <iframe
              ref={iframeRef}
              title={`OHIF Viewer - ${studyUID}`}
              src={`http://localhost:3000/orthanc/ohif/viewer?StudyInstanceUIDs=${state.studyInstanceUID}`}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                minHeight: "500px",
                backgroundColor: "#f0f0f0",
              }}
              allow="fullscreen"
              loading="eager"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cerrar
          </Button>
          {!state.loading && !state.error && (
            <Button
              onClick={() =>
                iframeRef.current?.contentWindow?.location.reload()
              }
              startIcon={<RefreshIcon />}
            >
              Recargar Visor
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ViewerPopup3;
