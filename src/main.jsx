import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.jsx';
import { UserProvider } from './providers/UserProvider.jsx';
import 'animate.css';
import { RoleProvider } from './providers/RoleProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AuthProvider>
        <UserProvider>  
          <RoleProvider>
              <App />
          </RoleProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
)
