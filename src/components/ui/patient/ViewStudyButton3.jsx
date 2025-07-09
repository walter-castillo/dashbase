import React from "react";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewerPopup from "./ViewerPopup";

const ViewStudyButton3 = ({ studyUID, enabled }) => {
  const [open, setOpen] = React.useState(false);
  const [popupBlocked, setPopupBlocked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpenViewer = () => {
    if (!enabled || !studyUID) return;

    setLoading(true);
    setPopupBlocked(false);

    try {
      setOpen(true);
    } catch (error) {
      console.error("Error al abrir el visor:", error);
      setPopupBlocked(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseViewer = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setPopupBlocked(false);
  };

  return (
    <>
      <Tooltip
        title={
          enabled
            ? studyUID
              ? "Ver estudio DICOM"
              : "ID de estudio no disponible"
            : "Visualización no disponible"
        }
      >
        <span>
          <IconButton
            onClick={handleOpenViewer}
            disabled={!enabled || !studyUID || loading}
            size="large"
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <VisibilityIcon
                color={enabled && studyUID ? "primary" : "disabled"}
              />
            )}
          </IconButton>
        </span>
      </Tooltip>

      {open && <ViewerPopup studyUID={studyUID} onClose={handleCloseViewer} />}

      <Snackbar
        open={popupBlocked}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          ¡El navegador bloqueó la ventana emergente! Por favor, permite popups
          para este sitio.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ViewStudyButton3;
