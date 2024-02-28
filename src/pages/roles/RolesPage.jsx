import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { RoleContext } from '../../contexts/RoleContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { Loading } from '../../components/ui/Loading';
import  Errors  from '../../components/ui/Errors';

export const RolesPage = () => {

  const { state, getRoles, roleDelete } = useContext(RoleContext);

  useEffect(() => { getRoles()}, []);

  const handleDelete = (roleId) => { 
    const isDelete = window.confirm(`¿Deseas eliminar el rol?`);
    if (isDelete) {  roleDelete(roleId)  }  
  };


  if (state.errors) { return (<Errors errorsBack={state.errors} />)  }
  if (state.roles== null) { return <Loading />  }

  return (
       <>
      <Button component={Link} to="crear" variant="contained" color="primary" style={{ marginBottom: '1rem' }}>Crear Nuevo Rol</Button>
      <TableContainer component={Paper}>
        <Table style={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid black' }}>Rol</TableCell>
              <TableCell style={{ border: '1px solid black' }}>Descripción</TableCell>
              <TableCell style={{ border: '1px solid black' }}>Estado</TableCell>
              <TableCell style={{ border: '1px solid black' }}>Permisos</TableCell>
              <TableCell style={{ border: '1px solid black' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.roles && state.roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell style={{ border: '1px solid black' }}>{role.role}</TableCell>
                <TableCell style={{ border: '1px solid black' }}>{role.description}</TableCell>
                <TableCell style={{ border: '1px solid black' }}>{role.status ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell style={{ border: '1px solid black' }}>
                  <ul>
                    {role.permissions.filter(permission => permission.permission !== '').map((permission, index) => (
                      <li key={index}>{permission.permission}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell style={{ border: '1px solid black' }}>
                  <Button onClick={() => handleDelete(role._id)}><DeleteIcon /></Button>
                  <Button component={Link} to={`editar/${role._id}`}><EditIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
