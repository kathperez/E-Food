(function () {
    'use strict';
    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idIndexProducto'];
    localStorage.removeItem('idIndexProducto'); // Clear the localStorage
    console.log("Lo que viene de index");
    console.log(index);
    var arreglo = [];
    arreglo = localStorage.getItem('producto');
    arreglo = JSON.parse(arreglo);
    console.log("Lo que viene de arreglo");
    console.log(arreglo[index]);
    localStorage.removeItem('producto'); // Clear the localStorage   

    var arregloLC = [];    
    const uriLC = "https://localhost:44308/api/LineaComida";


    function obtenerLineas() {
        fetch(uriLC)
            .then(res => res.json())
            .then(data => {
                const json_data = JSON.parse(data);
                arregloLC = json_data;
                mostrarLC(arregloLC);
            }).then(() => {
                modificar();
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

    var modificar = () => {
        console.log("Dentro de modificar antes de ver valores de array");
        console.log(arreglo[index]);
        $('#codigo').val(arreglo[index].codigo);
        $('#descripcion').val(arreglo[index].descripcion);  
        $('#combos').val(arreglo[index].lineaComida);
        $('#contenido').val(arreglo[index].contenido);
       // $('#foto').val(arreglo[index].foto);
    }
    const uri = "https://localhost:44308/api/Producto/1";
    var editar = () => {
        event.preventDefault();
        console.log("dentro de agregar")
        var verificar = true;
        let codigo = document.getElementById('codigo');
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
            const item = {
                cod_prod: codigo.value,
                descripcion: descripcion.value,
                contenido: contenido.value,
                linea_comida: lineaComidaElegida.value,
                usuario: user,
                foto: foto
            };

            fetch(uri, {
                method: 'PUT',
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
    var init = () => {
       console.log("Imprimiendo el array desde el inicio");
       obtenerLineas();  
      //modificar();
        var btnPut = document.getElementById('guardar');
       btnPut.onclick = editar;
    }

    init();

})()