$(document).ready(function () {
    // Función para obtener parámetros de la URL
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Obtener el ID del usuario de la URL
    const userId = getParameterByName('id');

    // Log para verificar el userId
    console.log('User ID:', userId); // Asegúrate de ver el ID en la consola

    if (userId) {
        // Realizar la solicitud para obtener los datos del usuario
        fetch(`https://lets-cooking-backend-g4mo.vercel.app/api/users/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                return response.json(); // Esperar un JSON
            })
            .then(data => {
                // Asegúrate de que estás usando las propiedades correctas
                $('#nombre').val(data.nombre);
                $('#email').val(data.correo);
                $('.profile-pic').attr('src', data.foto_perfil);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al cargar el perfil.');
            });

        // Manejar el clic en el botón "Actualizar Perfil"
        $('#btnactualizarperfil').on('click', function (event) {
            // Evita el envío automático del formulario
            event.preventDefault();

            // Validación básica del formulario
            let nombre = $('#nombre').val();
            let email = $('#email').val();

            if (!nombre || !email) {
                $('#mensaje').text("Por favor, completa todos los campos.").css('color', 'red');
                return;
            }

            // Enviar el formulario usando AJAX
            let formData = new FormData($('#editarPerfilForm')[0]);

            $.ajax({
                url: `https://lets-cooking-backend-g4mo.vercel.app/api/users/users/${userId}`, // Cambia esta URL según sea necesario
                type: 'PUT',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    $('#mensaje').text('Perfil actualizado con éxito.').css('color', 'green');
                },
                error: function (xhr, status, error) {
                    $('#mensaje').text('Error al actualizar el perfil: ' + xhr.responseText).css('color', 'red');
                }
            });
        });

    } else {
        alert('ID de usuario no encontrado.');
    }
});
