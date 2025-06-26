/**
 * Convierte una fecha DICOM en formato YYYYMMDD a una fecha legible DD/MM/YYYY.
 *
 * @param {string} dicomDate - Fecha DICOM en formato 'YYYYMMDD' (ej. '20240625').
 * @returns {string} Fecha formateada como 'DD/MM/YYYY'. Devuelve '-' si el formato es inválido.
 */

export const formatDate = (dicomDate) => {
      if (!dicomDate || dicomDate.length !== 8) return '-';
            const year = dicomDate.substring(0, 4);
            const month = dicomDate.substring(4, 6);
            const day = dicomDate.substring(6, 8);
      return `${day}/${month}/${year}`;
    };