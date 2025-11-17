import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportToPDF = (estudios) => {
  const doc = new jsPDF();

  const columnas = [
    "Nombre",
    "DNI",
    "Fecha",
    "Modalidad",
    "N de Estudio",
    "Informe",
    "Institución",
  ];

  const filas = estudios.map(({ Patient, Study }) => [
    Patient.PatientName,
    Patient.PatientID,
    Study.StudyDate,
    Study.ModalitiesInStudy,
    Study.AccessionNumber,
    Study.tieneINF ? "Sí" : "",
    Study.InstitutionName,
  ]);

  autoTable(doc, {
    head: [columnas],
    body: filas,
    // ⚡ Aquí definimos la alineación por columna
    columnStyles: {
      1: { halign: "right" }, // DNI
      4: { halign: "right" }, // N de Estudio
      // opcional: otras columnas quedan a la izquierda por default
    },
  });

  doc.save("Estudios.pdf");
};

export default exportToPDF;
