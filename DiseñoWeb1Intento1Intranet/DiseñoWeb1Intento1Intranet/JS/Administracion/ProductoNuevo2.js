window.onload = function () {

    obtenerLineas();
    console.log('after obtener lineas');
    const reposBtn = document.getElementById("crear");
    reposBtn.onclick = addItem;
};


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
    let foto = 'foto';
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

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('descripcion', descripcion.value);
        formData.append('contenido', contenido.value);
        formData.append('linea_comida', lineaComidaElegida.value);
        formData.append('usuario', user);       
        formData.append('foto', fileField.files[0]);
        //const item = {
        //    descripcion: descripcion.value,
        //    contenido: contenido.value,
        //    linea_comida: lineaComidaElegida.value,
        //    usuario: user,
        //    foto: foto
        //};

        fetch(uri, {
            method: 'POST',           
            body: formData
        }).then(response => response.text())
            .then(text => alert(text))
            .catch(err => console.log('error', err));
        $('#formulario').trigger("reset");

    };
}