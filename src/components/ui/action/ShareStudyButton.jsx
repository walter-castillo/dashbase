import { useState } from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { PatientAxios } from "../../../config/axiosClients";


  // terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------// terminar , comp en construccion-----------------------------------------------
    // terminar , comp en construccion-----------------------------------------------
      // terminar , comp en construccion-----------------------------------------------


const ShareStudyButton = ({ study }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(study);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = async (duration) => {
    handleClose();

    try {
      console.log(duration);
   
      const response = await PatientAxios.post(`share/${study.ID}`, {
        duration,
      });

      const { shareUrl } = response.data;

      if (navigator.share) {
        await navigator.share({
          title: "Estudio Médico",
          text: "Accedé a este estudio compartido:",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("🔗 Enlace copiado al portapapeles");
      } 
    } catch (err) {
      console.error("Error al generar enlace compartido:", err);
      alert("❌ No se pudo generar el enlace compartido");
    }
  };

  return (
    <>
      <Tooltip title="Compartir estudio">
        <IconButton onClick={handleClick}>
          <ShareIcon sx={{ color: "#4caf50" }} />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          sx={{ opacity: 1, fontWeight: "bold", color: "#1976d2" }}
        >
          Compartir Link por:
        </MenuItem>
        {[
          { label: "1 hora", value: "1h" },
          { label: "1 día", value: "1d" },
          { label: "1 semana", value: "1w" },
          { label: "1 mes", value: "1m" },
        ].map((opt) => (
          <MenuItem key={opt.value} onClick={() => handleSelect(opt.value)}>
            <ListItemIcon>
              <AccessTimeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{opt.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ShareStudyButton;
