import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewStudyButton = ({ studyUID, enabled }) => {
  const abrirVisor = () => {
    if (!enabled || !studyUID) return;

    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
//     http://localhost:8042/ohif/viewer?StudyInstanceUIDs=
    const viewerUrl = `http://localhost:8042/ohif/viewer?StudyInstanceUIDs=${studyUID}`;

    const nuevaVentana = window.open(
      viewerUrl,
      '_blank',
      `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,
       width=${width},height=${height},top=0,left=0`
    );

    if (!nuevaVentana) {
      alert('🔒 Bloqueador de ventanas activado. Permití ventanas emergentes para este sitio.');
    } else {
      nuevaVentana.onload = () => {
        nuevaVentana.document.documentElement.requestFullscreen?.();
        nuevaVentana.focus();
      };
    }
  };

  return (
    <Tooltip title={enabled ? 'Ver estudio' : 'No disponible'}>
      <span>
        <IconButton onClick={abrirVisor} disabled={!enabled}>
          <VisibilityIcon sx={{ color: enabled ? '#1976d2' : '#ccc' }} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ViewStudyButton;
