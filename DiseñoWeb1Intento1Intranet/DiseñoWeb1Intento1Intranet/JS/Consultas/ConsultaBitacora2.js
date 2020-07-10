
window.onload = function () {

    obtenerUsuarios();
    console.log('after obtener usuarios');
    const reposBtn = document.getElementById("buscar");
    reposBtn.onclick = buscarBitacora;
};


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






