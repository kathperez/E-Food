﻿(function () {
    'use strict';

    //Obtengo el id que voy a modificar y lo muestro en el placeholder
    var index = localStorage['idProcesador'];
    localStorage.removeItem('idProcesador'); // Clear the localStorage   
    var arreglo = [];
    arreglo = localStorage.getItem('procesador');
    arreglo = JSON.parse(arreglo);
    localStorage.removeItem('procesador'); // Clear the localStorage

    var modificar = () => {
        console.log("Dentro de modificar antes de ver valores de array");
        if (arreglo == null) {
            console.log("vacio");
        } else
        {
            $('#codigo').val(arreglo[index].codigo);
            $('#procesador').val(arreglo[index].procesador);
            $('#nombre').val(arreglo[index].nombre);    
            $('#tipo').val(arreglo[index].tipo);   
            if (arreglo[index].estado == "activo") {
                $('#estado').prop("checked", true)
                console.log("activo");
            }
            if (arreglo[index].valdiacion == "V") {
                $('#verificacion').prop("checked", true)
                console.log("V");
            }
            $('#metodo').val(arreglo[index].metodo);
            console.log(arreglo[index].desc);

            }

      
    }

    const uri = "https://localhost:44308/api/Procesador//1";
    var editar = () => {
        event.preventDefault();
        var verificar = true;
        let codigo = document.getElementById('codigo');
        let procesadorV = document.getElementById('procesador');
        let nombreV = document.getElementById('nombre');
        let tipoV = document.getElementById('tipo');
        let estadoV;
        let verificacionV;
        let metodoV = document.getElementById('metodo');
        let user = localStorage['user'];
        if (!codigo.value) {
            alert('campo codigo requerido');
            codigo.focus();
            verificar = false;
        }
        else if (!procesadorV.value) {
            console.log('Espacio de procesador requerido');
            procesadorV.focus();
            verificar = false;
        }
        else if (!nombreV.value) {
            console.log('Espacio de nombre requerido');
            nombreV.focus();
            verificar = false;
        }
        else if (!metodoV.value) {
            console.log('Espacio de disponible requerido');
            metodoV.focus();
            verificar = false;
        }

        var estado = () => {
            if (document.getElementById('estado').checked) {
                estadoV = "activo";
                console.log("estado: " + estadoV);
            } else {
                estadoV = "inactivo";
                console.log("estado: " + estadoV);
            }
        }
        var verifica = () => {
            if (document.getElementById('verificacion').checked) {
                verificacionV = "V";
                console.log("Verificacion: " + verificacionV);

            } else {
                verificacionV = "F";
                console.log("Verificacion: " + verificacionV);
            }
        }

        estado();
        verifica();

        $('#estado').change(function () {
            estado();
        });
        $('#verificacion').change(function () {
            verifica();
        });
        console.log(procesadorV.value);
        console.log(nombreV.value);
        console.log(tipoV.value);
        console.log(estadoV);
        console.log(verificacionV);
        console.log(metodoV.value);


        if (verificar) {
            const item = {
                codigo: codigo.value,
                procesador: procesadorV.value,
                nombre: nombreV.value,
                tipo: tipoV.value,
                estado: estadoV,
                validacion: verificacionV,
                metodo: metodoV.value,
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