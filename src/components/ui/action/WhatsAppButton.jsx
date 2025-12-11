import { useState } from "react";
import { Tooltip, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const payload = { phone, studyId, id, dni };

      console.log("📤 Enviando datos a WhatsApp:", payload);

      await dashAxios.post("/dashboard/whatsapp/send-qr", payload);

      console.log("✔️ WhatsApp enviado correctamente");
    } catch (e) {
      console.error("❌ Error en envío WA:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={tooltip}>
      <Box
        onClick={!loading ? handleClick : undefined}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "0.2s",
          "&:hover": !loading
            ? {
                transform: "scale(1.1)",
                filter: "brightness(1.2)",
              }
            : {},
        }}
      >
        <WhatsAppIcon
          sx={{
            fontSize: 20,
            color,
            mt: "7px",
            opacity: loading ? 0.5 : 1,
          }}
        />
        <span
          style={{
            fontSize: "0.55rem",
            fontWeight: 700,
            color,
          }}
        >
          {label}
        </span>
      </Box>
    </Tooltip>
  );
}
