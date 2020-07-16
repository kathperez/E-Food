
window.onload = function () {

    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;
    obtenerUsuarios();
    console.log('after obtener usuarios');

   
};

var rolesAcceso = ['Administrador', 'Consulta'];//Cambiar aquí los roles permitidos

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
        console.log("dentro de permiso tarjetas aprobados");
        const reposBtn = document.getElementById("buscar");
        reposBtn.onclick = buscarBitacora;
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}


var arregloUsuarios = [];
const uriUS = "https://localhost:44308/api/Usuario";


function obtenerUsuarios() {
    fetch(uriUS)
        .then(res => res.json())
        .then(data => {
            const json_data = JSON.parse(data);
            arregloUsuarios = json_data;
            mostrarUsuarios(arregloUsuarios);
        })
        .catch(err => console.log('error', err))
}

function mostrarUsuarios(array) {
    var lineas = document.getElementById('usuario');
    for (let value of array) {
        var option = document.createElement("option");
        option.innerText = value.usuario;
        lineas.appendChild(option);
    }
}
function buscarBitacora() {
    event.preventDefault();
    console.log("dentro de buscar")
    var verificar = true;
    let fecha1 = document.getElementById('fecha1').value;
    let fecha2 = document.getElementById('fecha2').value;
    let usuario = document.getElementById('usuario').value;

    if (!fecha1) {
        alert('Ingrese una fecha inicial');
        verificar = false;
    }
    else if (!fecha2) {
        alert('ingrese una fecha final');
        verificar = false;
    } else if (!usuario) {
        alert('ingrese un usuario');
        verificar = false;
    }
    console.log(fecha1);
    console.log(fecha2);
    console.log(usuario);
    const uriBitacora = "https://localhost:44308/api/Bitacora?fecha1=" + fecha1 + "&fecha2=" + fecha2 + "&usuario=" + usuario;

    if (verificar) {
        fetch(uriBitacora)
            .then(res => res.json())
            .then(data => {
                const json_data = JSON.parse(data);
                arregloUsuarios = json_data;
                console.log(arregloUsuarios);
                generarTabla(arregloUsuarios);
            })
            .catch(err => console.log('error', err))
    };
}
    function generarTabla(datos) {
        var contenido = document.querySelector('#contenido');
        console.log('Dentro de generar tabla');
        console.log(datos);
        contenido.innerHTML = ''
        var cont = 0;//se utiliza para obtener indice por editar
        for (let valor of datos) {
            contenido.innerHTML +=
                `
        <tr>
                        <td>${valor.codigo}</td>
                        <td>${valor.usuario}</td>  
                        <td>${valor.fecha}</td>  
                        <td>${valor.mensaje}</td>  
                      </tr>
        `
            cont = cont + 1;          
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


