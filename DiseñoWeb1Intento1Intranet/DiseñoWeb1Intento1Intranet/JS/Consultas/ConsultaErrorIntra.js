(function () {

var arregloUsuarios = [];

function buscarBitacora() {
    event.preventDefault();
    console.log("dentro de buscar")
    var verificar = true;
    let fecha1 = document.getElementById('fecha1').value;
    let fecha2 = document.getElementById('fecha2').value;
  

    if (!fecha1) {
        alert('Ingrese una fecha inicial');
        verificar = false;
    }
    else if (!fecha2) {
        alert('ingrese una fecha final');
        verificar = false;
    }
    console.log(fecha1);
    console.log(fecha2);

    const uriBitacora = "https://localhost:44308/api/Consulta_Error_Intranet?fecha1=" + fecha1 + "&fecha2=" + fecha2;

    if (verificar) {
     //  $('#contenido').empty();
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
                        <td>${valor.fecha}</td>  
                        <td>${valor.mensaje}</td>  
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
    var init=() => {
        console.log('after obtener usuarios');
        const reposBtn = document.getElementById("buscar");
        reposBtn.onclick = buscarBitacora;
    }


    init();
})()
