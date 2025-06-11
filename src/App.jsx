import { BrowserRouter as Router } from 'react-router-dom';
import {AppRoutes} from './Routes/AppRoutes';
import { useAuth } from './providers/AuthProvider';
import { Loading } from './components/ui/Loading';

function App() {

  const { state } = useAuth();
 
 if (state.isLoading)  { return <Loading /> }

  return <AppRoutes />;
}

export default App;