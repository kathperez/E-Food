window.onload = function () {
    console.log("Entró al onload");
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;
};
let ArrTarjetas = [];

   //validarUsuario(usuarioRoles);    
var rolesAcceso = ['Administrador', ];//Cambiar aquí los roles permitidos

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
    } else
    {
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
       const URLGet = "https://localhost:44308/api/Tarjeta";
        list(URLGet).catch((e) => console.error(e));
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;      
    }
}

async function list(Get = "") {
    try {
        const objetoRecibido = await request(Get);
        const objetoList = await JSON.parse(objetoRecibido);
        console.log("dentro de llamado")
        console.log(objetoList);
        generarTabla(objetoList);
    } catch (err) {
        console.log('Error: ' + err);
    }

}

function request(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.ontimeout = function () {
            reject("timeout");
        };
        xhr.open("get", url, true);
        xhr.send();
    });
}

function generarTabla(datos) {
    var contenido = document.querySelector('#contenido');
    console.log('Dentro de generar tabla');
    console.log(datos);
    contenido.innerHTML = ''
    var cont = 0;//se utiliza para obtener indice por editar
    for (let valor of JSON.parse(datos)) {
        contenido.innerHTML +=
            `
        <tr>
                        <td>${valor.codigo}</td>
                        <td>${valor.descripcion}</td>
                        <td><a  id="${cont}" style="color: dimgrey;" href='/Administracion/EdicionEliminaNuevaTipoTarjeta '>Editar</a></td>                       
                        <td><button  id="${valor.codigo}" style="color: dimgrey;" >Eliminar</button></td>
                      </tr>
        `
        cont = cont + 1;
        ArrTarjetas.push(valor);

    }
    console.log("Imprimiendo el array");
    console.log(ArrTarjetas)
    console.log("Imprimiendo índice de array");
    console.log(ArrTarjetas[0])
}
$("#contenido").on('click', 'a', function () {
    var id = $(this).attr('id');

    localStorage.setItem('idTarjetas', id);//Indice seleccionado que se va a editar
    localStorage.setItem('tarjetas', JSON.stringify(ArrTarjetas));//ese guarda el arreglo de consecutivos para poder usarlo en otro JS.

});

$("#contenido").on('click', 'button', function () {
    var id = $(this).attr('id');
    var confirmacion = confirm('¿Seguro que desea eliminar la tarjeta?');
    if (confirmacion == true) {
        console.log("se eligio eliminar");
        eliminar(id);
    } else {

    }
    //  load();

});


function eliminar(id) {
    let user = localStorage['user'];
    var data = {
        codigo: id,
        usuario: user
    };
    var url = 'https://localhost:44308/api/Tarjeta/11';
    console.log(url);

    fetch(url, {
        method: 'DELETE', // or 'PUT',
        //mode: 'no-cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin':'http://127.0.0.1:5500'
            'Access-Control-Allow-Origin': 'https://localhost'
        }
    }).then(response => response.text())
        .then(text => alert(text))
        .then(() => {
            const URLGet = "https://localhost:44308/api/Tarjeta";
            list(URLGet).catch((e) => console.error(e));
        })
        .catch(err => console.log('error', err));


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
//window.location.href = '/Administracion/EdicionNuevoConsecutivo ';