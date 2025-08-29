import { Dialog, IconButton, CircularProgress, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function InformeViewer({ open, onClose, studyId }) {
  const [loading, setLoading] = useState(true);

  if (!studyId) return null;

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
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
        <h2 style={{ margin: 0 }}>Informe PDF</h2>
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

      {/* Iframe fullscreen */}
      <iframe
        src={`http://localhost:3000/api/dashboard/informe/${studyId}`}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          display: loading ? "none" : "block",
        }}
        title="Informe PDF"
        onLoad={() => setLoading(false)}
      />
    </Dialog>
  );
}
