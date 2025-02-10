import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FooterLayout } from '../components/ui/FooterLayout';
import { Outlet } from 'react-router-dom';


const defaultTheme = createTheme();

export function AuthLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
          <Outlet />
        </Box>
        <FooterLayout sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}