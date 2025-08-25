import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";


const TablaEstudios = ({ estudios, orden, setOrden, columnMap }) => {
  console.log(estudios);
  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
  };

  const handleVer = (estudio) => {
    console.log("Ver estudio", estudio);
  };
  const handleClick = (estudio) => {
    console.log("ver informe", estudio);
  };

  const handleExportar = (estudio) => {
   console.log("Exportar estudio", estudio);
  };

  return (
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
                      orden.ordenPor === columnMap[col] ? orden.orden : "asc"
                    }
                    onClick={() => handleOrden(col)}
                  >
                    {col}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center">Informes</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {estudios.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={Object.keys(columnMap).length + 1}
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
            estudios.map((est, i) => (
              <TableRow key={i}>
                <TableCell>{est.Patient?.PatientName}</TableCell>
                <TableCell>{est.Patient?.PatientID}</TableCell>
                <TableCell>
                  {est.Study?.StudyDate
                    ? dayjs(est.Study.StudyDate).format("DD/MM/YYYY")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {est.Study?.ModalitiesInStudy.filter(
                    (m) => m !== "INF" && m !== "PDF"
                  ).join(", ")}
                </TableCell>
                <TableCell>{est.Study?.AccessionNumber}</TableCell>
                <TableCell align="center">
                  {est.Study?.tieneINF ? (
                    <DescriptionIcon
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleClick(est)} 
                    />
                  ) : (
                    <DescriptionIcon
                      color="disabled"
                      sx={{ cursor: "not-allowed" }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleVer(est)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      // onClick={() => handleExportar(est)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaEstudios;
