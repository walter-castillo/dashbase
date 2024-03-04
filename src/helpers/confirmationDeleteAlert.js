import Swal from 'sweetalert2'

export const ConfirmationDeleteAlert  = (title, icon) => {
  return Swal.fire({
    title: title || '¿Deseas eliminar el rol?',
    icon: icon || 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar'
  })
}
