window.onload = function () {

    var usuarioRoles = localStorage['rolesUsuario'];
    validarUsuario(usuarioRoles);
    const reposBtn = document.getElementById("crear");
    reposBtn.onclick = addItem;
};

var arregloLC = [];
const uri = "https://localhost:44308/api/Producto";
const uriLC = "https://localhost:44308/api/LineaComida";

function validarUsuario(datos) {
    var cont = 0;//se utiliza para obtener indice por editar
    var usuarioValido = false;
    for (let valor of JSON.parse(datos)) {
        if (valor.codigo_rol == 1) {
            document.getElementById('navegacion_seguridad').style.display = "block";
            document.getElementById('navegacion_administracion').style.display = "block";
            document.getElementById('navegacion_consulta').style.display = "block";
            document.getElementById('producto_validar_Usuario').style.display = "block";
            usuarioValido = true;
        }
        if (valor.codigo_rol == 2) {
            document.getElementById('navegacion_seguridad').style.display = "block";
        }
        if (valor.codigo_rol == 3) {
            document.getElementById('navegacion_administracion').style.display = "block";
            document.getElementById('producto_validar_Usuario').style.display = "block";
            usuarioValido = true;
        }
        if (valor.codigo_rol == 4) {
            document.getElementById('navegacion_consulta').style.display = "block";
        }

    }
    if (usuarioValido == true) {
        obtenerLineas();
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
    let user = 'karla';


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

