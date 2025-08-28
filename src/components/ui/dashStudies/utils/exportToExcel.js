import * as XLSX from "xlsx";

const exportToExcel = (estudios) => {
  const datos = estudios.map(({ Patient, Study }) => ({
    Nombre: Patient.PatientName,
    DNI: Patient.PatientID,
    Fecha: Study.StudyDate,
    Modalidad: Study.ModalitiesInStudy,
    "N de estudio": Study.AccessionNumber,
    Informe: Study.tieneINF ? 'Sí' : '',
    Institución: Study.InstitutionName,
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Estudios");

  XLSX.writeFile(libro, "Estudios.xlsx");
};

export default exportToExcel;
