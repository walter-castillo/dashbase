import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Hidden } from '@mui/material';
import { columns, getDataRows, dataGridConfig } from './dataGridUserConfig'; 

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [filterModel, setFilterModel] = useState({});
  const { state, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  const rows = getDataRows(state.users);

  const handleSortModelChange = (model, details) => {
    console.log('Sort:', model);
  };

  const handleFilterModelChange = (newModel) => {
    console.log('Nuevo modelo de filtro:', newModel);
    setFilterModel(newModel);
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
          
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowCount={state.total}
         
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
        />
      </div>
    </div>
  );
};






























/* import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { Link} from 'react-router-dom';
import { Button, Typography, Box, Hidden } from '@mui/material';

function BooleanRender( {value} ) {
  return value.row.status ? '✔️' : '❌'}

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState();
const [filterModel, setFilterModel] = useState({});

  const { state, getUsers } = useContext(UserContext);

  useEffect(() => { 
    getUsers()
     {console.log(page )}
  
  }, []);

  const { users } = state;

  const columns = [
    { field: 'id', headerName: 'ID', width: 220, sortable: false},
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo electrónico', width: 200, sortable: false },
    { field: 'phone', headerName: 'Teléfono', width: 150, filterable: false, sortable: false },
    { field: 'roles', headerName: 'Roles', width: 250 , filterable: false, sortable: false},
    { field: 'status', headerName: 'Activo', width: 60, renderCell: (value) => <BooleanRender value={value} /> },

  ];

  const rows = users.map(user => ({
    id: user.uid,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles.map(role => role.role).join(', '), 
    status: user.status
  }));

  const handleSortModelChange = (model, details) => {
    console.log('Sort:', model);

  };

  const handleRowClick = (params) => {
    console.log('click fila',params)
  };

 const handleFilterModelChange = (newModel) => {
    // Imprime el nuevo modelo de filtro en la consola
    console.log('Nuevo modelo de filtro:', newModel);

    // Actualiza el estado con el nuevo modelo de filtro
    setFilterModel(newModel);
  };

  return (
    <div >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>Lista de Usuarios</Typography>

        <Button component={Link} to="crear" variant="contained" >Crear Usuario</Button>
    
      </Box>
      
      <div style={ { overflow: 'hidden'}}>
        <DataGrid 

         localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            '.MuiDataGrid-virtualScroller': { height: 'auto',  minHeight: '100px'}
          }}
          // paginationMode="server"
          rows={rows} 
          columns={columns}
          loading={state.isLoading}
          // slots={{ toolbar: GridToolbar }
          rowHeight={35}
           initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
     
          pageSizeOptions={[10, 20, 30]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowCount={state.total}
          
          hideFooterSelectedRowCount={true}
          

          
            // onRowClick={handleRowClick}
          onFilterModelChange={handleFilterModelChange}
          
          onSortModelChange={handleSortModelChange}
      
        
        />

      </div>
    </div>
  );
};
 */