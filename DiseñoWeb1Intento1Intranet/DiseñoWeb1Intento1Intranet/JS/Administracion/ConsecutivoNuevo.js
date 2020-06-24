
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
        console.log('Espacio de consecutivo requerido');
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
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.error('Unable to add item.', error));
    }
}


//const reposBtn = document.getElementById("search-btn");
//reposBtn.onclick = addItem;


















//const uri = "https://localhost:44308/Api/Consecutivo";

//function addItem() {
//    const addNameTextbox = document.getElementById('descripcion');
//    const addNameConsecutivo = document.getElementById('consecutivo');
//    var posee_prefijo;
//    var estadoPref = () => {
//        if (document.getElementById('posee').checked) {
//            posee_prefijo = "V";
//            console.log("Prefijo: " + posee_prefijo);

//        } else {
//            posee_prefijo = "F";

//            console.log("Prefijo: " + posee_prefijo);
//            $("#pref").disabled;
//        }
//    }
//    estadoPref();
//    console.log("consecutivo= " + addNameTextbox.value);
//    console.log("descripcion " + addNameConsecutivo.value);
//    $('#posee').change(function () {
//        estadoPref();
//    });
//    console.log(posee_prefijo);

//    const item = {
//        consecutivo: addNameConsecutivo.value.trim(),
//        descripcion: addNameTextbox.value.trim(),
//        posee_pre: posee_prefijo,
//        prefijo: document.getElementById('pref').value,
//        usuario: 'karla'       
//    };

//    fetch(uri, {
//        method: 'POST', // or 'PUT'
//        headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(item),
//    })
//        .then(response => response.json())
//        .then(data => {
//            console.log('Success:', data);
//        })
//        .catch((error) => {
//            console.error('Error:', error);
//        });
//}


//const reposbtn = document.getElementById("search-btn");
//reposbtn.onclick = addItem;


/*OLD WAY */

/*
 window.onload = function () {
    const reposBtn = document.getElementById("search-btn");
    reposBtn.onclick = insertarConsecutivo;
};

//function eventClick() {
//    const username = document.getElementById("username").value;
//    const userGet = "https://localhost:44308/Api/Consecutivo";
//    // list(userGet).catch((e) => console.error(e));
//    insertarConsecutivo();
//}

var insertarConsecutivo = () => {
    console.log("dentro de insertar");
    var verificar = true;
    var v_codconse = document.getElementById("consecutivo").value;
    var v_desc = document.getElementById("descripcion").value;

    document.getElementById("pref").disabled;
    var posee_prefijo;
    var estadoPref = () => {
        if (document.getElementById('posee').checked) {
            posee_prefijo = "V";
            console.log("Prefijo: " + posee_prefijo);

        } else {
            posee_prefijo = "F";

            console.log("Prefijo: " + posee_prefijo);
            $("#pref").disabled;
        }
    }
    estadoPref();
    console.log("consecutivo= " + v_codconse);
    console.log("descripcion " + v_desc);
    $('#posee').change(function () {
        estadoPref();
    });
    console.log(posee_prefijo);

    if (!v_codconse) {
        alert('El campo consecutivo es requerido');
        // v_codconse.focus();
        verficar = false;

    } else if (isNaN(v_codconse)) {
        alert('El campo  consecutivo solo acepta números');
        // v_codconse.focus();
        verficar = false;
    } else if (v_desc == "false") {
        alert('El campo descripción es requerido');
        //  v_desc.focus();
        verficar = false;

    }
    else if (verificar) {

        estadoPref();
        var url = 'https://localhost:44308/Api/Consecutivo';
        var data = {
            consecutivo: v_codconse,
            descripcion: v_desc,
            posee_pre: "" + posee_prefijo,
            prefijo: document.getElementById('pref').value,
            usuario: 'karla'
        };
        fetch(url, {
            method: 'POST', // or 'PUT',
            //mode: 'no-cors',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => console.log('prueba'))
            .then((response) => {
                console.log(response);;
            })
            .catch(error => console.error('Unable to add item.', error));
    };
    console.log('Fuera del fetch');
}
 * /
/*const reposBtn = document.getElementById("search-btn");
reposBtn.onclick = insertarConsecutivo;*/
 



/*
 * const uri = 'https://localhost:44308/Api/Consecutivo';

function addItem() {
    const addNameTextbox = document.getElementById('descripcion');
    const addNameConsecutivo = document.getElementById('consecutivo');

    const item = {
        consecutivo: addNameConsecutivo.value.trim(),
        descripcion: addNameTextbox.value.trim(),
        posee_pre: 'F',
        usuario: 'karla'
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
        })
        .catch(error => console.error('Unable to add item.', error));
}


const reposbtn = document.getelementbyid("search-btn");
reposbtn.onclick = insertarconsecutivo;

 
 */