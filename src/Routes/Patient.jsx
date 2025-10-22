import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import LoginPatient from '../pages/patient/LoginPatient';

export const Patient = ()=> {
  return (
    <>
      <Route path="/loginPatient" element={<LoginPatient />} />
      <Route path="/patient" element={<PatientLayout />} />
      
    </>
  );
}
