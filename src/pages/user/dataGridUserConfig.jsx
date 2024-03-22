import { esES, getGridStringOperators, getGridBooleanOperators  } from '@mui/x-data-grid';


function BooleanRender( {value} ) {
  return value.row.status ? '✔️' : '❌'}

	

export const columns = [
  { field: 'enum', headerName: '#', width: 80, sortable: false },
  { field: 'id', headerName: 'ID', width: 220, sortable: false },
  { field: 'name', headerName: 'Nombre', width: 150, type: 'string',
  filterOperators: getGridStringOperators().filter(operator => operator.value === 'contains')
  }, 

  { field: 'email', headerName: 'Correo electrónico', width: 20, sortable: false, filterOperators: getGridStringOperators().filter(operator => operator.value === 'contains')}, 
  { field: 'phone', headerName: 'Teléfono', width: 150, filterable: false, sortable: false },
  { field: 'roles', headerName: 'Roles', width: 250, filterable: false, sortable: false },
  { field: 'status', headerName: 'Activo', width: 60, type: "boolean", renderCell: (value) => <BooleanRender value={value} />},
];

export const getDataRows = (users, page, pageSize) => {
  const startIndex = page * pageSize + 1;
  return users?.map((user, index)=> ({
    enum: startIndex + index,
    id: user.uid,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles.map(role => role.role).join(', '),
    status: user.status
  }));
};

export const dataGridConfig = {
  localeText: esES.components.MuiDataGrid.defaultProps.localeText,
  // sx: {'.MuiDataGrid-virtualScroller': { height: 'auto', minHeight: '100px' }},
  rowHeight:35,
  autoHeight:true,
  paginationMode:"server",
  hideFooterSelectedRowCount:true,
  pageSizeOptions:[10, 20, 30]
  
};
