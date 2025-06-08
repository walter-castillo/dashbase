
import { Route, Routes } from "react-router-dom";

import { Error404Page } from "../pages/error/Error404Page";
import { Unauthorized } from "../pages/error/Unauthorized";
import { Public } from "./Public";
import { Private } from "./Private";
import { Patient } from "./Patient";


const  tokenName =  import.meta.env.VITE_TOKEN_NAME

export const AppRoutes = () => {
  // const { state } = useAuth();
  // const token = localStorage.getItem(tokenName);
  return (
    <Routes>
      
      {Public()}
      {Private()}
      {Patient()}
      
      {/* if(token)  {Private()}
      if(!!token)  {Public()} */}

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Error404Page />} />

    </ Routes>
  );
};

