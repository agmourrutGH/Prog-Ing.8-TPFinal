$('#btExit').click(btExit);
function btExit(){
    navigator.app.exitApp();
}

$('#btLogin').click(btLogin);
function btLogin(){
    var inUsuario = $('#inUsuario');
    var usuario = inUsuario.val().trim();
    inUsuario.val(usuario);

    var inContrasena = $('inContrasena');
    var contrasena = inContrasena.val().trim();
    inContrasena.val(contrasena);
}

$('#btRegister').click(btRegister); 
function btRegister() {
    window.location.href = '../vista/register.html'; 
}
