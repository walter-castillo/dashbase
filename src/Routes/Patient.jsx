import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import LoginPatient from '../pages/patient/LoginPatient';
import PatientDashboard from '../pages/patient/PatientDashboard';

import GenerateCode from '../pages/patient/GenerateCode';

export const Patient = ()=> {
  return (
    <>
      <Route path="/loginPatient" element={<LoginPatient />} />
      <Route path="/generateCode" element={<GenerateCode />} />
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<PatientDashboard />} />
      </Route>
    </>
  );
}
