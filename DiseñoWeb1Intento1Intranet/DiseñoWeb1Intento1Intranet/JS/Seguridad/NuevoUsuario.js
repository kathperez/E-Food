window.onload = function () {

    console.log("Entró al onload");
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;

};

var rolesAcceso = ['Administrador', 'Seguridad'];//Cambiar aquí los roles permitidos

const uri = "https://localhost:44308/api/Usuario";
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
    let addUser = document.getElementById('usuario');
    let addPassword = document.getElementById('contrasena');
    let addEmail = document.getElementById('email');
    let addPregunta = document.getElementById('pregunta');
    let addRespuesta = document.getElementById('respuesta');
    let addConContrasena = document.getElementById('confirmarContrasena');
    var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
   

    if (!addUser.value) {
        console.log('Espacio requerido');
        addUser.focus();
        verificar = false;
    } else if (!addPassword.value) {
        console.log('Espacio de contraseña requerido');
        addPassword.focus();
        verificar = false;
    }
    else if (!addConContrasena.value) {
        console.log('Espacio de contraseña requerido');
        addConContrasena.focus();
        verificar = false;
    }
    else if (addPassword.value != addConContrasena.value) {

        console.log('Las contraseñas no coinciden');
        addPassword.focus();
        verificar = false;
    }
    else if (!addEmail.value) {
        console.log('Espacio de Email requerido');
        addEmail.focus();
        verificar = false;
    } else if (!expresion.test(addEmail.value)) {
        alert('Dirección de correo inválida');
        addEmail.focus();
        verificar = false;    
    }
    else if (!addPregunta.value) {
        console.log('Espacio de Pregunta requerido');
        addPregunta.focus();
        verificar = false;
    } else if (!addRespuesta.value) {
        console.log('Espacio de Respuesta requerido');
        addRespuesta.focus();
        verificar = false;
    }

    console.log(addRespuesta.value);

    if (verificar) {
        const item = {
            usuario: addUser.value,
            contrasena: addPassword.value,
            email: addEmail.value,
            pregunta: addPregunta.value,
            respuesta: addRespuesta.value,
            estado: "Activo"
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

        borrar();
    }


}
function borrar() {

    document.getElementById('usuario').value = "";
    document.getElementById('contrasena').value = "";
    document.getElementById('email').value = "";
    document.getElementById('pregunta').value = "";
    document.getElementById('respuesta').value = "";
    document.getElementById('confirmarContrasena').value = "";
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
