// EyeLabPreviewButton.jsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

export default function ButtonVerLab({ onClick }) {
  return (
    <Tooltip title="Ver Laboratorio">
      <IconButton
        onClick={onClick}
        aria-label="Ver Lab"
        sx={{ position: "relative" }}
      >
        <PreviewOutlinedIcon sx={{ fontSize: 26, color: "#2fd332f0" }} />
      </IconButton>
    </Tooltip>
  );
}
