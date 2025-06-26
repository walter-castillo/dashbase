/**
 * Traduce códigos de modalidad DICOM a nombres más legibles o conocidos por usuarios.
 *
 * @param {string} modality - Código DICOM de la modalidad (ej. 'CR', 'CT', 'MR', etc.).
 * @returns {string} Modalidad traducida (ej. 'RX', 'Tomografía', 'Resonancia'). Devuelve '-' si no hay valor.
 */
export const formatModality = (modality) => {
      if (!modality) return '-';
    
      const modalityMap = {
        CR: 'RX',                  // Radiografía Computada
        CT: 'Tomografía',          // Computed Tomography
        MR: 'Resonancia',          // Magnetic Resonance
        US: 'Ecografía',           // Ultrasound
        NM: 'Medicina Nuclear',    // Nuclear Medicine
        XA: 'Angiografía',         // X-Ray Angiography
        MG: 'Mamografía',
        DX: 'Radiografía Digital',
        PT: 'Tomografía por Emisión de Positrones',
        OT: 'Otros',
      };
    
      return modalityMap[modality] || modality;
    };
    