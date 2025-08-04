import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHasAccess } from "../../../hooks/useHasAccess";
import { PERMISOS } from "../../../data/constants";

export default function MenuItem() {
  const [open, setOpen] = useState([false, false]); // Inicializa ambos elementos en false


  const permVerUsuarios= useHasAccess({permiso:PERMISOS.USUARIOS_VER_TODOS})
  const permGenerarCodigo = useHasAccess({permiso:PERMISOS.GENERAR_CODIGO})
  const permVerRoles = useHasAccess({permiso:PERMISOS.ROLES_VER_TODOS})
  const permVerEstudios= useHasAccess({permiso:PERMISOS.ESTUDIOS_VER_TODOS})
  

  const handleClick = (index) => {
    const newOpenState = open.map((_, i) =>
      i === index ? !open[index] : false
    );
    setOpen(newOpenState);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {permVerRoles && (
        <ListItemButton component={Link} to="/dashboard/roles">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Roles/Permisos" />
        </ListItemButton>
      )}
      
      {permVerUsuarios && (
        <ListItemButton component={Link} to="/dashboard/usuarios">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
      )}

      {permGenerarCodigo && (
        <ListItemButton component={Link} to="/dashboard/generarcodigo">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Generar codigo" />
        </ListItemButton>
      )}

      {permVerEstudios && (
        <ListItemButton component={Link} to="/dashboard/estudios">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Estudios" />
        </ListItemButton>
      )}

      {/* <ListItemButton onClick={() => handleClick(1)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open[1] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open[1]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="texto2" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}