import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatModality } from "../../utils/formatModality";
import { useParams } from "react-router-dom";
import { InvitadoAxios } from "../../config/axiosClients";
import InformeButton from "../ui/actionInforme/InformerButton";
import ButtonOpenVisor from "../ui/action/ButtonOpenVisor";
import DownloadImgButton from "../ui/action/DownloadImgButton";

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

const TableInvitado = ({ studies, patient }) => {

  const token = useParams().token; // Token en la ruta: /invitado/:token  
  
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
                {["N°", "Fecha", "Tipo", "Informe", "ver", "jpg"].map(
                  (text, i) => (
                    <TableCell key={i} align="center" sx={styles.headerCell}>
                      {" "}
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
                      {" "}
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
                          fetcher={InvitadoAxios}
                          endpoint={`/invitado/informe/ver/`}
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
                      <ButtonOpenVisor
                        studyId={study.StudyInstanceUID}
                        endpointFront="/visor-invitado/"
                      />
                    </TableCell>

                    {/* 💾 Descargar  */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row", 
                          justifyContent: "center",
                          alignItems: "center",
                          flexWrap: "nowrap"
                        }}
                      >
            
                        <DownloadImgButton 
                        fetcher={InvitadoAxios}
                        endpoint="/invitado/download/jpeg"
                        id={study.StudyInstanceUID}
                        label="JPG"
                        tooltip="Descargar estudio JPG/JPEG"
                        color="#68f011"
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

export default TableInvitado;
