import { useState, useCallback } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { FooterLayout } from '../components/ui/FooterLayout';
import { NavBar } from '../components/ui/Navbar/NavBar';
import { SideBar } from '../components/ui/navbar/Sidebar';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';

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
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            height: '100vh', 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Toolbar />
          
          <Container maxWidth="lg" sx={{ 
            mt: 4, 
            mb: 4,
            flex: 1  
          }}>

            <Grid 
              container
              sx={{ 
                bgcolor: '#cfe8fc', 
                minHeight: '80vh', 
                p: 2,
                borderRadius: 1  
              }}
            >
              <Grid size={{ xs: 12 }}>  
                <Outlet />
              </Grid>
            </Grid>
            
            <FooterLayout sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}