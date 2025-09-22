import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadFile from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";
import InformeViewerIframe from "../../actionInforme/InformeViewerIframe";
import { dashAxios } from "../../../config/DashAxios";
import InformeButton from "../../actionInforme/InformerButton";
import ConfirmDialog from "../../actionInforme/ConfirmDialog";
import UpLoadPdfDialog from "../../actionInforme/UploadPdfDialog";
import NotStudies from "./NotStudies";

const TablaEstudios = ({ estudios, orden, setOrden, columnMap }) => {
  const [openInforme, setOpenInforme] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState(null);

  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
  };

  const handleVer = (estudio) => console.log("Ver estudio", estudio);
  const handleEliminar = (estudio) => {
    console.log("Eliminar estudio", estudio);
    // Lógica para eliminar el estudio
  };

  const handleCargar = (estudio) => {
    console.log("Cargar estudio", estudio);
    setSelectedStudy(estudio);
    setOpenUpload(true);
  };

  const handleExportar = (estudio) => console.log("Exportar estudio", estudio);

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
              <NotStudies colSpan={Object.keys(columnMap).length + 2} />
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
                            onClick={() => {
                              setStudyToDelete(est);
                              setOpenConfirm(true);
                            }}
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

      {/* Dialog de confirmación (fuera de la tabla) */}
      <ConfirmDialog
        open={openConfirm}
        title="Eliminar informe"
        message="⚠️ ¿Estás seguro de que quieres eliminar este informe? Esta acción es irreversible."
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="error"
        onConfirm={() => {
          handleEliminar(studyToDelete);
          setOpenConfirm(false);
          setStudyToDelete(null);
        }}
        onCancel={() => {
          setOpenConfirm(false);
          setStudyToDelete(null);
        }}
      />

      {/* Modal de carga (fuera de la tabla) */}
      <UpLoadPdfDialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        studyId={selectedStudy?.Study?.ID}
        onSuccess={(fileName) => {
          console.log(`✅ PDF ${fileName} subido con éxito`);
          // Aquí podrías refrescar la tabla o mostrar snackbar
          setOpenUpload(false);
        }}
      />
    </>
  );
};

export default TablaEstudios;
