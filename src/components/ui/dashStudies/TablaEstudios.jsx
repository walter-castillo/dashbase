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
  IconButton,
  Stack,
  Tooltip
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadFile from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";
import { useState } from "react";
import InformeViewerIframe from "./InformeViewerIframe";
import { dashAxios } from "../../../config/DashAxios";

const TablaEstudios = ({ estudios, orden, setOrden, columnMap }) => {
  const [openInforme, setOpenInforme] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);

  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
  };

  const handleVer = (estudio)       => console.log("Ver estudio", estudio);
  const handleModificar = (estudio) => console.log("Modificar estudio", estudio);
  const handleCargar = (estudio)    => console.log("Cargar estudio", estudio);
  const handleExportar = (estudio)  => console.log("Exportar estudio", estudio);

  return (
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
                  colSpan={Object.keys(columnMap).length + 2}
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
                    {est.Study?.ModalitiesInStudy.join(", ")}
                  </TableCell>
                  <TableCell>{est.Study?.AccessionNumber}</TableCell>

                  <TableCell align="center">
                    {est.Study?.tieneINF ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ gap: 0.3 }}
                      >
                        {/* Ver informe en modal */}
                        <Tooltip title="Ver informe">
                          <DescriptionIcon
                            fontSize="small"
                            color="primary"
                            sx={{ cursor: "pointer", marginRight: 2 }}
                            onClick={async () => {
                              const isMobile = /iPhone|iPad|iPod|Android/i.test(
                                navigator.userAgent
                              );

                              if (isMobile) {
                                // 📱 Mobile → Descargar PDF usando dashAxios
                                try {
                                  const response = await dashAxios.get(
                                    `/dashboard/informe/${est.Study.ID}`,
                                    {
                                      responseType: "blob", // muy importante para PDF
                                    }
                                  );

                                  const blobUrl = window.URL.createObjectURL(
                                    response.data
                                  );

                                  const fileName = `${est.Patient.PatientID}-${est.Patient.PatientName}-${est.Study.AccessionNumber}.pdf`;

                                  const link = document.createElement("a");
                                  link.href = blobUrl;
                                  link.download = fileName;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);

                                  window.URL.revokeObjectURL(blobUrl);
                                } catch (error) {
                                  console.error("Error al descargar:", error);
                                }
                              } else {
                                // 🖥️ Desktop → Abrir modal
                                setSelectedStudy(est);
                                setOpenInforme(true);
                              }
                            }}
                          />
                        </Tooltip>

                        {/* Editar */}
                        <Tooltip title="Editar informe">
                          <DeleteForeverIcon
                            fontSize="small"
                            color="error"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleModificar(est)}
                          />
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ gap: 0.3 }}
                      >
                        <Tooltip title="Sin informe">
                          <DescriptionIcon
                            fontSize="small"
                            color="disabled"
                            sx={{ marginRight: 2 }}
                          />
                        </Tooltip>
                        <Tooltip title="Cargar informe">
                          <UploadFile
                            fontSize="small"
                            color="success"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleCargar(est)}
                          />
                        </Tooltip>
                      </Box>
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
                        onClick={() => handleExportar(est)}
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

      {/* Modal del PDF */}
      <InformeViewerIframe
        open={openInforme}
        onClose={() => setOpenInforme(false)}
        selectedStudy={selectedStudy}
      />
    </>
  );
};

export default TablaEstudios;
