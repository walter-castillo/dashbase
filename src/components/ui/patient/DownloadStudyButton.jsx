
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { PatientAxios } from '../../../config/PatientAxios';
import axios from 'axios';

const styles = {
  icon: (enabled) => ({
    color: enabled ? '#1976d2' : '#ccc',
    cursor: enabled ? 'pointer' : 'not-allowed',
    opacity: enabled ? 1 : 0.5,
  }),
};

const DownloadStudyButton = ({ studyUID, enabled }) => {
  const isEnabled = !!(studyUID && enabled);
  const handleDownload = async (e) => {
    if (!isEnabled) { e.preventDefault(); return }
try {
      const response = await PatientAxios.get(`/study/download/${studyUID}`, {
        responseType: 'blob'
      });

      const contentDisposition = response.headers['content-disposition'];
      const filenameMatch = contentDisposition?.match(/filename="?(.+?)"?$/);
      const filename = filenameMatch?.[1] || 'estudio.zip';
  
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error en la descarga:', err);
    }
  };

  return (
    <Tooltip title={isEnabled ? 'Descargar estudio' : 'No disponible'}>
      <span>
        <IconButton onClick={handleDownload} disabled={!isEnabled}>
          <DownloadIcon sx={styles.icon(isEnabled)} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default DownloadStudyButton;
