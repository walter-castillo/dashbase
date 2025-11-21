import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

export default function EliminarEstudioButton({ estudio, onDelete }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onDelete(estudio); // tu lógica externa
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title={loading ? "Eliminando..." : "Eliminar estudio"}>
        <span>
          <IconButton
            color="error"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} />
            ) : (
              <DeleteForeverIcon sx={{ fontSize: "1.3rem" }} />
            )}
          </IconButton>
        </span>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => !loading && setOpen(false)}
        disableRestoreFocus
      >
        <DialogTitle>Confirmación</DialogTitle>

        <DialogContent>
          <Typography>¿Seguro que querés eliminar este estudio?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>

          <Button color="error" onClick={handleConfirm} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
