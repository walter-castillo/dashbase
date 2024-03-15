import { esES } from '@mui/x-data-grid';

function BooleanRender( {value} ) {
  return value.row.status ? '✔️' : '❌'}

export const columns = [
  { field: 'id', headerName: 'ID', width: 220, sortable: false },
  { field: 'name', headerName: 'Nombre', width: 150 },
  { field: 'email', headerName: 'Correo electrónico', width: 200, sortable: false },
  { field: 'phone', headerName: 'Teléfono', width: 150, filterable: false, sortable: false },
  { field: 'roles', headerName: 'Roles', width: 250, filterable: false, sortable: false },
  { field: 'status', headerName: 'Activo', width: 60, renderCell: (value) => <BooleanRender value={value} /> },
];

export const getDataRows = (users) => {
  return users.map(user => ({
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
  // sx: {
  //   '.MuiDataGrid-virtualScroller': { height: 'auto', minHeight: '100px' }
  // },
  rowHeight:35,
  pageSizeOptions:[10, 20, 30],
  autoHeight:true
  
  // Aquí puedes agregar más configuraciones según sea necesario
};
