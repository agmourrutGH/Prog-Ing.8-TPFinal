// Función para obtener recetas
function fetchRecipes() {
    fetch('https://lets-cooking-backend-g4mo.vercel.app/api/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(recipes => {
            // Obtener la lista de usuarios
            return fetch('https://lets-cooking-backend-g4mo.vercel.app/api/users/users') // Obtener la lista de usuarios
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener usuarios');
                    }
                    return response.json(); // Devolver la lista de usuarios
                })
                .then(users => {
                    // Combinar recetas con nombres de usuarios
                    const recetasConUsuarios = recipes.map(recipe => {
                        const user = users.find(user => user.id === recipe.id_usuario); // Suponiendo que el campo ID del usuario es `id`
                        return {
                            ...recipe,
                            userName: user ? user.nombre : 'Desconocido' // Usa 'Desconocido' si no se encuentra el usuario
                        };
                    });
                    return recetasConUsuarios;
                });
        })
        .then(recetasConUsuarios => {
            displayRecipes(recetasConUsuarios);
        })
        .catch(error => {
            console.error('Error en la solicitud Fetch:', error);
        });
}

// Función para mostrar las recetas en el HTML
function displayRecipes(recipes) {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = ''; // Limpiar el contenedor antes de mostrar recetas

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recetasContenedor';
        
        recipeDiv.innerHTML = `
        
            <img class="imagenBack" src="../imagenes/recetasback.jpg" alt="">
            <h2>${recipe.nombre_receta}</h2>
            <p><strong>Categoría:</strong> ${recipe.categorias}</p>
            <p class="usuarioReceta"><strong>Usuario:</strong> ${recipe.userName}</p> <!-- Agregar el nombre de usuario -->
        
        `;
        container.appendChild(recipeDiv);
    });
}

// Llama a la función cuando el dispositivo esté listo
document.addEventListener('deviceready', fetchRecipes);



$(document).ready(function () {
    $('.backButton').on('click', function () {
        window.location.href = 'index.html'; // Cambia a la ruta correcta si es necesario
    });
});
{/* <img src="${recipe.foto_receta}" alt="${recipe.nombre_receta}" style="width: 200px;"></img>  SE PODRIA IMPLEMENTAR EN EL FETCH
EN CASO DE QUE FUNCIONEN LAS IMAGENES*/}