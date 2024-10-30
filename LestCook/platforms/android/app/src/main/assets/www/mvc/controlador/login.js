$(document).ready(function() {
    // Credenciales simuladas
    const validUsername = "admin";
    const validPassword = "1234";
  
    // Manejo del clic en el botón de login
    $("#btLogin").on("click", function() {
      // Obtener los valores de usuario y contraseña
      const username = $("#inUsuario").val();
      const password = $("#inContrasena").val();
  
      // Verificar las credenciales
      if (username === validUsername && password === validPassword) {
        // Si las credenciales son correctas, redirigir a index.html
        window.location.href = "index.html";
      } else {
        // Si son incorrectas, mostrar un mensaje de error (puedes personalizarlo)
        alert("Usuario o contraseña incorrectos");
      }
    });
  
    // Manejo del clic en el botón "Salir"
    $("#btExit").on("click", function() {
      // Aquí puedes agregar la lógica para salir de la aplicación si es necesario
      alert("Saliendo...");
      // Por ejemplo, podrías redirigir a otra página o cerrar la app.
    });
  
    // Manejo del clic en el botón "Registrarse"
    $("#btRegister").on("click", function() {
      // Aquí puedes agregar la lógica para redirigir a la página de registro si la tienes.
      window.location.href = "register.html"; // Cambia esto a la ruta correcta
    });
  });