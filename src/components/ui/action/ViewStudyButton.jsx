import { useState } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  Slide,
  Box,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const Transition = Slide;

export default function ViewStudyButton({ studyId, endpoint }) {
  const urlFront = import.meta.env.VITE_URL_FRONT;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setLoading(true);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const viewerUrl = `${urlFront}${endpoint}${studyId}`;
console.log( viewerUrl, "desde ViewStudyButton");
  return (
    <>
      <Tooltip title="Ver estudio">
        <IconButton size="small" onClick={handleOpen}>
          <VisibilityIcon
            sx={{
              color: "#2faed3",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": {
                color: "#6fbdd4",
                transform: "scale(1.25)",
              },
            }}
          />
        </IconButton>
      </Tooltip>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        onContextMenu={(e) => e.preventDefault()}
        TransitionComponent={Transition}
        maxWidth={false}
        PaperProps={{
          sx: {
            m: 0,
            p: 0,
            borderRadius: 0,
            overflow: "hidden",
            backgroundColor: "black",
          },
        }}
        sx={{
          m: 0,
          p: 0,
          "& .MuiDialog-container": { m: 0, p: 0 },
          "& .MuiDialog-paper": {
            m: 0,
            p: 0,
            borderRadius: 0,
            boxShadow: "none",
          },
          "& .MuiBox-root": { m: 0, p: 0 },
        }}
      >
        {/* 🔘 Botón circular centrado arriba */}
        <Box
          sx={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: "rgba(0,0,0,0.5)",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Cerrar visor">
            <IconButton
              onClick={handleClose}
              size="large"
              sx={{
                color: "#fff",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Spinner mientras carga */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 5,
            }}
          >
            <CircularProgress sx={{ color: "#2faed3" }} />
          </Box>
        )}

        {/* Iframe fullscreen */}
        <iframe
          src={viewerUrl}
          title="Visor DICOM"
          onLoad={() => setLoading(false)}
          style={{
            width: "100vw",
            height: "100vh",
            border: "none",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        />
      </Dialog>
    </>
  );
}
