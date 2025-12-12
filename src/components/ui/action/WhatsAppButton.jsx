import { useState } from "react";
import { Tooltip, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { dashAxios } from "../../../config/axiosClients";

export default function WhatsAppButton({
  phone,
  studyId,
  dni,
  id,
  color = "#25D366",
  label = "WA",
  tooltip = "Enviar al WhatsApp del paciente",
}) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClick = async () => {
    if (loading || sent) return;
    setLoading(true);

    try {
      const payload = { phone, studyId, id, dni };

      console.log("📤 Enviando datos a WhatsApp:", payload);

      await dashAxios.post("/dashboard/whatsapp/send-qr", payload);

      console.log("✔️ WhatsApp enviado correctamente");

      // Mostrar icono de ✔️ durante 1 segundo
      setSent(true);
      setTimeout(() => setSent(false), 1000);

      setSnackbar({
        open: true,
        message: "WhatsApp enviado correctamente ✅",
        severity: "success",
      });
    } catch (e) {
      console.error("❌ Error en envío WA:", e);

      setSnackbar({
        open: true,
        message: "Error enviando WhatsApp ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const iconColor = sent ? "#28a745" : color;
  const IconComponent = sent ? CheckCircleIcon : WhatsAppIcon;

  return (
    <>
      <Tooltip title={tooltip}>
        <Box
          onClick={!loading && !sent ? handleClick : undefined}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: loading || sent ? "wait" : "pointer",
            transition: "0.2s",
            "&:hover":
              !loading && !sent
                ? {
                    transform: "scale(1.1)",
                    filter: "brightness(1.2)",
                  }
                : {},
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ mt: "7px", color }} />
          ) : (
            <IconComponent
              sx={{
                fontSize: 20,
                color: iconColor,
                mt: "7px",
                transition: "0.3s",
              }}
            />
          )}

          <span
            style={{
              fontSize: "0.55rem",
              fontWeight: 700,
              color: iconColor,
              opacity: loading ? 0.6 : 1,
              transition: "0.3s",
            }}
          >
            {label}
          </span>
        </Box>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
