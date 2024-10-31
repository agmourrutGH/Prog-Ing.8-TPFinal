$('#btSalir').click(salir);
function salir(){
    navigator.app.exitApp();
}


$(document).ready(function () {
  $('#svgs-EditarPerfil').on('click', function () {
      const userId = sessionStorage.getItem('userId'); // Obtiene el ID del usuario de sessionStorage

      if (userId) {
          // Redirige a perfil.html con el ID del usuario
          window.location.href = `perfil.html?id=${userId}`;
      } else {
          alert('No has iniciado sesión.');
          // Aquí puedes redirigir al usuario a la página de inicio de sesión si lo deseas
      }
  });
});



document.addEventListener("DOMContentLoaded", function() {
    const categoryElements = document.querySelectorAll(".secciones");
  
    categoryElements.forEach((element) => {
      element.addEventListener("click", function() {
        const category = this.getAttribute("data-category");
  
        // Redirecciona a recetas.html y pasa la categoría como parámetro en la URL
        window.location.href = `recetas.html?category=${category}`;
      });
    });
  });

  // index.js

// Espera a que el documento esté listo
$(document).ready(function () {
  // Añade un manejador de eventos de clic al div 'recetasDiv'
  $('.recetasDiv').on('click', function () {
    // Aquí puedes definir lo que quieres que suceda al hacer clic
    // Por ejemplo, redirigir a una página de recetas:
    window.location.href = './recetas.html';
    
    // O si deseas mostrar un mensaje, puedes hacer lo siguiente:
    // alert('¡Haz hecho clic en recetas!');
  });
});

$(document).ready(function () {
  $('.secciones').on('click', function () {
      const categoria = $(this).data('category');
      window.location.href = `recetasFiltradas.html?categoria=${encodeURIComponent(categoria)}`;
  });
});
