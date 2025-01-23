import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {LoginPage} from '../pages/auth/LoginPage';
import {RegisterPage} from '../pages/auth/RegisterPage';
import {UserPage} from '../pages/user/UserPage';
// import Dashboard from '../pages/dashboard/DashPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/about" element={<UserPage />} />
      {/* <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} /> */}
    </Routes>
  );
};

export default AppRoutes;