import React from "react";
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
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import dayjs from "dayjs";

const TablaEstudios = ({ estudios, orden, setOrden, columnMap }) => {
  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
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
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {estudios.length === 0 ? (
            <TableRow>
              <TableCell colSpan={Object.keys(columnMap).length} align="center">
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
                <TableCell>{est.Study?.ModalitiesInStudy}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaEstudios;
