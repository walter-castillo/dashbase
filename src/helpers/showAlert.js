import Swal from 'sweetalert2'

export const showAlert  = (title, icon, timer) => {
  return  Swal.fire({
      position: 'center-end',
      icon: icon || 'success',
      title: title || 'El rol fue eliminado con éxito',
      showConfirmButton: false,
      timer: timer || 1000
  });
}
