
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/visibility';
import DownloadIcon from '@mui/icons-material/Download';

const formatDate = (dicomDate) => {
  if (!dicomDate || dicomDate.length !== 8) return '-';
  const year = dicomDate.substring(0, 4);
  const month = dicomDate.substring(4, 6);
  const day = dicomDate.substring(6, 8);
  return `${day}/${month}/${year}`;
};

const formatTime = (dicomTime) => {
  if (!dicomTime || dicomTime.length < 4) return '-';
  const hours = dicomTime.substring(0, 2);
  const minutes = dicomTime.substring(2, 4);
  return `${hours}:${minutes}`;
};

const StudyTable = ({ studies }) => (
  <Paper sx={{ overflowX: 'auto', mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>Fecha</strong></TableCell>
          <TableCell><strong>Hora</strong></TableCell>
          <TableCell><strong>Accession</strong></TableCell>
          <TableCell><strong>Descripción</strong></TableCell>
          <TableCell align="center"><strong>Ver</strong></TableCell>
          <TableCell align="center"><strong>Descargar</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {studies.map((study, index) => (
          <TableRow key={index}>
            <TableCell>{formatDate(study.studyDate)}</TableCell>
            <TableCell>{formatTime(study.studyTime)}</TableCell>
            <TableCell>{study.accessionNumber}</TableCell>
            <TableCell>{study.studyDescription || '-'}</TableCell>
            <TableCell align="center">
              <IconButton
                component="a"
                href={study.retrieveURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver"
              >
                <VisibilityIcon color="primary" />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <IconButton
                component="a"
                href={study.downloadURL}
                download
                aria-label="Descargar"
              >
                <DownloadIcon color="action" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default StudyTable;
