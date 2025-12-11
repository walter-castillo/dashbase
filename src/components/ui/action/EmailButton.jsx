import { useState } from "react";
import { Tooltip, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function EmailButton({
  onClick,
  label = "MAIL",
  color = "#0078FF",
  tooltip = "Enviar por Email",
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await onClick();
    } catch (e) {
      console.error("Error en envío mail:", e);
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
          // justifyContent: "center",
          // height: 32,
          // width: 32,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.1)",
            filter: "brightness(1.2)",
          },
        }}
      >
        <EmailIcon
          sx={{
            fontSize: 20,
            color,
            mt: "7px",

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
