import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const { state, getUsers } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(page);
  }, []);

  const { users } = state;

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo electrónico', width: 200 },
    { field: 'phone', headerName: 'Teléfono', width: 150 },
    { field: 'roles', headerName: 'Roles', width: 250 }, // Nueva columna para roles
  ];

  const rows = users.map(user => ({
    id: user.uid,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles.map(role => role.role).join(', '), // Concatenar nombres de roles
  }));

  const handleCreateUser = () => {
    navigate('/crear-usuario');
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Lista de Usuarios
        </Typography>
        <Button variant="contained" onClick={handleCreateUser}>Crear Usuario</Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          loading={state.isLoading}
          onPageChange={(newPage) => setPage(newPage)}

          initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </div>
  );
};
