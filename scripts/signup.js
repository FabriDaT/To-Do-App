window.addEventListener('load', function () {
   
    /* ---------------------- variables globales ---------------------- */
    const form = document.forms[0];
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const url = 'http://todo-api.ctd.academy:3000/v1/users';

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // cuerpo de la request
        const payload = {
            firstName: nombre.value,
            lastName: apellido.value, 
            email: email.value,
            password: password.value
        };
        //configuracion la request del Fetch
        const settings = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        let validaciones = validarDatos(payload);
        renderizarErrores(validaciones);
        
        //lanzamos la consulta de login a la API
        realizarRegister(settings);

        //limpio los campos del formulario
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        console.log("Lanzando la consulta a la API");
        fetch(url, settings)
            .then(response => {
                console.log(response);

                if (response.ok != true) {
                    console.log("Alguno de los datos es incorrecto.")
                }

                return response.json();

            })
            .then(data => {
                console.log("Promesa cumplida:");
                console.log(data);

                if (data.jwt) {
                    //guardo en LocalStorage el objeto con el token
                    localStorage.setItem('jwt', JSON.stringify(data.jwt));

                    //redireccionamos a la página
                    location.replace('./mis-tareas.html');
                }
                
            })
            .catch(err => {
                console.log("Promesa rechazada:");
                console.log(err);
            })
    };


});