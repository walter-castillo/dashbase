import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import LoginPatient from '../pages/patient/LoginPatient';
import GenerateCode from '../pages/patient/GenerateCode';
import DicomViewer from '../components/ui/patient/DICOMViewer';

export const Patient = ()=> {
  return (
    <>
      <Route path="/loginPatient" element={<LoginPatient />} />
      <Route path="/generateCode" element={<GenerateCode />} />
      <Route path="/patient" element={<PatientLayout />} />
      <Route path="/dv" element={<DicomViewer/>  } />
      
    </>
  );
}
