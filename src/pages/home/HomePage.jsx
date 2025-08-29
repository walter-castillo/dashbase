            
            import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
      return (
        <div>
          <h1>Welcome to the HomePage!</h1>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button component={Link} to="/login" variant="contained">
              Ir a Login
            </Button>
            <Button
              component={Link}
              to="/dashboard/estudios"
              variant="contained"
            >
              Ir a Dashboard
            </Button>
          </Stack>
        </div>
      );
};
