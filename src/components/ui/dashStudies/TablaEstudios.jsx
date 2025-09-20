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
import InformeViewerIframe from "../../actionInforme/InformeViewerIframe";
import { dashAxios } from "../../../config/DashAxios";
import InformeButton from "../../actionInforme/InformerButton";
import ConfirmDialog from "../../actionInforme/ConfirmDialog";

const TablaEstudios = ({ estudios, orden, setOrden, columnMap }) => {
  const [openInforme, setOpenInforme] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
  };

  const handleVer = (estudio)       => console.log("Ver estudio", estudio);
  const handleEliminar = (estudio) => console.log("Eliminar estudio", estudio);
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
                        <InformeButton
                          est={est}
                          setSelectedStudy={setSelectedStudy}
                          setOpenInforme={setOpenInforme}
                        />

                        {/* Botón eliminar */}
                        <Tooltip title="Eliminar informe">
                          <DeleteForeverIcon
                            fontSize="small"
                            color="error"
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenConfirm(true)}
                          />
                        </Tooltip>
                        {/* Dialog de confirmación */}
                        <ConfirmDialog
                          open={openConfirm}
                          title="Eliminar informe"
                          message="⚠️ ¿Estás seguro de que quieres eliminar este informe? Esta acción es irreversible."
                          confirmText="Eliminar"
                          cancelText="Cancelar"
                          confirmColor="error"
                          onConfirm={() => {
                            handleEliminar(est);
                            setOpenConfirm(false);
                          }}
                          onCancel={() => setOpenConfirm(false)}
                        />
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
