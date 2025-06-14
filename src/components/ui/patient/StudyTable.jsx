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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';

const styles = {
  paper: {
    mt: 4,
    borderRadius: 3,
    boxShadow: 6,
    p: 1,
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  headerRow: {
    backgroundColor: '#1976d2',
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
  },
  evenRow: {
    backgroundColor: '#ffffff',
    '&:hover': { backgroundColor: '#e3f2fd' },
  },
  oddRow: {
    backgroundColor: '#f5f5f5',
    '&:hover': { backgroundColor: '#e3f2fd' },
  },
  icons: {
    view: (enabled) => ({ color: enabled ? '#1976d2' : '#ccc' }),
    download: (enabled) => ({ color: enabled ? '#555' : '#ccc' }),
    report: (enabled) => ({ color: enabled ? '#9c27b0' : '#ccc' }),
  },
};

const formatDate = (dicomDate) => {
  if (!dicomDate || dicomDate.length !== 8) return '-';
  const year = dicomDate.substring(0, 4);
  const month = dicomDate.substring(4, 6);
  const day = dicomDate.substring(6, 8);
  return `${day}/${month}/${year}`;
};

const StudyTable = ({ studies }) => (
  <Paper sx={styles.paper}>
    <Typography variant="h5" align="center" gutterBottom sx={styles.title}>
      Estudios del Paciente
    </Typography>

    <Box sx={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow sx={styles.headerRow}>
            {['N°', 'Fecha', 'Tipo', ' ', ' ', ' '].map((text, i) => (
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
              <TableRow key={index} sx={isEven ? styles.evenRow : styles.oddRow}>
                <TableCell align="center">{study.accessionNumber}</TableCell>
                <TableCell align="center">{formatDate(study.studyDate)}</TableCell>
                <TableCell align="center">{study.modality || '-'}</TableCell>

                <TableCell align="center">
                  <Tooltip title={study.reportURL ? 'Ver informe' : 'Sin informe'}>
                    <span>
                      <IconButton
                        component="a"
                        href={study.reportURL || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        disabled={!study.reportURL}
                      >
                        <DescriptionIcon sx={styles.icons.report(!!study.reportURL)} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>

                <TableCell align="center">
                  <Tooltip title={study.retrieveURL ? 'Ver estudio' : 'No disponible'}>
                    <span>
                      <IconButton
                        component="a"
                        href={study.retrieveURL || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        disabled={!study.retrieveURL}
                      >
                        <VisibilityIcon sx={styles.icons.view(!!study.retrieveURL)} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>

                <TableCell align="center">
                  <Tooltip title={study.downloadURL ? 'Descargar estudio' : 'No disponible'}>
                    <span>
                      <IconButton
                        component="a"
                        href={study.downloadURL || '#'}
                        download
                        disabled={!study.downloadURL}
                      >
                        <DownloadIcon sx={styles.icons.download(!!study.downloadURL)} />
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
);

export default StudyTable;
