import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { columns, getDataRows, dataGridConfig } from './dataGridUserConfig'; 

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const [filterModel, setFilterModel] = useState({});
  const { state, getUsers } = useContext(UserContext);


  useEffect(() => {

       getUsers((page + 1), pageSize);

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
  };
  
 const navigate = useNavigate(); // Get the navigate function
  const handleRowDoubleClick = (newModel) => {
    const userId = newModel.row.id;
    navigate(`editar/${userId}`); // Redirect to the edit page
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
          pageSizeOptions={[2, 4, 6]}
          initialState={{
            pagination: { paginationModel: { pageSize, page  } },
          }}
          
          onRowDoubleClick={handleRowDoubleClick}
          onCellDoubleClick={handleRowDoubleClick}
         
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
          onPaginationModelChange={handlePaginationModelChange}

        />
      </div>
    </div>
  );
};


