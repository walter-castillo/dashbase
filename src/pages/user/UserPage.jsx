import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Hidden } from '@mui/material';
import { columns, getDataRows, dataGridConfig } from './dataGridUserConfig'; 

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const [filterModel, setFilterModel] = useState({});
  const { state, getUsers } = useContext(UserContext);


  useEffect(() => {
       getUsers((page * pageSize ), pageSize); //paso from y limit

  }, [page,pageSize]);

  const rows = getDataRows(state.users);

  const handleSortModelChange = (model, details) => {
    console.log('Sort:', model);
  };

  const handleFilterModelChange = (newModel) => {
    console.log('Nuevo modelo de filtro:', newModel);
    setFilterModel(newModel);
  };

  const handlePaginationModelChange = (newModel) => {
    setPage(newModel.page);
    setPageSize(newModel.pageSize);
    console.log('paginacion:', newModel);
  };

  
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>Lista de Usuarios</Typography>
        <Button component={Link} to="crear" variant="contained">Crear Usuario</Button>
      </Box>
      <div style={{ overflow: 'hidden' }}>
        <DataGrid
          {...dataGridConfig}
          rows={rows}
          columns={columns}
          loading={state.isLoading}
          rowCount={state.total}
          // pageSizeOptions={[10, 20, 30]}
          pageSizeOptions={[2, 4, 6]}
          initialState={{
            pagination: { paginationModel: { pageSize, page  } },
          }}
          paginationMode="server"

          // onPageSizeChange={handlePageSizeChange}

         
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
          onPaginationModelChange={handlePaginationModelChange}

        />
      </div>
    </div>
  );
};