import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientAxios } from "../../config/axiosClients";

const Appbar = ({ patient, guest = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      if (guest) {
        // 🔹 Si es modo invitado: limpiar token y redirigir al inicio
        sessionStorage.removeItem("guestToken");
        console.log("👋 Sesión de invitado cerrada.");
      } else {
        // 🔹 Si es paciente autenticado: cerrar sesión en backend
        await PatientAxios.post("/logout");
        console.log("👋 Sesión de paciente cerrada en el servidor.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      navigate("/login/paciente");
    }
  };

  

  const displayName =
    patient?.PatientName?.replaceAll("^", " ").replace(/\s+/g, " ").trim() ||
    "Desconocido";
  const displayID = `DNI: ${Number(patient?.PatientID || 0).toLocaleString(
    "es-AR"
  )}`;

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {guest ? "Portal Invitado" : "Portal del Paciente"}
        </Typography>

        {guest ? (
          <Button color="inherit" onClick={handleLogout}>
            Salir
          </Button>
        ) : (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>Nombre: {displayName}</MenuItem>
              <MenuItem disabled>{displayID}</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
