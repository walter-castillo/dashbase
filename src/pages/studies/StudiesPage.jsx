import { Box } from '@mui/material';
import TableStudies from '../../components/ui/dashStudies/TableStudies';

export const StudiesPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableStudies />
      </Box>
    </Box>
  );
}

