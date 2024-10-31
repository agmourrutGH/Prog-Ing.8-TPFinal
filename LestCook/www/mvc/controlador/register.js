// Asegúrate de que jQuery esté disponible
$(document).ready(function() {
    // Evento para el botón de registrarse
    $('#btRegister').click(function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón

        // Recoger los valores de los campos del formulario
        const nombre = $('#inNombre').val(); // Cambié el id a inNombre
        const correo = $('#inEmail').val(); // Cambié el id a inEmail
        const contrasena = $('#inContrasena').val();

        // Validación simple
        if (!nombre || !correo || !contrasena) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Aquí llamamos a la función para registrar el usuario en la API
        registrarUsuario(nombre, correo, contrasena);
    });

    // Función para registrar al usuario en la API
    function registrarUsuario(nombre, correo, contrasena) {
        // Crear el objeto con los datos del usuario
        const userData = {
            nombre: nombre,
            correo: correo, // Asegúrate de que el campo se llame 'correo' en la API
            contrasena: contrasena
        };

        // Hacer la solicitud POST a la API
        fetch('https://lets-cooking-backend-g4mo.vercel.app/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData), // Convertir el objeto a JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Registro exitoso
            alert("Usuario registrado exitosamente.");
            // Redirigir al login
            window.location.href = "login.html"; // Cambia esto si la ruta es diferente
        })
        .catch(error => {
            // Manejo de errores
            alert("Error al registrar el usuario: " + error.message);
        });
    }

    // Evento para el botón de volver
    $('#btBack').click(function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
        window.location.href = "login.html"; // Cambia esto si la ruta es diferente
    });
});
