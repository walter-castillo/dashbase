import { useState } from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QrCodeIcon from "@mui/icons-material/QrCode";

import QRCode from "qrcode";

const ShareStudyButton = ({ id, studyId, endpoint, fetcher }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrImage, setQrImage] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 👉 Generar QR
  const handleGenerateQR = async (link) => {
    try {
      const qr = await QRCode.toDataURL(link);
      console.log(qr, '39');
      console.log(link, '40');
      setQrImage(qr);
      setQrOpen(true);
    } catch (err) {
      console.error("❌ Error al generar QR:", err);
      alert("❌ No se pudo generar el QR");
    }
  };

  // 👉 Compartir / Copiar / QR
  const handleSelect = async (duration, mode = "share") => {
    handleClose();

    try {
      const body = { id, studyId, duration };

      const response = await fetcher.post(endpoint, body);
      const { link, expiresIn, expiresAt } = response.data;

      if (mode === "qr") {
        return handleGenerateQR(link);
      }

      if (navigator.share && mode === "share") {
        await navigator.share({
          title: "Estudio Médico",
          text: "Accedé a este estudio compartido:",
          url: link,
          expiresIn,
          expiresAt,
        });
      } else {
        await navigator.clipboard.writeText(link);
        alert("🔗 Enlace copiado al portapapeles");
      }
    } catch (err) {
      console.error("❌ Error al generar enlace compartido:", err);
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

      {/* MENU PRINCIPAL */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Compartir Link por:
        </MenuItem>

        {[
          { label: "1 hora", value: "1h" },
          { label: "1 día", value: "1d" },
          { label: "1 semana", value: "1w" },
          { label: "1 mes", value: "1m" },
        ].map((opt) => (
          <MenuItem
            key={opt.value}
            onClick={() => handleSelect(opt.value, "share")}
          >
            <ListItemIcon>
              <AccessTimeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{opt.label}</ListItemText>
          </MenuItem>
        ))}

        {/* OPCIÓN PARA GENERAR QR */}
        <MenuItem
          onClick={() => handleSelect("1m", "qr")}
          sx={{ mt: 1, borderTop: "1px solid #ddd" }}
        >
          <ListItemIcon>
            <QrCodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Generar QR (1 mes)</ListItemText>
        </MenuItem>
      </Menu>

      {/* DIALOGO QR */}
      <Dialog open={qrOpen} onClose={() => setQrOpen(false)}>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Código QR del Estudio
          </Typography>

          {qrImage && (
            <img
              src={qrImage}
              alt="QR"
              style={{ width: 250, height: 250, marginBottom: 10 }}
            />
          )}

          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Compartí este QR con quien quieras.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareStudyButton;
