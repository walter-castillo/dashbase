import { Box } from '@mui/material';
import DashStudies from "../../components/ui/dashStudies/DashStudies";

export const StudiesPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <DashStudies />
      </Box>
    </Box>
  );
}

