// DisabledIcons.jsx
import { Box, Tooltip, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export function DisabledViewReport() {
  return (
    <Tooltip title="Sin informe">
      <DescriptionIcon
        fontSize="small"
        color="disabled"
        sx={{ opacity: 0.4, cursor: "default", mr: 2 }}
      />
    </Tooltip>
  );
}

export function DisabledUploadReport() {
  return (
    <Tooltip title="No disponible">
      <UploadFileIcon
        fontSize="small"
        color="disabled"
        sx={{ opacity: 0.4, cursor: "default" }}
      />
    </Tooltip>
  );
}

export function DisabledDownloadButton({ label = "DCM" }) {
  return (
    <Tooltip title="Descarga no disponible">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 32,
          width: 32,
          opacity: 0.4,
          cursor: "not-allowed",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            fontSize: "0.55rem",
            color: "gray",
            mb: "-2px",
          }}
        >
          {label}
        </Typography>

        {/* Flecha apagada */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="gray"
        >
          <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-6 2v2h12v-2H6z" />
        </svg>
      </Box>
    </Tooltip>
  );
}
