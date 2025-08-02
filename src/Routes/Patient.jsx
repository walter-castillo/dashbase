import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import LoginPatient from '../pages/patient/LoginPatient';
import DicomViewer from '../components/ui/patient/DICOMViewer';

export const Patient = ()=> {
  return (
    <>
      <Route path="/loginPatient" element={<LoginPatient />} />
      
      <Route path="/patient" element={<PatientLayout />} />
      <Route path="/dv" element={<DicomViewer/>  } />
      
    </>
  );
}
