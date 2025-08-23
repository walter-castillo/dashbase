export const modalityMap = {
  CR: 'RX',                      // Radiografía Computada
  CT: 'Tomografía',            // Computed Tomography
  MR: 'Resonancia',            // Magnetic Resonance
  US: 'Ecografía',             // Ultrasound
  LB: 'Laboratorio',            
  NM: 'Medicina Nuclear',      // Nuclear Medicine
  XA: 'Angiografía',           // X-Ray Angiography
  MG: 'Mamografía',
  DX: 'Radiografía Digital',
  PT: 'Tomografía EP',
  LAB: 'Laboratorio',
  PDF: 'Informe PDF',
  OT: 'Otros',
};

/**
 * Traduce códigos de modalidad DICOM a nombres más legibles o conocidos por usuarios.
 *
 * @param {string} modality - Código DICOM de la modalidad (ej. 'CR', 'CT', 'MR', etc.).
 * @returns {string} Modalidad traducida (ej. 'RX', 'Tomografía', 'Resonancia'). Devuelve '-' si no hay valor.
 */
export const formatModality = (modality) => {
  if (!modality) return '-';
  return modalityMap[modality] || modality;
};

export const modalityOptions = Object.entries(modalityMap).map(([code, name]) => ({
  value: code, // El valor que se guardará en el estado del filtro (CR, CT, etc.)
  label: name, // El texto que se mostrará al usuario (RX, Tomografía, etc.)
}));