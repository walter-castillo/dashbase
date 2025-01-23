import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className='bg-slate-900 h-screen'>
        <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;