import {  Route } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import LoginPatient from '../pages/patient/LoginPatient';

export const Patient = ()=> {
  return (
    <>
      <Route path="/login/paciente" element={<LoginPatient />} />
      <Route path="/paciente" element={<PatientLayout />} />
    </>
  );
}
