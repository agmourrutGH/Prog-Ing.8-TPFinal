// Asegúrate de que jQuery esté disponible
$(document).ready(function() {
    // Evento para el botón de registrarse
    $('#btRegister').click(function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón

        // Recoger los valores de los campos del formulario
        const nombre = $('#inNombre').val(); // Cambié el id a inNombre
        const email = $('#inEmail').val(); // Cambié el id a inEmail
        const contrasena = $('#inContrasena').val();

        // Validación simple
        if (!nombre || !email || !contrasena) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Aquí llamamos a la función para registrar el usuario en la base de datos
        registrarUsuario(nombre, email, contrasena);
    });

    // Función para registrar al usuario en SQLite
    function registrarUsuario(nombre, email, contrasena) {
        // Aquí debes implementar la lógica para insertar el usuario en la base de datos SQLite
        // Asegúrate de que la base de datos esté configurada y que tengas la función para insertar
        const db = openDatabase('miBaseDeDatos', '1.0', 'Base de datos de usuarios', 2 * 1024 * 1024);
        
        db.transaction(function(tx) {
            // Crear la tabla si no existe
            tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, email TEXT, contrasena TEXT)');

            // Insertar el nuevo usuario
            tx.executeSql('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', [nombre, email, contrasena], function(tx, result) {
                // Registro exitoso
                alert("Usuario registrado exitosamente.");
                // Redirigir al index.html después del registro
                window.location.href = "index.html"; // Cambia esto si la ruta es diferente
            }, function(tx, error) {
                // Manejo de errores
                alert("Error al registrar el usuario: " + error.message);
            });
        });
    }

    // Evento para el botón de volver
    $('#btBack').click(function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        window.location.href = "login.html"; // Cambia esto si la ruta es diferente
    });
});