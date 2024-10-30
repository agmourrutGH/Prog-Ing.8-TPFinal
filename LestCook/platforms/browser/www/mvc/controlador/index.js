$('#btSalir').click(salir);
function salir(){
    navigator.app.exitApp();
}


$('#svgs-EditarPerfil').click(svgsEditarPerfil);
function svgsEditarPerfil(){
    window.location.href = '../vista/perfil.html'; 
}