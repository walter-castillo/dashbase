import PatientLayout from '../../layouts/PatientLayout';
import StudyTable from '../../components/ui/patient/StudyTable';

const StudyHistory = () => {
  const patient = JSON.parse(localStorage.getItem('patientSession'));
  const studies = JSON.parse(localStorage.getItem('studies')) || [];

  return (
    <PatientLayout patient={patient}>
      <h2>Historial de Estudios</h2>
      <StudyTable studies={studies} />
    </PatientLayout>
  );
};

export default StudyHistory;