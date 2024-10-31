$(document).ready(function () {
    // Función para obtener parámetros de la URL
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Obtener el ID del usuario de la URL
    const userId = getParameterByName('id');

    if (userId) {
        // Establecer dinámicamente el href del enlace "Editar Perfil"
        $('#edit-perfil').attr('href', `./editar-perfil.html?id=${userId}`);

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
                $('#nombreUsuario').text(data.nombre); // Cambia esto según la estructura de tu respuesta
                $('#emailUsuario').text(data.correo); // Usa 'correo' en lugar de 'email'
                
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al cargar el perfil.');
            });
    } else {
        alert('ID de usuario no encontrado.');
        // Aquí puedes redirigir a login.html o manejar como desees
    }
});

$(document).ready(function () {
    $('.backButton').on('click', function () {
        window.location.href = 'index.html'; // Cambia a la ruta correcta si es necesario
    });
});