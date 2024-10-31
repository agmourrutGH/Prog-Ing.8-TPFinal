$(document).ready(function() {
    // Función para obtener el ID del usuario desde la URL
    function getUserIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Obtiene el valor del parámetro 'id'
    }

    const userId = getUserIdFromUrl(); // Almacena el ID obtenido

    // Evento para el formulario de actualización
    $('#updateForm').submit(function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        // Recoger los valores de los campos del formulario
        const nombre = $('#inNombre').val();
        const correo = $('#inCorreo').val();

        // Validación simple
        if (!nombre || !correo) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Hacer la solicitud PUT para actualizar el usuario
        $.ajax({
            url: `https://lets-cooking-backend-g4mo.vercel.app/api/users/users/${userId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, correo }),
            success: function(response) {
                alert("Perfil actualizado exitosamente.");
                // Redirigir a perfil.html si es necesario
                window.location.href = `perfil.html?id=${userId}`; 
            },
            error: function(xhr) {
                // Manejo del error
                const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "Error al actualizar el perfil";
                alert("Error: " + errorMessage);
            }
        });
    });

    // Evento para el botón de volver
    $('.backButton').click(function(event) {
        event.preventDefault();
        window.location.href = `perfil.html?id=${userId}`; 
    });
});
