(function () {
    'use strict';

    //Para obtener usuario activo
 
    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['consecID'];
    localStorage.removeItem('consecID'); // Clear the localStorage
    console.log("Lo que viene de index");
    console.log(index);
    var arreglo = [];
    arreglo = localStorage.getItem('consecutivos');
    arreglo = JSON.parse(arreglo);
    console.log("Lo que viene de arreglo");  
    console.log(arreglo[index]);
    localStorage.removeItem('consecutivos'); // Clear the localStorage
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
        $('#consecutivo').val(arreglo[index].consecutivo);
        $('#descripcion').val(arreglo[index].desc);
        console.log(arreglo[index].desc);
     
        if (arreglo[index].posee_p == "V") {
            $('#posee').prop("checked", true)
            console.log("tiene prefijo");
        }
        $('#pref').val(arreglo[index].pref);

    }
    const uri = "https://localhost:44308/Api/Consecutivo/1";
    var edit = (poseepre) => {
        var verificar = true;
        let addNameDesc = document.getElementById('descripcion');
        let addNameCons = document.getElementById('consecutivo');
        let posee_prefijo;
        let user = 'karla';
        let prefij = document.getElementById('pref');
        var estadoPref = () => {
            if (document.getElementById('posee').checked) {
                posee_prefijo = "V";
                console.log("Prefijo: " + posee_prefijo);


            } else {
                posee_prefijo = "F";
                console.log("Prefijo: " + posee_prefijo);
            }
        }
        estadoPref();

        $('#posee').change(function () {
            estadoPref();
        });

        if (!addNameCons.value) {
            console.log('Espacio de consecutivo requerido');
            verificar = false;
        }
        else if (addNameDesc.value === 'false') {
            console.log('Espacio de descripción requerido');
            verificar = false;
        }
        if (verificar) {
            const item = {
                consec_viejo: arreglo[index].consecutivo,
                descripcion_vie: arreglo[index].desc,
                descripcion: addNameDesc.value,
                posee_pre: posee_prefijo,
                prefijo: prefij.value,
                usuario: user
            };

            fetch(uri, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                })
                .catch(error => console.error('Unable to add item.', error));
        }
    }
    var init = () => {
        console.log("Imprimiendo el array desde el inicio");
        modificar();
      
        var btnPut = document.getElementById('guardar');
        btnPut.onclick = edit;
    }


   // Checkboxes de roles
    var pprefijo = document.getElementById('posee');


    init();

})()