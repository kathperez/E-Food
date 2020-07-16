
window.onload = function () {

    obtenerLineas();
    console.log('after obtener lineas');
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;

   
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
        reposBtn.onclick = buscarProducto;
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}



var arregloLC = [];
const uri = "https://localhost:44308/api/Producto";
const uriLC = "https://localhost:44308/api/LineaComida";


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
    var lineas = document.getElementById('lineas');
    for (let value of array) {
        var option = document.createElement("option");
        option.innerText = value.descripcion;
        lineas.appendChild(option);
    }
}

function buscarProducto() {
    event.preventDefault();
    console.log("dentro de buscar")
    var verificar = true;
    let linea = document.getElementById('lineas').value;      
    const uriBitacora = "https://localhost:44308/api/ConsultaProductoLC?lineaComida=" + linea; 
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
                        <td>${valor.codigoProd}</td>
                        <td>${valor.descripcion}</td>  
                        <td>${valor.precio}</td>                
                      </tr>
        `
            cont = cont + 1;
       

        }
       
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
