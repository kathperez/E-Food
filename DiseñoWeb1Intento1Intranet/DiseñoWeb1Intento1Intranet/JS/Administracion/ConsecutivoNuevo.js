
window.onload = function () {
    console.log("Entró al onload");
    var usuarioRoles = localStorage['rolesUsuario'];//Roles del usuario activo
    validar(usuarioRoles);
    var btnSalir = document.getElementById('salir');
    btnSalir.onclick = salir;

   
};

var rolesAcceso = ['Administrador'];//Cambiar aquí los roles permitidos
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
        console.log("dentro de permiso creat tarjetas");
        const reposBtn = document.getElementById("search-btn");
        reposBtn.onclick = addItem;
    } else {
        alert('Alerta!! no estas autorizado para acceder a esta página');
        var url = $("#RedirectTo").val();
        location.href = url;
    }
}


const uri = "https://localhost:44308/Api/Consecutivo";

function addItem() {
    var verificar = true;
    let addNameDesc= document.getElementById('descripcion');
    let addNameCons = document.getElementById('consecutivo');
    let posee_prefijo;
    let user = localStorage['user'];
    let prefij = document.getElementById('pref');
    var estadoPref = () => {
        if (document.getElementById('posee').checked) {
            posee_prefijo = "V";
            console.log("Prefijo: " + posee_prefijo);
           

        } else {
            posee_prefijo = "F";
            console.log("Prefijo: " + posee_prefijo);           
        }
    }
    estadoPref();

    $('#posee').change(function () {
        estadoPref();        
    });  

    if (!addNameCons.value) {
        addNameCons.innerHTML = 'Requerido';
       
        addNameCons.focus();
        verificar = false;
    }
    else if (addNameDesc.value === 'false') {
        console.log('Espacio de descripción requerido');
        
        verificar = false;
    }
    if (verificar) {
        const item = {
            consecutivo: addNameCons.value,
            descripcion: addNameDesc.value,
            posee_pre: posee_prefijo,
            prefijo: prefij.value,
            usuario: user
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
            .then(res => console.log(res))
            .then(data => console.log(data))
            .catch(err => console.log('error', err));
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

