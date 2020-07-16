(function () {
    'use strict';
    //Para obtener usuario activo

    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idProcesador'];
    localStorage.removeItem('idProcesador'); // Clear the localStorage
    console.log("Lo que viene de index");
    console.log(index);
    var arreglo = [];
    arreglo = localStorage.getItem('procesador');
    arreglo = JSON.parse(arreglo);  
    localStorage.removeItem('procesador'); // Clear the localStorage

    //Llamado a API para traer tarjetas disponibles y tarjetas asignada
    var tarjetas = document.querySelector('#tarjetasDisponibles');
    var tar_asignadas = document.querySelector('#tarjetasAsigandas');
    var disponibles = [];//acá se van a guardar todas las tarjetas disponibles
    var ligadas;//acá se van a guardas las tarjetas ya asociadas al código de Tarjeta


    async function list(Get = "") {
        try {
            const objetoRecibido = await request(Get);
            const objetoList = await JSON.parse(objetoRecibido);
            console.log('lo que vino dentro del llamadoa  ligadas');
            ligadas = objetoList;
            console.log('dentro de asignadas');
            console.log(ligadas)
            asignadas(ligadas);
            const URLGetTarjetas = "https://localhost:44308/api/Tarjeta";
            listTarjetas(URLGetTarjetas).catch((e) => console.error(e));
        } catch (err) {
            console.log('Error: ' + err);
        }

    }

    async function listTarjetas(Get = "") {
        try {
            const objetoRecibido = await request(Get);
            const objetoList = await JSON.parse(objetoRecibido);
            console.log('lo que vino dentro del llamadoa  tarjetas');
            disponibles = objetoList;
            console.log(objetoList);
            cargar();
        } catch (err) {
            console.log('Error: ' + err);
        }

    }

    function cargar() {
        console.log('Dentro de cargar');
        tarjetas.options.length = 0;
        console.log("imprimiendo ligadas");
        const lig = JSON.parse(ligadas);
        console.log(lig);
        console.log("Imprimiendo disponibles");
        const disp = JSON.parse(disponibles);
        console.log(disp);
        var i;
        var j;
        console.log('length');
        console.log(disp.length)
        for (i = 0; i < disp.length; i++) {
            var token = true;
            for (j = 0; j < lig.length; j++) {
                if (disp[i].codigo == lig[j].codigoTarj) {
                    token = false;
                    console.log('codigo disponible');
                    console.log(disp[i].codigo);
                    console.log('codigo ligada');
                    console.log(lig[j].codigoTarj);
                    break;
                }
            }
            if (token) {
                console.log('Antes de mandar opcions');
                console.log(disp[i].descripcion);
                addOptions(disp[i].descripcion);
            }
        }
    }
    function addOptions(elemento) {
        var option = document.createElement("option");
        option.innerText = elemento;
        tarjetas.appendChild(option);
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


    function asignadas(array) {
        const parseado = JSON.parse(array);
        var tarjetasAsignadas = document.getElementById('tarjetasAsignadas');
        for (let value of parseado) {
            var option = document.createElement("option");
            option.innerText = value.descripcion;
            console.log('asignando a ligadas');
            console.log(value);
            tarjetasAsignadas.appendChild(option);
        }
        // cargar();
    }
    var agregar_tarjeta = () => {
        let codTarjetaNueva = document.getElementById('tarjetasDisponibles').value;
        let codProcesador = arreglo[index].codigo;
        console.log('Dentro de agregar');
        console.log('codigo tarjeta');
        console.log(codTarjetaNueva);
        console.log('cod procesador')
        console.log(codProcesador);
        //  console.log();
        var url = 'https://localhost:44308/api/ProcesadorTarjeta';
        var datos = {
            codigoProce: codProcesador,
            codigoTarje: codTarjetaNueva,
            usuario: 'karla'
        };

        fetch(url, {
            method: 'POST', // or 'PUT',
            //mode: 'no-cors',
            body: JSON.stringify(datos), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin':'http://127.0.0.1:5500'
                'Access-Control-Allow-Origin': 'https://localhost'
            }
        }).then(response => response.text())
            .then(text => {
                alert(text),
                    $("#tarjetasAsignadas").empty();
            })
            .then(() => {
                const URLGet = 'https://localhost:44308/Api/ProcesadorTarjeta/' + codProcesador;
                list(URLGet).catch((e) => console.error(e));
            })
            .catch(err => console.log('error', err));
        $('#formulario').trigger("reset");
    }
    //Quitar tarjeta
    var quitar_tarjeta = () => {
        var confirmacion = confirm('¿Seguro que desea eliminar la tarjeta?');
        if (confirmacion) {
            let codTarjetaSeleccionada = document.getElementById('tarjetasAsignadas').value;
            let codProcesador = arreglo[index].codigo;
            let user = localStorage['user'];
            var url = 'https://localhost:44308/api/ProcesadorTarjeta?tipoTarjeta=' +
                codTarjetaSeleccionada +
                '&tipoProcesador=' + codProcesador;
            var datos = {
                usuario: user
            };

            fetch(url, {
                method: 'DELETE', // or 'PUT',
                //mode: 'no-cors',
                body: JSON.stringify(datos), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin':'http://127.0.0.1:5500'
                    'Access-Control-Allow-Origin': 'https://localhost'
                }
            }).then(response => response.text())
                .then(text => {
                    alert(text);
                    $("#tarjetasAsignadas").empty();
                })
                .then(() => {
                    const URLGet = 'https://localhost:44308/Api/ProcesadorTarjeta/' + codProcesador;
                    list(URLGet).catch((e) => console.error(e));
                })
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
    //  var codTest = '';
    var init = () => {
        if (arreglo == undefined) {
            alert("Error no se encuentra dentro de un procesador de pago, favor regresar al menú de medios de pago y repetir el proceso ");
           
        } else
        {
            const URLGet = 'https://localhost:44308/Api/ProcesadorTarjeta/' + arreglo[index].codigo;
            list(URLGet).catch((e) => console.error(e));
            var btnPost = document.getElementById('asignar');
            btnPost.onclick = agregar_tarjeta;
            var btnDelete = document.getElementById('eliminar');
            btnDelete.onclick = quitar_tarjeta;
        }
       
       
        var btnSalir = document.getElementById('salir');
        btnSalir.onclick = salir;
       
    }
    init();


})();