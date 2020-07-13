var id = localStorage['user'];
users = JSON.parse(users);

var rolesAcceso = ['Administrador', 'Seguridad'];//Cambiar aquí los roles permitidos

var rolesUsuario = [];//Roles del usuario activo

var obtenerRoles = () => {
    fetch('https://localhost:44308/api/UsuariRol/' + id)
        .then(res => res.json())
        .then(data => {
            const json_data = JSON.parse(data);
            rolesUsuario = json_data;
            validar();
        })
        .catch(err => console.log('error', err))
}

var permiso;
var validar = () => {
    permiso = false;
    for (i = 0; i < rolesUsuario.length; i++) {
        for (j = 0; j < rolesAcceso.length; j++) {
            if (rolesUsuario[i].descripcion == rolesAcceso[j]) {//Si tiene permiso
                permiso = true;
            }
        }
    }

    if (permiso) {
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        $(document).ready(function () {
            window.setTimeout(function () {
                location.href = "index.html";
            }, 3000);
        });
    }
}
