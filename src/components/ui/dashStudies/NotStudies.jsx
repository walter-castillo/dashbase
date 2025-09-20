import React from 'react'

const NotStudies = () => {
  return (
    <TableRow>
      <TableCell colSpan={Object.keys(columnMap).length + 2} align="center">
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <InboxIcon sx={{ fontSize: 48, color: "grey.400" }} />
          <Typography variant="subtitle1" color="text.secondary">
            No se encontraron estudios
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default NotStudies