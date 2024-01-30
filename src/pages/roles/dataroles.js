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
    
