
import { Route, Routes } from "react-router-dom";

import { Error404Page } from "../pages/error/Error404Page";
import { Unauthorized } from "../pages/error/Unauthorized";
import { useAuth } from "../providers/AuthProvider";
import { Public } from "./Public";
import { Private } from "./Private";


const  tokenName =  import.meta.env.VITE_TOKEN_NAME

export const AppRoutes = () => {
  const { state } = useAuth();
  const token = localStorage.getItem(tokenName);
  return (
    <Routes>
      
      {Public()}
      {Private()}
      {/* if(token)  {Private()} */}

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Error404Page />} />

    </ Routes>
  );
};




/* <Routes>
  <Route index element={<Landing />} />
  <Route path="/landing" element={<Landing />} />
  <Route element={<ProtectedRoute user={user} />}>
    <Route path="/home" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
  <Route path="/analytics" element={
    <ProtectedRoute user={user}>
      <Analytics />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={<Admin />} />
</Routes> */




/* import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, children, redirectTo = "/landing" }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};
 */
