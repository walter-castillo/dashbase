export const data = {
        "total": 4,
    "roles": [
        {
            "_id": "65b2758a62068f0c75188942",
            "role": "Super-Administrador",
            "description": "todos los permisos",
            "status": true,
            "permissions": [ 
                {
                    "_id": "65b2758a62068f0c7518894a",
                    "permission": "crear.usuario"
                },
                {
                    "_id": "65b2758a62068f0c7518894b",
                    "permission": "actualizar.usuario"
                }
        ]
        },
        {
            "_id": "65b2758a62068f0c75188945",
            "role": "Paciente",
            "description": "permisos solo ver su perfil y estudios",
            "status": true,
            "permissions": [
                {
                    "_id": "65b2758a62068f0c7518894f",
                    "permission": "crear.studio"
                },
                {
                    "_id": "65b2758a62068f0c75188950",
                    "permission": "actualizar.studio"
                }
        ]
        },
        {
            "_id": "65b2758a62068f0c75188943",
            "role": "Administrador",
            "description": "con casi todos los permisos",
            "status": true,
            "permissions": [
                {
                    "_id": "65b2758a62068f0c7518894a",
                    "permission": "crear.usuario"
                },
                {
                    "_id": "65b2758a62068f0c7518894b",
                    "permission": "actualizar.usuario"
                },
                {
                    "_id": "65b2758a62068f0c7518894c",
                    "permission": "ver.usuario"
                },
                {
                    "_id": "65b2758a62068f0c7518894d",
                    "permission": "ver.todos.usuarios"
                },
                {
                    "_id": "65b2758a62068f0c7518894e",
                    "permission": "eliminar.usuario"
                },
                {
                    "_id": "65b2758a62068f0c7518894f",
                    "permission": "crear.studio"
                },
                {
                    "_id": "65b2758a62068f0c75188950",
                    "permission": "actualizar.studio"
                },
                {
                    "_id": "65b2758a62068f0c75188951",
                    "permission": "ver.studio"
                },
                {
                    "_id": "65b2758a62068f0c75188952",
                    "permission": "ver.todos.studios"
                },
                {
                    "_id": "65b2758a62068f0c75188953",
                    "permission": "eliminar.studio"
                },
                {
                    "_id": "65b2758a62068f0c75188954",
                    "permission": "crear.rol"
                },
                {
                    "_id": "65b2758a62068f0c75188955",
                    "permission": "actualizar.rol"
                },
                {
                    "_id": "65b2758a62068f0c75188956",
                    "permission": "ver.rol"
                },
                {
                    "_id": "65b2758a62068f0c75188957",
                    "permission": "ver.todos.roles"
                },
                {
                    "_id": "65b2758a62068f0c75188958",
                    "permission": "eliminar.rol"
                },
                {
                    "_id": "65b2758a62068f0c75188959",
                    "permission": "ver.permiso"
                },
                {
                    "_id": "65b2758a62068f0c7518895a",
                    "permission": "ver.todos.permisos"
                }
            ]
        },
        {
            "_id": "65b2758a62068f0c75188944",
            "role": "Medico",
            "description": "solo permisos para ver todos los estudios",
            "status": true,
            "permissions": [
                {
                    "_id": "65b2758a62068f0c75188952",
                    "permission": "ver.todos.studios"
                }
            ]
        }
    ]
}


export const rolePrueba = {
  "role": {
    "_id": "65c67708a75280d5ba213bb3",
    "role": "Administrador",
    "description": "con casi todos los permisos",
    "status": true,
    "permissions": [
      {
        "_id": "65c67708a75280d5ba213bbd",
        "permission": "usuario.crear"
      },
      {
        "_id": "65c67708a75280d5ba213bbe",
        "permission": "usuario.actualizar"
      },
      {
        "_id": "65c67708a75280d5ba213bbf",
        "permission": "usuario.ver"
      },
      {
        "_id": "65c67708a75280d5ba213bc0",
        "permission": "usuarios.ver.todos"
      },
      {
        "_id": "65c67708a75280d5ba213bc1",
        "permission": "usuario.eliminar"
      },
      {
        "_id": "65c67708a75280d5ba213bc2",
        "permission": "estudio.crear"
      },
      {
        "_id": "65c67708a75280d5ba213bc3",
        "permission": "estudio.actualizar"
      },
      {
        "_id": "65c67708a75280d5ba213bc4",
        "permission": "estudio.ver"
      },
      {
        "_id": "65c67708a75280d5ba213bc5",
        "permission": "estudios.ver.todos"
      },
      {
        "_id": "65c67708a75280d5ba213bc6",
        "permission": "estudio.eliminar"
      },
      {
        "_id": "65c67708a75280d5ba213bc7",
        "permission": "rol.crear"
      },
      {
        "_id": "65c67708a75280d5ba213bc8",
        "permission": "rol.actualizar"
      },
      {
        "_id": "65c67708a75280d5ba213bc9",
        "permission": "rol.ver"
      },
      {
        "_id": "65c67708a75280d5ba213bca",
        "permission": "roles.ver.todos"
      },
      {
        "_id": "65c67708a75280d5ba213bcb",
        "permission": "rol.eliminar"
      },
      {
        "_id": "65c67708a75280d5ba213bcc",
        "permission": "permiso.ver"
      },
      {
        "_id": "65c67708a75280d5ba213bcd",
        "permission": "permisos.ver.todos"
      }
    ]
  }
}
