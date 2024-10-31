$(document).ready(function () {
    $('#btLogin').on('click', function (e) {
        e.preventDefault(); // Evitar el comportamiento por defecto del botón

        // Obtener los valores ingresados
        const usuario = $('#inUsuario').val().trim();
        const contrasena = $('#inContrasena').val().trim();

        // Validar que los campos no estén vacíos
        if (!usuario || !contrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Realizar la solicitud de inicio de sesión
        fetch('https://lets-cooking-backend-g4mo.vercel.app/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo: usuario, contrasena })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            return response.json(); // Aquí se espera un JSON
        })
        .then(data => {
            // Aquí puedes manejar la respuesta exitosa
            if (data.message === 'Inicio de sesión exitoso') {
                alert('Inicio de sesión exitoso!');

                // Almacena el ID del usuario en sessionStorage
                const userId = data.user.id; // Accede al ID desde el objeto user
                sessionStorage.setItem('userId', userId); // Almacena en sessionStorage

                // Redirigir a index.html
                window.location.href = 'index.html'; // Redirigir a index.html
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al iniciar sesión.');
        });
    });

    // Lógica para el botón de salir
    $('#btExit').on('click', function () {
        navigator.app.exitApp();
        // Aquí puedes manejar la lógica de salir, como cerrar sesión o redirigir
    });
    
    $(document).ready(function () {
        console.log("Documento listo"); // Confirma que el documento está completamente cargado.
    
        $('#btRegister').on('click', function () {
            console.log("Botón 'Registrarse' fue presionado"); // Verifica que el evento 'click' se active.
            
            // Intenta redirigir a register.html
            window.location.href = 'register.html';
            console.log("Intentando redirigir a register.html");
        });
    });
});

