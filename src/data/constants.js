// permisos.js
export const PERMISOS = {
  USUARIO_CREAR: "usuario.crear",
  USUARIO_ACTUALIZAR: "usuario.actualizar",
  USUARIO_VER: "usuario.ver",
  USUARIOS_VER_TODOS: "usuarios.ver.todos",
  USUARIO_ELIMINAR: "usuario.eliminar",

  ESTUDIO_CREAR: "estudio.crear",
  ESTUDIO_ACTUALIZAR: "estudio.actualizar",
  ESTUDIO_VER: "estudio.ver",
  ESTUDIOS_VER_TODOS: "estudios.ver.todos",
  ESTUDIO_ELIMINAR: "estudio.eliminar",

  ROL_CREAR: "rol.crear",
  ROL_ACTUALIZAR: "rol.actualizar",
  ROL_VER: "rol.ver",
  ROLES_VER_TODOS: "roles.ver.todos",
  ROL_ELIMINAR: "rol.eliminar",

  PERMISO_VER: "permiso.ver",
  PERMISOS_VER_TODOS: "permisos.ver.todos",

  GENERAR_CODIGO: "generar.codigo",

  CARGAR_LABORATORIOS: "cargar.laboratorios",
};


// roles.js
export const ROLES = {
  SUPER_ADMIN: 'Super-Administrador',
  ADMIN: 'Administrador',
  MEDICO: 'Medico',
  PACIENTE: 'Paciente',
};


/* {
  "uid": "6777e5b07d82198fc44f1784",
  "name": "Usuario3",
  "email": "email3@email.com",
  "phone": "1234567893",
  "roles": [
    "Medico",
    "Paciente",
    "Super-Administrador"
  ],
  "permissions": [
    "estudios.ver.todos"
  ]
} */