import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FooterLayout } from '../components/ui/FooterLayout';
import { Route, Routes } from 'react-router-dom';
import {RegisterPage} from '../pages/auth/RegisterPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { useAuth } from '../providers/AuthProvider';

const defaultTheme = createTheme();

export function AuthLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </Box>
        <FooterLayout sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}