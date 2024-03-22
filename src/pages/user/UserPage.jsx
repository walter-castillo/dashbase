import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataGrid , useGridApiRef } from '@mui/x-data-grid';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { columns, getDataRows,  dataGridConfig } from './dataGridUserConfig'; 
import { Loading } from '../../components/ui/Loading';
import Errors from '../../components/ui/Errors';

export const UserPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [filterModel, setFilterModel] = useState({});
  const [sortModel, setSortModel] = useState({});
  const { state, getUsers } = useContext(UserContext);

  useEffect(() => {
    const params = {
        page: page + 1,
        limit: pageSize,
        ...filterModel,
        ...sortModel
    };
  getUsers(params);
  }, [page, pageSize, filterModel, sortModel]);

  const rows = getDataRows(state.users, page, pageSize);

  const handleSortModelChange = (model, details) => {  
    setSortModel({
      fieldSort: model[0]?.field,
      sort: model[0]?.sort
    })
  };

 const handleFilterModelChange = (newModel) => {
  const filterValue = newModel?.items[0]?.value || '';
  // if (filterValue.length >= 2) {
    setFilterModel(newModel.items[0]);
  // }
};

  const handlePaginationModelChange = (newModel) => {
    setPage(newModel.page);
    setPageSize(newModel.pageSize);
  };
  
  const navigate = useNavigate(); 
  
  const handleRowDoubleClick = (newModel) => {
    const userId = newModel.row.id;
    navigate(`editar/${userId}`); 
  };

  // if (state.errors) { return (<Errors errorsBack={state.errors} />)  }
  if (state.users== null) { return <Loading />  }

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
         
          initialState={{ pagination: { paginationModel: { pageSize, page  } },}}
          
          onRowClick={handleRowDoubleClick}
          // onRowDoubleClick={handleRowDoubleClick}
          
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
          onPaginationModelChange={handlePaginationModelChange}

        />
      </div>
    </div>
  );
};


