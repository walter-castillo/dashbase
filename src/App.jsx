import React from "react"
import { AppRoutes } from "./Routes/AppRoutes"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./layouts/AuthLayout"
import { GeneralLayout } from "./layouts/GeneralLayout"



function App() {


  return (
    <>
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
    </>
  )
}

export default App
