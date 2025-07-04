// ViewStudyButton2.jsx
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewerPopup from './ViewerPopup';
import { createRoot } from 'react-dom/client';

const ViewStudyButton2 = ({ studyUID, enabled }) => {
  const abrirVisor = () => {
    if (!enabled || !studyUID) return;

    const popup = window.open(
      '',
      '_blank',
      `width=${window.innerWidth},height=${window.innerHeight}`
    );

    if (popup) {
      popup.document.title = 'Visor de Estudio';

      // Inyectar estilos existentes (por ejemplo, MUI y fuentes)
      const styleLinks = document.querySelectorAll('link[rel="stylesheet"]');
      styleLinks.forEach((link) => {
        const newLink = popup.document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = link.href;
        popup.document.head.appendChild(newLink);
      });

      // Inyectar CSS básico para que no se vea crudo
      const style = popup.document.createElement('style');
      style.textContent = `
        body {
          margin: 0;
          font-family: Roboto, sans-serif;
          padding: 20px;
        }
      `;
      popup.document.head.appendChild(style);

      // Crear contenedor y renderizar el componente React
      const div = popup.document.createElement('div');
      popup.document.body.appendChild(div);

      const root = createRoot(div);
      root.render(<ViewerPopup studyUID={studyUID} />);
    } else {
      alert('No se pudo abrir el visor. ¿Está bloqueado el popup?');
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

export default ViewStudyButton2;
