window.onload = function () {

    console.log("Entró al onload");
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;

};

var rolesAcceso = ['Administrador', 'Mantenimiento', 'Seguridad', 'Consulta'];//Cambiar aquí los roles permitidos

const uri = "https://localhost:44308/api/Usuario/1";
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
        console.log("dentro de permiso");
        const reposBtn = document.getElementById("confirmar");
        reposBtn.onclick = addItem;
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}

function addItem() {
    var user = localStorage['user'];

    console.log(user);
    event.preventDefault();
    console.log("dentro de Cambiar contraseña")
    var verificar = true;
    let pswActual = document.getElementById('pswActual');
    let pswNueva = document.getElementById('pswNueva');
    let pswConfirmar = document.getElementById('pswConfirmar');

    if (!pswActual.value) {
        console.log('Espacio requerido');
        pswActual.focus();
        verificar = false;
    } else if (!pswNueva.value) {
        console.log('Espacio de contraseña requerido');
        pswNueva.focus();
        verificar = false;
    }
    else if (!pswConfirmar.value) {
        console.log('Espacio de contraseña requerido');
        pswConfirmar.focus();
        verificar = false;
    }


    console.log(user);
    console.log(pswNueva);


    if (verificar) {
        const item = {
            usuario: user,
            contrasena: pswNueva.value,
            contrasenaVieja: pswActual.value,
            estado: "",
            accion: "cambiarPass"
        };

        fetch(uri, {
            method: 'PUT',
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

        borrar();
    }


}
function borrar() {

    document.getElementById('pswActual').value = "";
    document.getElementById('pswNueva').value = "";
    document.getElementById('pswConfirmar').value = "";

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
