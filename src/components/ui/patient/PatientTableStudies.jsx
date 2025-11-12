import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import { formatModality } from "../../../utils/formatModality";
import { useParams } from "react-router-dom";
import { PatientAxios } from "../../../config/PatientAxios";
import DownloadStudyButton from "../../download/DownloadStudyButton";
import InformeButton from "../../actionInforme/InformerButton";
import DownloadImgButton from "../action/DownloadImgButton";


const styles = {
  paper: {mt: 4, borderRadius: 3, boxShadow: 6, p: 1, backgroundColor: "#fdfdfd"},
  title: { fontWeight: "bold", color: "#1976d2" },
  tableContainer: { width: "100%", overflowX: "auto" },
  headerRow: { backgroundColor: "#1976d2" },
  headerCell: { color: "white", fontWeight: "bold" },
  evenRow: {
    backgroundColor: "#ffffff",
    "&:hover": { backgroundColor: "#e3f2fd" },
  },
  oddRow: {
    backgroundColor: "#f5f5f5",
    "&:hover": { backgroundColor: "#e3f2fd" },
  },
  textSmall: { fontSize: "0.70rem" },
};

const PatientTableStudies = ({ studies, patient }) => {
  const [openInforme, setOpenInforme] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [loadingInforme, setLoadingInforme] = useState(false);



 const token = useParams().token; // Token en la ruta: /invitado/:token
   
const handleVer = (studyId) => {
  try {
    const urlFront = import.meta.env.VITE_URL_FRONT;
    const viewerUrl = `${urlFront}/view/study/patient/${studyId}`;
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
    window.open(
      viewerUrl,
      "_blank",
      `width=${width},height=${height},top=0,left=0,noopener,noreferrer`
    );
  } catch (e) {
    console.error("[VIEWER ERROR]", e);
  }
};



  if (!studies || studies.length === 0) {
    return (
      <Paper sx={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom sx={styles.title}>
          No hay estudios disponibles
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper sx={styles.paper}>
        <Box sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow sx={styles.headerRow}>
                {["N°", "Fecha", "Tipo", "Informe", "ver", "dcm/jpg"].map(
                  (text, i) => (
                    <TableCell key={i} align="center" sx={styles.headerCell}>
                      {text}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {studies.map((study, index) => {
                const isEven = index % 2 === 0;
                return (
                  <TableRow
                    key={study.StudyInstanceUID || index}
                    sx={isEven ? styles.evenRow : styles.oddRow}
                  >
                    <TableCell align="center" sx={styles.textSmall}>
                      {study.AccessionNumber || "-"}
                    </TableCell>
                    <TableCell align="center" sx={styles.textSmall}>
                      {formatDate(study.StudyDate)}
                    </TableCell>
                    <TableCell align="center" sx={styles.textSmall}>
                      {formatModality(study.ModalitiesInStudy) || "-"}
                    </TableCell>

                    {/* 🟣 Informe */}
                    <TableCell align="center">
                      {study.tieneINF ? (
                        <InformeButton
                          est={{ Study: study, Patient: patient }}
                          fetcher={PatientAxios}
                          endpoint={`/informe/ver/`}
                        />
                      ) : (
                        <Tooltip title="No hay informe disponible">
                          <DescriptionIcon
                            fontSize="small"
                            color="disabled"
                            sx={{ marginRight: 2 }}
                          />
                        </Tooltip>
                      )}
                    </TableCell>

                    {/* 👁 Ver */}
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleVer(study.StudyInstanceUID)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>

                    {/* 💾 Descargar  */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row", // siempre en línea
                          gap: 1, // espacio entre botones
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "nowrap", // evita que se rompan a la siguiente línea
                        }}
                      >
                        <DownloadImgButton
                          fetcher={PatientAxios}
                          endpoint="/study/download/dcm"
                          id={study.ID}
                          label="DCM"
                          tooltip="Descargar estudio DICOM"
                          color="#ce1eeade"
                          fileType="zip"
                        />
                        <DownloadImgButton
                          fetcher={PatientAxios}
                          endpoint="/study/download/jpeg"
                          id={study.StudyInstanceUID}
                          label="JPG"
                          tooltip="Descargar estudio JPG/JPEG"
                          color="#68f011"
                          fileType="zip"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </>
  );
};

export default PatientTableStudies;
