
window.onload = function () {
    const reposBtn = document.getElementById("crear");
    reposBtn.onclick = addItem;
};

const uri = "https://localhost:44308/api/Procesador";

function addItem() {
    event.preventDefault();
    console.log("dentro de agregar")
    var verificar = true;
    let procesadorV = document.getElementById('procesador');
    let nombreV = document.getElementById('nombre');
    let tipoV = document.getElementById('tipo');
    let estadoV;
    let verificacionV;
    let metodoV = document.getElementById('metodo');
    let user = 'karla';

    if (!procesadorV.value) {
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
            procesador: procesadorV.value,
            nombre: nombreV.value,
            tipo: tipoV.value,
            estado: estadoV,
            validacion: verificacionV,
            metodo: metodoV.value,
            usuario: user
        
        };

        fetch(uri, {
            method: 'POST',
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

