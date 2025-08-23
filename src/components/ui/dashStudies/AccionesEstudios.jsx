import React from "react";
import { Button, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GridDownloadIcon } from "@mui/x-data-grid";

import exportToExcel from "./utils/exportToExcel";
import exportToPDF from "./utils/exportToPDF";

const AccionesEstudios = ({
  estudios = [],
  onVerRecientes,
  onLimpiarFiltros,
  hayFiltrosActivos = false,
}) => {
  // Funciones internas para exportar
  const handleExportExcel = () => exportToExcel(estudios);
  const handleExportPDF = () => exportToPDF(estudios);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      m={2}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={1}
        pb={1}
      >
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => {
            onLimpiarFiltros?.();
            onVerRecientes?.();
          }}
          fullWidth={false}
          sx={{
            maxWidth: { sm: 180 },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          Recientes
        </Button>
      </Box>

      {(estudios.length > 0) && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={1}
          width={{ xs: "100%", sm: "auto" }}
          pb={1}
        >
          <Button
            variant="contained"
            startIcon={<GridDownloadIcon />}
            onClick={handleExportPDF}
            fullWidth={false}
            sx={{
              minWidth: 110,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexShrink: 0,
            }}
          >
            PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<GridDownloadIcon />}
            onClick={handleExportExcel}
            fullWidth={false}
            sx={{
              minWidth: 110,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexShrink: 0,
            }}
          >
            Excel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccionesEstudios;
