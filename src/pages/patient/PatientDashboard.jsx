
import StudyTable from '../../components/ui/patient/StudyTable';

const PatientDashboard = () => {
  const patient = JSON.parse(localStorage.getItem('patientSession'));
  const studies = JSON.parse(localStorage.getItem('studies')) || [];

  return (
    <div>
      <h2>Estudio más reciente</h2>
      <StudyTable studies={studies.slice(0, 1)} />
      <a href="/patient/studies">Historial</a>
    </div>
  );
};

export default PatientDashboard;
