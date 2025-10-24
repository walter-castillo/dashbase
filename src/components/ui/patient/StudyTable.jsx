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
import DownloadStudyButton from "./DownloadStudyButton";
import InformeViewerIframe from "./InformeViewerIframe";
import { dashAxios } from "../../../config/DashAxios";

const styles = {
  paper: {
    mt: 4,
    borderRadius: 3,
    boxShadow: 6,
    p: 1,
    backgroundColor: "#fdfdfd",
  },
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

const StudyTable = ({ studies, patient }) => {


  const [openInforme, setOpenInforme] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [loadingInforme, setLoadingInforme] = useState(false);

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
      console.log("[VIEWER] Ventana abierta correctamente");
    } catch (e) {
      console.error("[VIEWER ERROR]", e);
    }
  };

  const handleInformeClick = async (study) => {
    if (!study?.tieneINF) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      try {
        setLoadingInforme(true);
        const response = await dashAxios.get(
          `/dashboard/informe/ver/${study.ID}`,
          {
            responseType: "blob",
          }
        );

        const blobUrl = window.URL.createObjectURL(response.data);
 

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = 'Informe-' + study.AccessionNumber + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error al descargar informe:", error);
      } finally {
        setLoadingInforme(false);
      }
    } else {
      setSelectedStudy(study);
      setOpenInforme(true);
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
        <Typography variant="h5" align="center" gutterBottom sx={styles.title}>
          Estudios del Paciente
        </Typography>

        <Box sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow sx={styles.headerRow}>
                {[
                  "N°",
                  "Fecha",
                  "Tipo",
                  "Informe",
                  "Visualizar",
                  "dcm/jpeg",
                  "Compartir",
                ].map((text, i) => (
                  <TableCell key={i} align="center" sx={styles.headerCell}>
                    {text}
                  </TableCell>
                ))}
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
                      <Tooltip
                        title={
                          study.tieneINF
                            ? "Ver informe"
                            : "Sin informe disponible"
                        }
                      >
                        <span>
                          <IconButton
                            onClick={() => handleInformeClick(study)}
                            disabled={!study.tieneINF || loadingInforme}
                          >
                            <DescriptionIcon
                              sx={{
                                color: study.tieneINF ? "#9c27b0" : "#ccc",
                              }}
                            />
                          </IconButton>
                        </span>
                      </Tooltip>
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
                      <DownloadStudyButton
                        ID={study.ID}
                        enabled={!!study.ID}
                        patient={patient}
                        format="dcm"
                        label="Descargar DICOM"
                      />

                      <DownloadStudyButton
                        ID={study.ID}
                        enabled={!!study.ID}
                        patient={patient}
                        format="jpeg"
                        label="Descargar imágenes JPEG/JPG"
                      />
                    </TableCell>

                    {/* 🔗 Compartir */}
                    <TableCell align="center">
                      <Tooltip
                        title={
                          study.shareURL || study.retrieveURL
                            ? "Compartir estudio"
                            : "Compartir no disponible"
                        }
                      >
                        <span>
                          <IconButton
                            onClick={() => {
                              const url =
                                study.shareURL ||
                                study.retrieveURL ||
                                window.location.href;
                              if (!url) return;

                              if (navigator.share) {
                                navigator
                                  .share({
                                    title: "Estudio Médico",
                                    text: "Mirá este estudio",
                                    url,
                                  })
                                  .catch(() => {});
                              } else {
                                navigator.clipboard
                                  .writeText(url)
                                  .then(() =>
                                    alert("Enlace copiado al portapapeles 📋")
                                  )
                                  .catch(() =>
                                    alert("No se pudo copiar el enlace 😞")
                                  );
                              }
                            }}
                            disabled={!study.shareURL && !study.retrieveURL}
                          >
                            <ShareIcon
                              sx={{
                                color:
                                  study.shareURL || study.retrieveURL
                                    ? "#4caf50"
                                    : "#ccc",
                              }}
                            />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* 🧾 Modal visor PDF */}
      <InformeViewerIframe
        open={openInforme}
        onClose={() => setOpenInforme(false)}
        selectedStudy={selectedStudy}
      />
    </>
  );
};

export default StudyTable;
