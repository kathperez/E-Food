window.onload = function () {

    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;
    const reposBtn = document.getElementById("crear");
    reposBtn.onclick = addItem;
};

var arregloLC = [];
const uri = "https://localhost:44308/api/Producto";
const uriLC = "https://localhost:44308/api/LineaComida";


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
        obtenerLineas();
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}


function obtenerLineas() {
    fetch(uriLC)
        .then(res => res.json())
        .then(data => {
            const json_data = JSON.parse(data);
            arregloLC = json_data;
            mostrarLC(arregloLC);
        })
        .catch(err => console.log('error', err))
}

function mostrarLC(array) {
    var lineas = document.getElementById('combos');
    for (let value of array) {
        var option = document.createElement("option");
        option.innerText = value.descripcion;
        lineas.appendChild(option);
    }
}
function addItem() {
    event.preventDefault();
    console.log("dentro de agregar")
    var verificar = true;
    let descripcion = document.getElementById('descripcion');
    let lineaComidaElegida = document.getElementById('combos');
    let contenido = document.getElementById('contenido');
    let fotoV = document.getElementById('foto');
    let user = localStorage['user'];
    if (!descripcion.value) {
        console.log('Espacio de descripción requerido');
        descripcion.focus();
        verificar = false;
    }
    else if (!lineaComidaElegida.value) {
        console.log('Espacio de linea de comida requerido');
        lineaComidaElegida.focus();
        verificar = false;
    } else if (!contenido.value) {
        console.log('Espacio de contenido requerido');
        contenido.focus();
        verificar = false;
    } else if (!fotoV.value) {
        console.log('Espacio de foto requerido');
        fotoV.focus();
        verificar = false;

    }
    console.log(descripcion.value);
    console.log(lineaComidaElegida.value);
    console.log(contenido.value);
    console.log(descripcion.value);
    if (verificar) {
        const item = {
            descripcion: descripcion.value,
            contenido: contenido.value,
            linea_comida: lineaComidaElegida.value,
            usuario: user,
            foto: fotoV.value.toString()
        };

        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => response.text())
            .then(text => alert(text))
            .catch(err => console.log('error', err));
        $('#formulario').trigger("reset");

    };
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
