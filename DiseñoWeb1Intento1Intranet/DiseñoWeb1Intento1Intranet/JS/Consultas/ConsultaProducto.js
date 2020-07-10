
window.onload = function () {

    obtenerLineas();
    console.log('after obtener lineas');
    const reposBtn = document.getElementById("buscar");
    reposBtn.onclick = buscarProducto;
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
           // ArrTipoPrecio.push(valor);

        }
        //console.log("Imprimiendo el array");
        //console.log(ArrTipoPrecio)
        //console.log("Imprimiendo índice de array");
        //console.log(ArrTipoPrecio[0])
    }
}


