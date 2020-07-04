
 window.onload = function () {
    const reposBtn = document.getElementById("search-btn");
    reposBtn.onclick = addItem;
};

const uri = "https://localhost:44308/Api/Consecutivo";

function addItem() {
    var verificar = true;
    let addNameDesc= document.getElementById('descripcion');
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
        addNameCons.innerHTML = 'Requerido';
       
        addNameCons.focus();
        verificar = false;
    }
    else if (addNameDesc.value === 'false') {
        console.log('Espacio de descripción requerido');
        
        verificar = false;
    }
    if (verificar) {
        const item = {
            consecutivo: addNameCons.value,
            descripcion: addNameDesc.value,
            posee_pre: posee_prefijo,
            prefijo: prefij.value,
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

