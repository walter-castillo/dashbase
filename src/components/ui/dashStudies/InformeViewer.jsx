import { Dialog, IconButton, CircularProgress, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";

export default function InformeViewer({ open, onClose, selectedStudy }) {
  const [loading, setLoading] = useState(true);

  if (!selectedStudy) return null;

const { Patient, Study } = selectedStudy;

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
        <h3
          style={{ margin: 0 }}
        >{`Informe de ${Patient.PatientName} - N° ${Study.AccessionNumber}, ${formatDate(Study.StudyDate)}`}</h3>
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
        src={`http://localhost:3000/api/dashboard/informe/${Study.ID}`}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          display: loading ? "none" : "block",
        }}
        onLoad={() => setLoading(false)}
      />
    </Dialog>
  );
}
