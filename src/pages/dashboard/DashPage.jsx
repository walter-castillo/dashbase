import { Container, Grid} from '@mui/material'
import { Roles } from '../roles/Roles'


export const DashPage = () => {


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12}  sx={{ bgcolor: '#cfe8fc', minHeight: '80vh', p:2 }}>
        
          <Roles />
        
        </Grid>
    </Container>
  )
}
