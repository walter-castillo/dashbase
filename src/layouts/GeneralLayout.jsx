import { useState, useCallback } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { FooterLayout } from '../components/ui/FooterLayout';
import {  NavBar } from '../components/ui/Navbar/NavBar';
import { SideBar } from '../components/ui/navbar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DashPage } from '../pages/dashboard/DashPage';
import { Error404Page } from '../pages/error/Error404Page';
import { UserPage } from '../pages/user/UserPage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { EditUser } from '../pages/user/EditUser';
import { RolesPage } from '../pages/roles/RolesPage';
import { EditRole } from '../pages/roles/EditRole';
import { CreateRole } from '../pages/roles/CreateRole';
import {CreateUser} from '../pages/user/CreateUser';

const defaultTheme = createTheme();

export function GeneralLayout() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavBar toggleDrawer={toggleDrawer} open={open} />
        <SideBar toggleDrawer={toggleDrawer} open={open} />
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="dashboard" element={<DashPage />}>
                <Route path="usuarios" element={<UserPage />} />
                <Route path="usuarios/editar/:id" element={<EditUser />} />
                <Route path="usuarios/crear" element={<CreateUser />} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="roles/editar/:id" element={<EditRole />} />
                <Route path="roles/crear" element={<CreateRole />} />
                <Route path="productos" element={<ProductsPage />} />
              </Route>
              <Route path="/*" element={<Error404Page />} />
            </Routes>
            <FooterLayout sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}