(function () {
    usuarios = [];
    var mostrarUsuarios = () => {
        fetch('https://localhost:44308/Api/Usuario')
            .then(res => res.json())
            .then(data => {
                const json_data = JSON.parse(data);
                usuarios = json_data;
                console.log("dentro de mostrar");
                localStorage.setItem('users', JSON.stringify(usuarios));
                
               // ingresar(json_data);              
                console.log(json_data);
            })
            .catch(err => console.log('error', err))
    }
    var ingresar = () => {   
        console.log("dentro de ingresar");
        console.log(usuarios);
        var permiso = false;
        for (cont = 0; cont < usuarios.length; cont++) {
            if (usuarios[cont].usuario == $('#usuario').val()) {
                if (usuarios[cont].password == $('#pass').val()) {
                    permiso = true
                    localStorage.setItem('user', usuarios[cont].usuario);//Indice por editar                  
                    break;
                }
            }
        }
        if (permiso) {
            var url = $("#RedirectTo").val();
            location.href = url;
         //   window.close();
        } else {
            $('#resultado').text('Usuario o contraseña incorrecto');
        }

    }

    //function abrir(url) {
    //    var a = document.createElement("a");
    //    a.target = "_blank";
    //    a.href = url;
    //    a.click();
    //}

    var init = () => {
        mostrarUsuarios();
        var btnIngresar = document.getElementById('login');
        btnIngresar.onclick = ingresar;
    }

    init();

})()