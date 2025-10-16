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
  Snackbar,
  Alert,
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
import CustomSnackbar from "../CustomSnackbar";
import { Loading } from "../Loading";

const TablaEstudios = ({
  estudios,
  setEstudios,
  orden,
  setOrden,
  columnMap,
}) => {
  const [openInforme, setOpenInforme] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error" | "info" | "warning"
  });

  const handleOrden = (colVisible) => {
    const campoReal = columnMap[colVisible];
    const esAsc = orden.ordenPor === campoReal && orden.orden === "asc";
    setOrden({ orden: esAsc ? "desc" : "asc", ordenPor: campoReal });
  };

  const handleVer = (estudio) => console.log("Ver estudio", estudio);
  const handleEliminar = async (estudio) => {
    const estudioId = estudio.Study.ID;

    // Guardar copia de los estudios actuales por si falla la eliminación
    const estudiosPrevios = [...estudios];

    // 👈 ACTUALIZACIÓN OPTIMISTA - Actualizar inmediatamente en el estado local
    setEstudios((prevEstudios) =>
      prevEstudios.map((est) =>
        est.Study?.ID === estudioId
          ? { ...est, Study: { ...est.Study, tieneINF: false } }
          : est
      )
    );

    try {
      console.log("Eliminar estudio", estudioId);
      setLoading(true);

      const respuesta = await dashAxios.delete(`/dashboard/informe/borrar/${estudioId}`    );

      setSnackbar({
        open: true,
        message: "Informe eliminado correctamente",
        severity: "success",
      });
    } catch (error) {
      console.error("Error al eliminar informe", error);
      //REVERTIR en caso de error - volver al estado anterior
      setEstudios(estudiosPrevios);

      setSnackbar({
        open: true,
        message: "Error al eliminar informe",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCargar = (estudio) => {
    console.log("Cargar estudio", estudio);
    setSelectedStudy(estudio);
    setOpenUpload(true);
  };
  const formatearDNI = (dni) => {
    if (!dni) return "";
    // Solo si es numérico puro
    if (/^\d+$/.test(dni)) {
      return parseInt(dni, 10).toLocaleString("es-AR"); // "10.102.100"
    }
    return dni; // si tiene letras o símbolos
  };

  const handleExportar = (estudio) => console.log("Exportar estudio", estudio);

  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
          mt={-50}
        >
          <Loading />
        </Box>
      )}
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
                  <TableCell>{formatearDNI(est.Patient?.PatientID)}</TableCell>
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

          // 👈 CORRECCIÓN: usar selectedStudy?.Study?.ID en lugar de estudioId
          setEstudios((prevEstudios) =>
            prevEstudios.map((est) =>
              est.Study?.ID === selectedStudy?.Study?.ID
                ? { ...est, Study: { ...est.Study, tieneINF: true } }
                : est
            )
          );

          setOpenUpload(false);
        }}
      />
      <CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  );
};

export default TablaEstudios;
