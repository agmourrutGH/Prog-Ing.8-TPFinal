$('#btExit').click(salir);
function salir(){
    navigator.app.exitApp();
}

$('#btLogin').click(login);
function login(){
    var inUsuario = $('#inUsuario');
    var usuario = inUsuario.val().trim();
    inUsuario.val(usuario);

    var inContrasena = $('inContrasena');
    var contrasena = inContrasena.val().trim();
    inContrasena.val(contrasena);
}