
window.onload = function () {
    const reposBtn = document.getElementById("crear");
    reposBtn.onclick = addItem;
};

const uri = "https://localhost:44308/api/TiqueteDescuento";

function addItem() {
    event.preventDefault();
    console.log("dentro de agregar")
    var verificar = true;
    let codigoV = document.getElementById('codigo');
    let descripcionV = document.getElementById('descripcion');
    let disponibleV = document.getElementById('disponible');
    let descuentoV = document.getElementById('descuento');
    let user = 'karla';

    if (!codigoV.value) {
        console.log('Espacio de codigo requerido');
        codigoV.focus();
        verificar = false;
    }
    else if (!descripcionV.value) {
        console.log('Espacio de descripción requerido');
        descripcionV.focus();
        verificar = false;
    }
    else if (!disponibleV.value) {
        console.log('Espacio de disponible requerido');
        disponibleV.focus();
        verificar = false;
    } 
    else if (!descuentoV.value) {
        console.log('Espacio de descuento requerido');
        descuentoV.focus();
        verificar = false;
    } else if (descuentoV.value < 0 || descuentoV.value > 99) {
        console.log('Espacio de descuento incorrecto');
        descuentoV.focus();
        verificar = false;
    }
    if (verificar) {
        const item = {
            codigo: codigoV.value,
            descripcion: descripcionV.value,
            disponible: disponibleV.value,
            descuento: descuentoV.value,
            usuario: user
        };

        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                console.log('dentro de then');
                alert(response);
            })
            .catch(error => {
                console.log('dentro de catch');
                console.error('Unable to add item.', error)
                alert('No se guardó');
            });
        $('#formulario').trigger("reset");
    }
}

