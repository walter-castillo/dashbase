import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { columns, getDataRows,  dataGridConfig } from './dataGridUserConfig'; 

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const [filterModel, setFilterModel] = useState({});
  const [sortModel, setSortModel] = useState([]);
  const { state, getUsers } = useContext(UserContext);


  useEffect(() => {
    // Construir el objeto de parámetros según la página y el tamaño de la página
    const params = {
        page: page + 1,
        limit: pageSize,
        ...filterModel
      // Agregar los filtros si están definidos
    };
    console.log(params)

    getUsers(params);

}, [page, pageSize, filterModel]);

  const rows = getDataRows(state.users, page, pageSize);

/*   const handleSortModelChange = (model, details) => {
     setFilterModel({
    ...filterModel,
    model
  });
  }; */




  const handleSortModelChange = (model, details) => {
    // Obtenemos el primer elemento de model
    const modelObject = model[0];

    // Creamos un nuevo objeto con las propiedades de filterModel y modelObject
    const newFilterModel = {
        ...filterModel,
        ...modelObject
    };

    // Actualizamos el estado filterModel con el nuevo objeto
    setFilterModel(newFilterModel);
    
};

 const handleFilterModelChange = (newModel) => {
  const filterValue = newModel?.items[0]?.value || '';
  if (filterValue.length >= 3 || filterValue.length === 0) {
    console.log(filterValue)
    setFilterModel(newModel.items[0]);
  }
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
          
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
          onPaginationModelChange={handlePaginationModelChange}

        />
      </div>
    </div>
  );
};


