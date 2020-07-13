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
        $('#foto').val(arreglo[index].foto);
        document.getElementById("imagenComida").src = (arreglo[index].foto);
        console.log("dentro de modificar");
        console.log((arreglo[index].foto));

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
        let user = 'karla';
        let fotoV = document.getElementById('foto');

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
        console.log(fotoV.value);
        if (verificar) {
            const item = {
                cod_prod: codigo.value,
                descripcion: descripcion.value,
                contenido: contenido.value,
                linea_comida: lineaComidaElegida.value,
                usuario: user,
                foto: fotoV.value.toString()
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
                .catch(err => console.log('error', err));
            $('#formulario').trigger("reset");
            $('#imagenComida').src = "";
        }
    }

    function validarUsuario(datos) {

        var usuarioValido = false;
        for (let valor of JSON.parse(datos)) {
            if (valor.codigo_rol == 1) {
                document.getElementById('navegacion_seguridad').style.display = "block";
                document.getElementById('navegacion_administracion').style.display = "block";
                document.getElementById('navegacion_consulta').style.display = "block";
                usuarioValido = true;
            }
            if (valor.codigo_rol == 2) {
                document.getElementById('navegacion_seguridad').style.display = "block";
            }
            if (valor.codigo_rol == 3) {
                document.getElementById('navegacion_administracion').style.display = "block";
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
    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        // obtenerLineas();  
        var usuarioRoles = localStorage['rolesUsuario'];
        validarUsuario(usuarioRoles);
        var btnPut = document.getElementById('guardar');
        btnPut.onclick = editar;
    }

    init();

})()