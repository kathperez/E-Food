﻿window.onload = function () {
    console.log("Entró al onload");
    const URLGet = "https://localhost:44308/api/Procesador";
    list(URLGet).catch((e) => console.error(e));
};
let ArrProcesador = [];

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
        if (valor.tipo === 'Tarjeta de Credito o Debito') {
            contenido.innerHTML +=
                `
        <tr>
                        <td>${valor.codigo}</td>
                        <td>${valor.procesador}</td>
                        <td>${valor.tipo}</td>
                        <td>${valor.estado}</td>
                        <td><a  id="${cont}" style="color: dimgrey;" href='/Administracion/EdicionEliminaNuevoMedioPago'>Editar</a></td>                       
                        <td><button  id="${valor.codigo}" style="color: dimgrey;">Eliminar</button></td>
                        <td><a  id="${cont}" style="color: dimgrey;" href='/Administracion/NuevoProcesadorTarjeta'>Tarjetas</a></td>
                        </tr>
        `
            cont = cont + 1;
            ArrProcesador.push(valor);
        } else {
            contenido.innerHTML +=
                `
        <tr>
                        <td>${valor.codigo}</td>
                        <td>${valor.procesador}</td>
                        <td>${valor.tipo}</td>
                        <td>${valor.estado}</td>
                         <td><a  id="${cont}" style="color: dimgrey;" href='/Administracion/EdicionEliminaNuevoMedioPago '>Editar</a></td>
                        <td><button  id="${valor.codigo}" style="color: dimgrey;" >Eliminar</button></td>
                        <td><a  id="${cont}" style="color: dimgrey;" href='#'></a></td>
                      </tr>
        `
            cont = cont + 1;
            ArrProcesador.push(valor);
        }
    }
    console.log("Imprimiendo el array");
    console.log(ArrProcesador)
    console.log("Imprimiendo índice de array");
    console.log(ArrProcesador[0])
}


$("#contenido").on('click', 'a', function () {
    console.log('Dentro de click editar');
    var id = $(this).attr('id');
    localStorage.setItem('idProcesador', id);//Indice seleccionado que se va a editar
    localStorage.setItem('procesador', JSON.stringify(ArrProcesador));//ese guarda el arreglo de procesadores para poder usarlo en otro JS.

});

$("#contenido").on('click', 'button', function () {
    var id = $(this).attr('id');
    var confirmacion = confirm('¿Seguro que desea eliminar el procesador?');
    if (confirmacion == true) {
        console.log("se eligio eliminar");
        eliminar(id);
    } else {

    }
    //  load();

});


function eliminar(id) {
    var data = {
        codigo: id,
        usuario: "karla"
    };
    var url = 'https://localhost:44308/api/Procesador/1';
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
            const URLGet = "https://localhost:44308/api/Procesador";
            list(URLGet).catch((e) => console.error(e));
        })
        .catch(err => console.log('error', err));


}


//window.location.href = '/Administracion/EdicionNuevoConsecutivo ';