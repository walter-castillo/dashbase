import { useState, useEffect } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  Slide,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const Transition = Slide;

export default function ViewStudyButton({ studyId, endpoint }) {
  const urlFront = import.meta.env.VITE_URL_FRONT;
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setLoading(true);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const viewerUrl = `${urlFront}${endpoint}${studyId}`;

  useEffect(() => {
    if (!open) return;

    let timeout;
    const handleMouseMove = () => {
      setShowBar(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowBar(false), 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [open]);

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
        {/* Barra flotante superior */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            background: "rgba(0,0,0,0.4)",
            zIndex: 10,
            transition: "opacity 0.3s",
            opacity: showBar ? 1 : 0,
            pr: 2,
          }}
        >
          <Typography
            sx={{
              color: "rgb(255, 255, 255)",
              fontSize: "0.9rem",
              fontFamily: "monospace",
              mr: 1,
              userSelect: "none",
            }}
          >
            ESC para salir
          </Typography>

          <IconButton
            onClick={handleClose}
            size="large"
            sx={{
              color: "rgb(217, 233, 224)",
              "&:hover": { background: "rgba(255,255,255,0.2)" },
            }}
          >
            <CloseIcon sx={{ fontSize: "2.5rem" }} />
          </IconButton>
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
              zIndex: 9,
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
            position: "fixed",
            top: 0,
            left: 0,
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

/* import { Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ViewStudyButton({ studyId, endpoint }) {
  const urlFront = import.meta.env.VITE_URL_FRONT;

  const handleVer = () => {
    const viewerUrl = `${urlFront}${endpoint}${studyId}`;
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;

    window.open(
      viewerUrl,
      "_blank",
      `width=${width},height=${height},top=0,left=0,noopener,noreferrer`
    );
  };

  return (
    <Tooltip title="Ver estudio">
      <IconButton size="small" onClick={handleVer}>
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
  );
}
 */
