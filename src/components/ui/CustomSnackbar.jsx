// components/ui/CustomSnackbar.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ snackbar, setSnackbar }) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{
          width: "500px", // ancho fijo
          fontSize: "1.1rem", // texto más grande
          py: 2,
          px: 3,
          borderRadius: "12px",
        }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
