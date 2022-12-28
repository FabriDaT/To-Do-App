
const form = document.forms[0];
let errores = [];
/* ---------------------------------- texto --------------------------------- */
function validarDatos(usuario){
    
    usuario.firstName.trim();
    usuario.lastName.trim();
    if (usuario.firstName.length < 3) {
        errores.push("El nombre debe tener al menos 3 caracteres.");
      }
      if (usuario.lastName.length < 3) {
        errores.push("El apellido debe tener al menos 3 caracteres.");
      }
    
/* ---------------------------------- email --------------------------------- */
    usuario.email.trim()
    if(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(usuario.email)){
        errores.push('No es un email valido')
    }
    
/* -------------------------------- password -------------------------------- */

    if(usuario.password.trim().length < 6 || usuario.password===null || usuario.password=== undefined || usuario.password===""){
        errores.push("Algo esta mal en su contraseña, recuerde que debe tener mas de 6 caracteres.")
    }

   if(usuario.password !== document.querySelector('#inputPasswordRepetida').value){
        errores.push('Las contraseñas no coinciden, reviselas nuevamente')
   }
   return errores;
}

            /*  RENDERIZADO DE ERRORES  */
function renderizarErrores(errores){
    const divErrores = document.getElementById("errores");

    if (divErrores) {
    divErrores.remove();
    }

    if (errores.length > 0) {
    const divTemplate = document.createElement("div");
    divTemplate.setAttribute("id", "errores"); // 1er parametro es el tipo de atributo, el 2do es el valor que tendra
    divTemplate.style =
        "background:rgba(255, 0, 0, 0.2);padding:.5em 1em;color: red;margin: .5em 0;";
    errores.forEach((error) => {
        divTemplate.innerHTML += `<p><small>${error}</small></p>`;
       
    });
    form.appendChild(divTemplate); 
    
    }
}

