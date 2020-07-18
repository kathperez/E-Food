(function () {
    'use strict';

    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idUs'];
    localStorage.removeItem('idUs'); // Clear the localStorage   
    var arreglo = [];
    arreglo = localStorage.getItem('usuariosArr');
    arreglo = JSON.parse(arreglo);
    localStorage.removeItem('usuariosArr'); // Clear the localStorage

    var modificar = () => {
        console.log(index);
        if (arreglo == null) {
            console.log("vacio");
        } else {
            $('#usuario').val(arreglo[index].usuario);
            //$('#estado').val(arreglo[index].estado);
            console.log(arreglo[index].usuario);
        }
    }
    const uri = "https://localhost:44308/api/Usuario/1";
    var editar = () => {
        event.preventDefault();
        var verificar = true;
        let usuario = document.getElementById('usuario');
        let preestado = document.getElementById('estado')
        let estado = preestado.options[preestado.selectedIndex].text;

        if (!usuario.value) {
            alert('campo codigo requerido');
            codigo.focus();
            verificar = false;
        }

        if (verificar) {
            const item = {
                usuario: usuario.value,
                contrasena: "",
                contrasenaVieja: "",
                estado: estado,
                accion: "cambiarEstado"
            };

            fetch(uri, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(response => response.text())
                .then(text => alert(text))
                .catch(err => console.log('error', err));
            

            var urli = $("#RedirectToVerUsuario").val();
            location.href = urli;

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

    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    var rolesAcceso = ['Administrador', 'Seguridad'];//Cambiar aquí los roles permitidos
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
            for (var i = 0; i < JSON.parse(usuarioRoles).length; i++) {
                for (var j = 0; j < rolesAcceso.length; j++) {
                    if (JSON.parse(usuarioRoles)[i].descripcion == rolesAcceso[j]) {//Si tiene permiso
                        permiso = true;
                        break;
                    }
                }
            }

        }

        if (permiso) {
            console.log("usuario tiene acceso");


        } else {
            alert('Alerta!! no estas autorizado para acceder a esta página');
            var url = $("#RedirectTo").val();
            location.href = url;
        }
    }



    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        validar(usuarioRoles);
        modificar();
        var btnPut = document.getElementById('guardar');
        btnPut.onclick = editar;
        var btnSalir = document.getElementById('salir');
        btnSalir.onclick = salir;
    }

    init();

})()