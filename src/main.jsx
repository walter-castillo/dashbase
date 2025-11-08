import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { UserProvider } from "./providers/UserProvider.jsx";
import { RoleProvider } from "./providers/RoleProvider.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GlobalStyles } from "@mui/material";
import "animate.css";

// 🌐 Importa el locale español
import dayjs from "dayjs";
import "dayjs/locale/es";

// 📌 Establece el idioma por defecto como español
dayjs.locale("es");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
  >
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <AuthProvider>
        <UserProvider>
          <RoleProvider>
            <>
              {/* Estilos globales para pisar padding/margen de Box iframe */}
              <GlobalStyles
                styles={{
                  ".MuiBox-root iframe": {
                    width: "100% !important",
                    height: "100% !important",
                    margin: 0,
                    padding: "0 !important",
                    borderRadius: 0,
                  },
                }}
              />
              <App />
            </>
          </RoleProvider>
        </UserProvider>
      </AuthProvider>
    </LocalizationProvider>
  </BrowserRouter>
);
