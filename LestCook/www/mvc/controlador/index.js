$('#btSalir').click(salir);
function salir(){
    navigator.app.exitApp();
}


$('#svgs-EditarPerfil').click(svgsEditarPerfil);
function svgsEditarPerfil(){
    window.location.href = '../vista/perfil.html'; 
}

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