import { useState } from "react";
import { Tooltip, Box, Snackbar, Alert, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { dashAxios } from "../../../config/axiosClients";

export default function EmailButton({
  email,
  studyId,
  dni,
  id,
  color = "#0078FF",
  label = "MAIL",
  tooltip = "Enviar por Email",
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
      const payload = { email, studyId, dni, id };

      await dashAxios.post("/dashboard/email/enviar", payload);

      setSent(true);
      setTimeout(() => setSent(false), 1000);

      setSnackbar({
        open: true,
        message: "Email enviado correctamente ✅",
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Error enviando email ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const iconColor = sent ? "#28a745" : color;
  const IconComponent = sent ? CheckCircleIcon : EmailIcon;

  return (
    <>
      <Tooltip title={tooltip}>
        <Box
          onClick={loading ? undefined : handleClick}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: loading ? "wait" : "pointer",
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
            <CircularProgress size={20} sx={{ mt: "7px" }} />
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
