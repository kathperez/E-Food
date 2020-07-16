window.onload = function () {
    console.log("Entró al onload");
    var usuario = localStorage['user'];  
    console.log("dentro de load de bienvinido");
    console.log(usuario);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;
    const URLGet = "https://localhost:44308/api/UsuarioRol/" + usuario;
    list(URLGet).catch((e) => console.error(e));
};
let ArrRoles = [];

async function list(Get = "") {
    try {
        const objetoRecibido = await request(Get);
        const objetoList = await JSON.parse(objetoRecibido);
        generarNav(objetoList);

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

function generarNav(datos) {
    var cont = 0;//se utiliza para obtener indice por editar
    for (let valor of JSON.parse(datos)) {
        if (valor.codigo_rol == 1) {
            document.getElementById('navegacion_seguridad').style.display = "block";
            document.getElementById('navegacion_administracion').style.display = "block";
            document.getElementById('navegacion_consulta').style.display = "block";
        }
        if (valor.codigo_rol == 2) {
            document.getElementById('navegacion_seguridad').style.display = "block";
        }
        if (valor.codigo_rol == 3) {
            document.getElementById('navegacion_administracion').style.display = "block";
        }
        if (valor.codigo_rol == 4) {
            document.getElementById('navegacion_consulta').style.display = "block";
        }

        ArrRoles.push(valor);
    }
    localStorage.setItem('rolesUsuario', JSON.stringify(ArrRoles));

    console.log("Imprimiendo el array");
    console.log(ArrRoles)
    console.log("Imprimiendo índice de array");
    console.log(ArrRoles[0])
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