import React from "react";
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
      <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}>
        <TextField
          label="Nombre"
          fullWidth
          variant="outlined"
          value={filtros.nombre}
          onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          color={filtros.nombre ? "secondary" : "default"}
        />
      </Grid>

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
              minWidth: "13em",
              boxSizing: "border-box",
              paddingRight: "32px",
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

      <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}>
        <DatePicker
          label="Desde"
          value={filtros.desde}
          onChange={(date) => setFiltros({ ...filtros, desde: date })}
          format="DD/MM/YYYY"
          maxDate={dayjs()}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
            },
          }}
        />
      </Grid>

      <Grid sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}>
        <DatePicker
          label="Hasta"
          value={filtros.hasta}
          onChange={(date) => setFiltros({ ...filtros, hasta: date })}
          format="DD/MM/YYYY"
          maxDate={dayjs()}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              inputProps: { placeholder: "DD/MM/AAAA" },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FiltroEstudios;
