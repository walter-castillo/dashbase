import { useState } from "react";
import { Tooltip, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function WhatsAppButton({
  onClick,
  label = "WA",
  color = "#25D366",
  tooltip = "Enviar por WhatsApp",
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await onClick(); // función recibida del padre
    } catch (e) {
      console.error("Error en envío WA:", e);
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
          justifyContent: "center",
          height: 32,
          width: 32,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.1)",
            filter: "brightness(1.2)",
          },
        }}
      >
        <WhatsAppIcon
          sx={{
            fontSize: 20,
            color,
            mb: "-3px",
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
