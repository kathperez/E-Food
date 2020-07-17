
window.onload = function () {
    console.log("Entró al onload");
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;
};
let ArrUsuarios = [];

//validarUsuario(usuarioRoles);    
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
        showUsers();
        const reposBtn = document.getElementById("mostar");
        reposBtn.onclick = userSelected;



    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}

function showUsers() {
    var usuarios = localStorage['users'];

    let us = JSON.parse(usuarios);
    let mapIdUsers = us.map(({ usuario }) => usuario);
    console.log(mapIdUsers);


    let select = document.getElementById('selectUsuario');
    for (var index = 0; index < mapIdUsers.length; index++) {
        select.options[select.options.length] = new Option(mapIdUsers[index], index);
    }
}

function userSelected() {


    let preestado = document.getElementById('selectUsuario')
    let opcionSel = preestado.options[preestado.selectedIndex].text;
    console.log(opcionSel);

    const URLGet = "https://localhost:44308/api/UsuarioRol/" + opcionSel;

    list(URLGet).catch((e) => console.error(e));
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
    var contenido = document.querySelector('#contenidoRol');
    console.log('Dentro de generar tabla');
    console.log(datos);
    contenido.innerHTML = '';
    var cont = 0;//se utiliza para obtener indice por editar
    for (let valor of JSON.parse(datos)) {
        contenido.innerHTML +=
            `
        <tr>
                        <td>${valor.descripcion}</td>

                        
                        
                      </tr>
        `
        cont = cont + 1;
        ArrUsuarios.push(valor);
    }
    console.log("Imprimiendo el array");
    console.log(ArrUsuarios)
    console.log("Imprimiendo índice de array");
    console.log(ArrUsuarios[0])
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
