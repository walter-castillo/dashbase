import { TablePagination } from "@mui/material";

const PaginacionEstudios = ({
  total,
  pagina,
  porPagina,
  setPagina,
  setPorPagina,
}) => {
  return (
    <TablePagination
      component="div"
      count={total}
      page={pagina}
      onPageChange={(e, newPage) => setPagina(newPage)}
      rowsPerPage={porPagina}
      onRowsPerPageChange={(e) => {
        setPorPagina(parseInt(e.target.value, 10));
        setPagina(0);
      }}
      rowsPerPageOptions={[10, 25, 50, 100]}
      labelRowsPerPage="Cant:"
    />
  );
};

export default PaginacionEstudios;
