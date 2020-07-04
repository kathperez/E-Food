
window.onload = function () {
    const reposBtn = document.getElementById("crear");
    reposBtn.onclick = addItem;
};

const uri = "https://localhost:44308/api/LineaComida";

function addItem() {
    event.preventDefault();
    console.log("dentro de agregar")
    var verificar = true;
    let addNameDesc = document.getElementById('descripcion'); 
    let user = 'karla';  

   if (!addNameDesc.value) {
       console.log('Espacio de descripción requerido');

       addNameDesc.focus();
        verificar = false;
    }
    if (verificar) {
        const item = {            
            descripcion: addNameDesc.value,         
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

