(function () {
    'use strict';

    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idTarjetas'];
    localStorage.removeItem('idTarjetas'); // Clear the localStorage
    console.log("Lo que viene de index");
    console.log(index);
    var arreglo = [];
    arreglo = localStorage.getItem('tarjetas');
    arreglo = JSON.parse(arreglo);  
    localStorage.removeItem('tarjetas'); // Clear the localStorage

    var modificar = () => {
        console.log("Dentro de modificar antes de ver valores de array");
      
        if (arreglo == null) {
            console.log("vacio");
        } else {
            $('#codigo').val(arreglo[index].codigo);
            $('#descripcion').val(arreglo[index].descripcion);
            console.log(arreglo[index].desc);
        }
    }
    const uri = "https://localhost:44308/api/Tarjeta/1";
    var editar = () => {
        event.preventDefault();
        var verificar = true;
        let codigo = document.getElementById('codigo');
        let descripcion = document.getElementById('descripcion');
        let user = 'karla';
        if (!codigo.value) {
            console.log('campo descripcion requerido');
            codigo.focus();
            verificar = false;
        }
        if (!descripcion.value) {
            console.log('campo descripcion requerido');
            descripcion.focus();
            verificar = false;
        }
        if (verificar) {
            const item = {
                codigo: codigo.value,
                descripcion: descripcion.value,
                usuario: user
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
    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        modificar();
        var btnPut = document.getElementById('guardar');
        btnPut.onclick = editar;
        var btnSalir = document.getElementById('salir');
        btnSalir.onclick = salir;
    }

    init();

})()