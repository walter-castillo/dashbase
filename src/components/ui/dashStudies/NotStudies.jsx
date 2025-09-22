import React from "react";
import { TableRow, TableCell, Box, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

const NotStudies = ({
  colSpan = 1,
  message = "No se encontraron estudios",
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <InboxIcon sx={{ fontSize: 48, color: "grey.400" }} />
          <Typography variant="subtitle1" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default NotStudies;
