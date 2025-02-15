import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {AppRoutes} from './Routes/AppRoutes';
import { useAuth } from './providers/AuthProvider';
import { useRole } from './providers/RoleProvider';
import { useUser } from './providers/UserProvider';

function App() {

  const { state } = useAuth();
  const {state:stateUser} = useUser();
  const {state:stateRole} = useRole();
  return (

    <>
    {console.log(state, stateUser, stateRole)}
    <AppRoutes />
    
    </>
    
  );
}

export default App;