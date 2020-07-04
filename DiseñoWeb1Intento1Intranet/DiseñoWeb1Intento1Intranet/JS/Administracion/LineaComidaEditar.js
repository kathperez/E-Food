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
    console.log("Lo que viene de arreglo");
    console.log(arreglo[index]);
    localStorage.removeItem('lineaComida'); // Clear the localStorage
    var idconsecViejo = arreglo[index].cod_consec;
    var tipoConsecutivoViejo = arreglo[index].cod_consec;
    var prefijo;
    var estadoPref = () => {
        if ($('#posee').prop('checked')) {
            prefijo = "V";
            $("#pref").prop('disabled', false);
        } else {
            prefijo = "F";
            $("#pref").prop('disabled', true);
        }
    }
    $('#posee').change(function () {
        estadoPref();
    });

    var modificar = () => {
        console.log("Dentro de modificar antes de ver valores de array");
        console.log(arreglo[index]);
        $('#codigo').val(arreglo[index].codigo);
        $('#descripcion').val(arreglo[index].descripcion);
        console.log(arreglo[index].desc);

        if (arreglo[index].posee_p == "V") {
            $('#posee').prop("checked", true)
            console.log("tiene prefijo");
        }
        $('#pref').val(arreglo[index].pref);

    }
    const uri = "https://localhost:44308/api/LineaComida/1";
    var editar = () => {
        event.preventDefault();
        var verificar = true;
        let codigo = document.getElementById('codigo');  
        let descripcion = document.getElementById('descripcion');            
        let user = 'karla';   
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
    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        modificar();
        var btnPut = document.getElementById('guardar');
        btnPut.onclick = editar;
    }

    init();

})()