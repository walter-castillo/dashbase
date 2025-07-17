import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // 👈 ESTA es la importante

const exportToPDF = (estudios) => {
  const doc = new jsPDF();

  const columnas = ['Nombre', 'DNI', 'Fecha', 'Modalidad', 'Institución'];
  const filas = estudios.map(({ Patient, Study }) => [
    Patient.PatientName,
    Patient.PatientID,
    Study.StudyDate,
    Study.ModalitiesInStudy,
    Study.InstitutionName,
  ]);

  autoTable(doc, {
    head: [columnas],
    body: filas,
  });

  doc.save('Estudios.pdf');
};

export default exportToPDF;
