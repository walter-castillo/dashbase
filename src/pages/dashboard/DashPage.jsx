import { Container, Grid} from '@mui/material'
import { Outlet } from 'react-router-dom';


export const DashPage = () => {


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12}  sx={{ bgcolor: '#cfe8fc', minHeight: '80vh', p:2 }}>
        
          <Outlet />
        
        </Grid>
    </Container>
  )
}
