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
      <AuthProvider>
      <RoleProvider>
        <UserProvider>  
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </RoleProvider>
      </AuthProvider>
    </>
)
