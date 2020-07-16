(function () {
    'use strict';

    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idLC'];
    localStorage.removeItem('idLC'); // Clear the localStorage
    console.log("Lo que viene de index");
    console.log(index);
    var arreglo = [];
    arreglo = localStorage.getItem('lineaComida');
    arreglo = JSON.parse(arreglo);  
    localStorage.removeItem('lineaComida'); // Clear the localStorage
   
    var modificar = () => {

        if (arreglo == null) {
            console.log("vacio");
        } else {
            $('#codigo').val(arreglo[index].codigo);
            $('#descripcion').val(arreglo[index].descripcion);            
        }
    }
    const uri = "https://localhost:44308/api/LineaComida/1";
    var editar = () => {
        event.preventDefault();
        var verificar = true;
        let codigo = document.getElementById('codigo');  
        let descripcion = document.getElementById('descripcion');            
        let user = localStorage['user'];
        if (!codigo.value) {
            alert('campo codigo requerido');
            codigo.focus();
            verificar = false;
        }
        else if (!descripcion.value) {
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