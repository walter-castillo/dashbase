import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { modalityOptions } from "../../utils/formatModality";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import dayjs from "dayjs";
import { GridSearchIcon } from "@mui/x-data-grid";

const FiltroEstudios = ({
  filtros,
  setFiltros,
  handleLimpiar,
  hayFiltrosActivos,
  onBuscar,
}) => {
  return (
    <Grid container spacing={2} alignItems="center" mb={3}>
      {/* Nombre */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          value={filtros.nombre}
          onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          color={filtros.nombre ? "secondary" : "default"}
        />
      </Grid>
      {/* dni */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          fullWidth
          label="DNI"
          variant="outlined"
          value={filtros.dni}
          onChange={(e) => setFiltros({ ...filtros, dni: e.target.value })}
          color={filtros.dni ? "secondary" : "default"}
        />
      </Grid>

      {/* Número de Estudio */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label="Número de Estudio"
          fullWidth
          // type="number"
          variant="outlined"
          value={filtros.numeroEstudio}
          onChange={(e) =>
            setFiltros({ ...filtros, numeroEstudio: e.target.value })
          }
          color={filtros.numeroEstudio ? "secondary" : "default"}
        />
      </Grid>

      {/* Modalidad */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="modality-select-label">Modalidad</InputLabel>
          <Select
            fullWidth
            labelId="modality-select-label"
            value={filtros.modality}
            label="Modalidad"
            onChange={(e) =>
              setFiltros({ ...filtros, modality: e.target.value })
            }
            color={filtros.modality ? "secondary" : "default"}
          >
            <MenuItem value="">Todas</MenuItem>
            {modalityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {`${option.value} - ${option.label}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid container spacing={2} size={{ xs: 12, sm: 12, md: 6 }}>
        {/* Desde */}
        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
          <DatePicker
            label="Desde"
            fullWidth
            value={filtros.desde}
              onChange={(date) => setFiltros({ ...filtros, desde: date })}
            format="DD/MM/YYYY"
            maxDate={dayjs()}
            slotProps={{
              textField: {
                variant: "outlined",
                color: filtros.desde ? "secondary" : "default",
                inputProps: { placeholder: "DD/MM/AAAA" },
              },
            }}
          />
        </Grid>

        {/* Hasta */}
        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
          <DatePicker
            label="Hasta"
            fullWidth
            value={filtros.hasta}
            onChange={(date) => setFiltros({ ...filtros, hasta: date })}
            format="DD/MM/YYYY"
            maxDate={dayjs()}
            slotProps={{
              textField: {
                variant: "outlined",
                color: filtros.hasta ? "secondary" : "default",
                inputProps: { placeholder: "DD/MM/AAAA" },
              },
            }}
          />
        </Grid>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={1}
          width={{ xs: "100%", sm: "auto" }}
          pb={1}
        >
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<ClearAllIcon />}
              onClick={handleLimpiar}
              disabled={!hayFiltrosActivos}
              fullWidth
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexShrink: 0,
              }}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Button
              variant="contained"
              startIcon={<GridSearchIcon />}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexShrink: 0,
              }}
              color="secondary"
              //   color={hayFiltrosActivos ? "secondary" : "primary"}
              fullWidth
              disabled={!hayFiltrosActivos}
              onClick={onBuscar}
            >
              Buscar
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FiltroEstudios;
