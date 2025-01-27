import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import {AppRoutes} from './Routes/AppRoutes';

function App() {
  return (

    <>
    <AppRoutes />
    
    </>
    
  );
}

export default App;