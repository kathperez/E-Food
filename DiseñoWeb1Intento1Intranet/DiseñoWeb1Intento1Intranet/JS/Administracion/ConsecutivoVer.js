window.onload = function ()
    {   
        console.log("Entró al onload");  
        const consecutivoGet = "https://localhost:44308/Api/Consecutivo";
        
        list(consecutivoGet).catch((e) => console.error(e));    
};
let Arrconsecutivo = [];

async function list(userGet = "") {
    try {
        const users = await request(userGet);
        const usersList = await JSON.parse(users);        
        console.log("dentro de llamado")
        console.log(usersList);
        generarTabla(usersList);
    } catch (err) {
        console.log('Error: '+ err);
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
                        <td>${valor.consecutivo}</td>
                        <td>${valor.desc}</td>
                        <td><a  id="${cont}" style="color: dimgrey;" href='/Administracion/EdicionNuevoConsecutivo '>Editar</a></td>
                       
                      </tr>
        `
        cont = cont + 1;
        Arrconsecutivo.push(valor);

    }
    console.log("Imprimiendo el array");
    console.log(Arrconsecutivo)
    console.log("Imprimiendo índice de array");
    console.log(Arrconsecutivo[0])
}
$("#contenido").on('click', 'a', function () {
    var id = $(this).attr('id');

    localStorage.setItem('consecID', id);//Indice seleccionado que se va a editar
    localStorage.setItem('consecutivos', JSON.stringify(Arrconsecutivo));//ese guarda el arreglo de consecutivos para poder usarlo en otro JS.

});


$("#contenido").on('click', 'button', function () {
    var id = $(this).attr('id');
    var descripcion = Arrconsecutivo[id].desc;
    var consecutivo = Arrconsecutivo[id].consecutivo;
    console.log("dentro de eliminar:consecutivo");
    console.log(consecutivo);
    console.log("dentro de eliminar: descripcion");
    console.log(descripcion);
    var respuesta = confirm('¿Seguro que desea eliminar el consecutivo?');
    if (respuesta == true) {
        console.log("se eligio eliminar");
        eliminar(consecutivo, descripcion);


    } else {

    }
  //  load();
   
});


function eliminar(consecutivo, descripcion) {
    var data = {
       usuario: "karla",        
    };
    var url = 'https://localhost:44308/api/Consecutivo?id_conse=' + consecutivo + '&descripcion=' + descripcion;
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
        .then(text => console.log(text))
        .then(res => console.log(res))
        .then(data => console.log(data))
        .catch(err => console.log('error', err));
    $('#formulario').trigger("reset");
    
}


//window.location.href = '/Administracion/EdicionNuevoConsecutivo ';