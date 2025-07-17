import React from "react";
import { Button, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { GridDownloadIcon } from "@mui/x-data-grid";

const AccionesEstudios = ({
  onExportPDF,
  onExportExcel,
  onVerRecientes,
  onLimpiarFiltros,
  hayFiltrosActivos = false,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      gap={1}
      mb={2}
    >
      {/* Botones izquierda: Ver Recientes + Limpiar Filtros */}
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={1} pb={1}>
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={onVerRecientes}
          fullWidth={false}
          sx={{
            maxWidth: { sm: 180 },
            // minWidth: 120,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          Recientes
        </Button>

        <Button
          variant="outlined"
          color="warning"
          startIcon={<ClearAllIcon />}
          onClick={onLimpiarFiltros}
          disabled={!hayFiltrosActivos}
          fullWidth={false}
          sx={{
            maxWidth: { sm: 180 },
            // minWidth: 120,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          Limpiar
        </Button>
      </Box>

      {/* Botones derecha: Exportar */}
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
          onClick={onExportPDF}
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
          onClick={onExportExcel}
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
    </Box>
  );
};

export default AccionesEstudios;
