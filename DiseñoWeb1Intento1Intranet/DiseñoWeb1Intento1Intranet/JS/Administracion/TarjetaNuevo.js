
window.onload = function () {
    console.log("Entró al onload");
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);        
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;
};
const uri = "https://localhost:44308/api/Tarjeta";

var rolesAcceso = ['Administrador', 'Mantenimiento'];//Cambiar aquí los roles permitidos
var permiso;
var validar = (usuarioRoles) => {
    console.log('dentro de validar');
    console.log("usuario Roles");
    console.log(usuarioRoles);
    console.log("usuario Acceso");
    console.log(rolesAcceso);
    permiso = false;
    if (usuarioRoles == undefined) {
        permiso = false;
    } else {
        for (i = 0; i < JSON.parse(usuarioRoles).length; i++) {
            for (j = 0; j < rolesAcceso.length; j++) {
                if (JSON.parse(usuarioRoles)[i].descripcion == rolesAcceso[j]) {//Si tiene permiso
                    permiso = true;
                    break;
                }
            }
        }

    }
    if (permiso) {
        console.log("dentro de permiso ");
        const reposBtn = document.getElementById("crear");
        reposBtn.onclick = addItem;
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}

function addItem() {
    event.preventDefault();
    console.log("dentro de agregar")
    var verificar = true;
    let descripcion = document.getElementById('descripcion');
    let user = localStorage['user'];

    if (!descripcion.value) {
        console.log('Espacio de descripción requerido');
        descripcion.focus();
        verificar = false;
    }
    if (verificar) {
        const item = {
            descripcion: descripcion.value,
            usuario: user
        };

        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                console.log('dentro de then');
                alert(response);
            })
            .catch(error => {
                console.log('dentro de catch');
                console.error('Unable to add item.', error)
                alert('No se guardó');
            });
        $('#formulario').trigger("reset");
    }
}

function salir() {

    var confirmacion = confirm('¿Seguro que desea cerrar sesión?');
    if (confirmacion == true) {
        localStorage.removeItem('user');
        localStorage.removeItem('rolesUsuario');
        console.log("se eligio eliminar");
        var url = $("#RedirectToIndex").val();
        location.href = url;
    }
}

