import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { modalityOptions } from "../../../utils/formatModality";
import dayjs from "dayjs";

const FiltroEstudios = ({ filtros, setFiltros }) => {
  return (
    <Grid container spacing={2} alignItems="center" mb={3}>
      {/* Nombre */}
      <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}>
        <TextField
          label="Nombre"
          variant="outlined"
          value={filtros.nombre}
          onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          color={filtros.nombre ? "secondary" : "default"}
        />
      </Grid>

      {/* Número de Estudio */}
      <Grid
        sx={{
          gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
        }}
      >
        <TextField
          label="Número de Estudio"
          fullWidth
          variant="outlined"
          value={filtros.numeroEstudio}
          onChange={(e) =>
            setFiltros({ ...filtros, numeroEstudio: e.target.value })
          }
          color={filtros.numeroEstudio ? "secondary" : "default"}
        />
      </Grid>

      {/* Modalidad */}
      <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="modality-select-label">Modalidad</InputLabel>
          <Select
            labelId="modality-select-label"
            value={filtros.modality}
            label="Modalidad"
            onChange={(e) =>
              setFiltros({ ...filtros, modality: e.target.value })
            }
            color={filtros.modality ? "secondary" : "default"}
            sx={{
              minWidth: "14em",
              boxSizing: "border-box",
            }}
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

      {/* Desde */}
      <Grid
        sx={{
          gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
          maxWidth: "14rem",
        }}
      >
        <DatePicker
          label="Desde"
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
      <Grid
        sx={{
          gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" },
          maxWidth: "14rem",
        }}
      >
        <DatePicker
          label="Hasta"
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
    </Grid>
  );
};

export default FiltroEstudios;
