import { useState} from "react";
import {Table, 
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Box,
  Paper,
  Stack,
  Tooltip
} from "@mui/material";

import UploadFile from "@mui/icons-material/UploadFile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";
import InformeButton from "../ui/actionInforme/InformerButton";
import ConfirmDialog from "../ui/actionInforme/ConfirmDialog";
import UpLoadPdfDialog from "../ui/actionInforme/UploadPdfDialog";
import NotStudies from "./NotStudies";
import CustomSnackbar from "../ui/CustomSnackbar";
import { Loading } from "../ui/Loading";
import ShareStudyButton from "../ui/action/ShareStudyButton";
import { dashAxios } from "../../config/axiosClients";
import DownloadImgButton from "../ui/action/DownloadImgButton";
import ButtonOpenVisor from "../ui/action/ButtonOpenVisor";



const TableAdmin = ({
  estudios,
  setEstudios,
  orden,
  setOrden,
  columnMap,
}) => {
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

      const respuesta = await dashAxios.delete(
        `/dashboard/informe/borrar/${estudioId}`
      );

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
    setSelectedStudy(estudio);
    setOpenUpload(true);
  };

  const formatearDNI = (dni) => {
    if (!dni) return "";
    // Solo si es numérico puro
    if (/^\d+$/.test(dni)) return parseInt(dni, 10).toLocaleString("es-AR"); // "10.102.100"   
    return dni; // si tiene letras o símbolos
  };


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
                          fetcher={dashAxios}
                          endpoint="dashboard/informe/ver/"
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
                      <ButtonOpenVisor
                        studyId={est.Study.StudyInstanceUID}
                        endpointFront="/visor-estudios/"
                      />

                      {/* descargar imagenes JPG */}
                      <DownloadImgButton
                        fetcher={dashAxios}
                        endpoint="/dashboard/download/study/jpeg"
                        id={est.Study.StudyInstanceUID}
                        label="JPG"
                        tooltip="Descargar imágenes JPG"
                        color="#2e7d32"
                        fileType="zip"
                      />

                      {/* descargar imagenes DCM */}
                      <DownloadImgButton
                        fetcher={dashAxios}
                        endpoint="/dashboard/download/study/dcm"
                        id={est.Study.ID}
                        label="DCM"
                        tooltip="Descargar estudio DICOM"
                        color="#ce1eeade"
                        fileType="zip"
                      />

                      {/* descargar imagenes PDF */}
                      <DownloadImgButton
                        fetcher={dashAxios}
                        endpoint="/dashboard/download/study/pdf"
                        id={est.Study.StudyInstanceUID}
                        label="PDF"
                        tooltip="Descargar estudio pdf"
                        color="#1565c0"
                        fileType="pdf"
                      />

                      {/* compartir estudio */}
                      <Tooltip title="Compartir estudio">
                        <ShareStudyButton study={est} />
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default TableAdmin;
