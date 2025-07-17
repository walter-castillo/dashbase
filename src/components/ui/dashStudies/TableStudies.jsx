import React, { useEffect, useState, useMemo } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Typography,
  Box, // Importamos Box para mayor flexibilidad en el layout
} from "@mui/material";

import { modalityOptions } from "../../../utils/formatModality";
import InboxIcon from "@mui/icons-material/Inbox";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import exportToExcel from "./utils/exportToExcel";
import exportToPDF from "./utils/exportToPDF";
import { dashAxios } from "../../../config/DashRcAxios";
import { Loading } from "../Loading";
import { GridDownloadIcon, GridSearchIcon } from "@mui/x-data-grid";

const columnMap = {
  Paciente: "PatientName",
  DNI: "PatientID",
  Fecha: "StudyDate",
  Modalidad: "ModalitiesInStudy",
};

const TableStudies = () => {
 
  const [filtros, setFiltros] = useState({
    nombre: "",
    modality: "",
    desde: null,
    hasta: null,
  });
  const [estudios, setEstudios] = useState([]);
  const [orden, setOrden] = useState({ orden: "asc", ordenPor: "StudyDate" });
  const [pagina, setPagina] = useState(0);
  const [porPagina, setPorPagina] = useState(10);
  const [mostrarRecientes, setMostrarRecientes] = useState(false);
  const [loading, setLoading] = useState(false);

  const hayFiltrosActivos = useMemo(
    () => Object.values(filtros).some((v) => v !== "" && v !== null), 
    [filtros]
  );


  const handleBuscar = async () => {
    const query = new URLSearchParams();
    if (filtros.nombre) query.append("nombre", filtros.nombre);
    if (filtros.modality) query.append("modality", filtros.modality);
    if (filtros.desde)
      query.append("desde", dayjs(filtros.desde).format("YYYYMMDD"));
    if (filtros.hasta)
      query.append("hasta", dayjs(filtros.hasta).format("YYYYMMDD"));

    try {
      setLoading(true);
      const { data } = await dashAxios.get(
        `/dashboard/studiesFilter?${query.toString()}`
      );
      setEstudios(data.estudios);
      setPagina(0);
    } catch (err) {
      console.error("Error al buscar estudios:", err);
    } finally {
      setLoading(false); 
    }
  };
  

  const handleLimpiar = () => {
    setFiltros({ nombre: "", modality: "", desde: null, hasta: null });
    // Al limpiar, también podrías querer recargar todos los estudios
    // o solo si se borran todos los filtros. Aquí se llama a handleBuscar en el useEffect
  };

  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
  };

  const obtenerValorOrden = (estudio, campo) => {
    // Asegurarse de que estudio.Patient y estudio.Study existan antes de acceder a sus propiedades
    if (campo === "PatientName" || campo === "PatientID") {
      return estudio.Patient?.[campo] || "";
    }
    return estudio.Study?.[campo] || "";
  };

  const estudiosOrdenados = useMemo(() => {
    // Se añade un chequeo para asegurar que 'estudios' no esté vacío antes de ordenar
    if (!estudios || estudios.length === 0) { return []}
    
    return [...estudios].sort((a, b) => {
      const aVal = obtenerValorOrden(a, orden.ordenPor);
      const bVal = obtenerValorOrden(b, orden.ordenPor);

      // Manejo de valores nulos o indefinidos para evitar errores de localeCompare
      if (typeof aVal !== 'string' || typeof bVal !== 'string') {
        return orden.orden === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }
      return orden.orden === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [estudios, orden]);

  const estudiosPaginados = useMemo(() => {
    const inicio = pagina * porPagina;
    return estudiosOrdenados.slice(inicio, inicio + porPagina);
  }, [estudiosOrdenados, pagina, porPagina]);

  // Se mueve el handleBuscar para que se ejecute solo cuando cambian los filtros
  // o cuando se activa mostrarRecientes
  useEffect(() => {
    if (mostrarRecientes) {
      setFiltros({ nombre: "", modality: "", desde: null, hasta: null });
      // Llama a handleBuscar directamente aquí para que se ejecuten los filtros vacíos
      // y luego setMostrarRecientes a false para evitar bucle
      const fetchRecentStudies = async () => {
        await handleBuscar();
        setMostrarRecientes(false);
      };
      fetchRecentStudies();
    } else {
      handleBuscar(); // Busca estudios cuando los filtros cambian (a menos que sea por "mostrar recientes")
    }
  }, [filtros, mostrarRecientes]); // Depende de filtros y mostrarRecientes

  // useEffect inicial para cargar estudios al montar el componente
  useEffect(() => {
    handleBuscar();
  }, []); 
 

  return (
    <Paper sx={{ p: 2 }}>
      {/* Sección de filtros */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        mb={3} // Un poco más de margen inferior para separar de los botones de acción
      >
        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}
        >
          <TextField
            label="Nombre"
            fullWidth
            variant="outlined"
            value={filtros.nombre}
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
            color={filtros.nombre ? "secondary" : "default"}
          />
        </Grid>

        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel id="modality-select-label">Modalidad</InputLabel>
            <Select
              sx={{
                minWidth: "13em",
                boxSizing: "border-box",
                paddingRight: "32px",
              }}
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

        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}
        >
          <DatePicker
            label="Desde"
            value={filtros.desde}
            onChange={(date) => setFiltros({ ...filtros, desde: date })}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true, // Asegura que el DatePicker también ocupe todo el ancho
                variant: "outlined",
              },
            }}
          />
        </Grid>

        {/* Campo Hasta - Ocupará 1/4 del ancho en md y 1/2 en sm */}
        <Grid
          sx={{ gridColumn: { xs: "span 12", sm: "span 6", md: "span 3" } }}
        >
          <DatePicker
            label="Hasta"
            value={filtros.hasta}
            onChange={(date) => setFiltros({ ...filtros, hasta: date })}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                fullWidth: true, // Asegura que el DatePicker también ocupe todo el ancho
                variant: "outlined",
                inputProps: {
                  placeholder: "DD/MM/AAAA",
                },
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Contenedor de botones de acción para filtros */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={1}
      >
        {/* Botón Ver Recientes */}
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => setMostrarRecientes(true)}
          fullWidth
          sx={{
            maxWidth: { sm: 180 },
            minWidth: 120,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 0,
          }}
        >
          Ver Recientes
        </Button>

        {/* Botones PDF y Excel */}
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
            onClick={() => exportToPDF(estudios)}
            fullWidth={false} // 🔄 CAMBIO CLAVE
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
            onClick={() => exportToExcel(estudios)}
            fullWidth={false} // 🔄 CAMBIO CLAVE
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

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
          sx={{ position: "relative", top: "-50px" }} // sube 50px
        >
          <Loading />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              {estudios.length > 0 && (
                <TableHead>
                  <TableRow>
                    {Object.keys(columnMap).map((col) => (
                      <TableCell key={col}>
                        <TableSortLabel
                          active={orden.ordenPor === columnMap[col]}
                          direction={
                            orden.ordenPor === columnMap[col]
                              ? orden.orden
                              : "asc"
                          }
                          onClick={() => handleOrden(col)}
                        >
                          {col}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              )}

              <TableBody>
                {estudiosPaginados.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={Object.keys(columnMap).length}
                      align="center"
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        py={4}
                      >
                        <InboxIcon sx={{ fontSize: 48, color: "grey.400" }} />
                        <Typography variant="subtitle1" color="text.secondary">
                          No se encontraron estudios
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  estudiosPaginados.map((est, i) => (
                    <TableRow key={i}>
                      <TableCell>{est.Patient?.PatientName}</TableCell>
                      <TableCell>{est.Patient?.PatientID}</TableCell>
                      <TableCell>
                        {est.Study?.StudyDate
                          ? dayjs(est.Study.StudyDate).format("DD/MM/YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{est.Study?.ModalitiesInStudy}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {estudios.length > 0 && (
            <TablePagination
              component="div"
              count={estudios.length}
              page={pagina}
              onPageChange={(e, newPage) => setPagina(newPage)}
              rowsPerPage={porPagina}
              onRowsPerPageChange={(e) => {
                setPorPagina(parseInt(e.target.value, 10));
                setPagina(0);
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
              labelRowsPerPage="Cant:"
            />
          )}
        </>
      )}
    </Paper>
  );
};
export default TableStudies;
