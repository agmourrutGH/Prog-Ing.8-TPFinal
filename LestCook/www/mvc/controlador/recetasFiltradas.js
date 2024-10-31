// $(document).ready(function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const categoria = urlParams.get('categoria')?.toLowerCase(); // Convertir a minúsculas

//     fetch('https://lets-cooking-backend-g4mo.vercel.app/api/recipes')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al obtener recetas');
//             }
//             return response.json();
//         })
//         .then(recipes => {
//             // Filtrar ignorando mayúsculas y minúsculas
//             const recetasFiltradas = recipes.filter(receta => 
//                 receta.categorias.toLowerCase() === categoria
//             );
//             mostrarRecetasFiltradas(recetasFiltradas);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Ocurrió un error al obtener las recetas.');
//         });

//     function mostrarRecetasFiltradas(recipes) {
//         const recetasContainer = $('#recetasContainer');
//         recetasContainer.empty();

//         recipes.forEach(recipe => {
//             const recipeHtml = `
//                 <div class="receta">
//                     <img src="${recipe.foto_receta}" alt="${recipe.nombre_receta}">
//                     <h3>${recipe.nombre_receta}</h3>
//                     <p>${recipe.descripcion}</p>
//                 </div>
//             `;
//             recetasContainer.append(recipeHtml);
//         });
//     }
// });

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria')?.toLowerCase();

    // Obtener recetas
    fetch('https://lets-cooking-backend-g4mo.vercel.app/api/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener recetas');
            }
            return response.json();
        })
        .then(recipes => {
            // Filtrar ignorando mayúsculas y minúsculas
            const recetasFiltradas = recipes.filter(receta => 
                receta.categorias.toLowerCase() === categoria
            );

            // Obtener los nombres de los usuarios
            return fetch('https://lets-cooking-backend-g4mo.vercel.app/api/users/users') // Obtener la lista de usuarios
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener usuarios');
                    }
                    return response.json(); // Devolver la lista de usuarios
                }).then(users => {
                    // Combinar recetas con nombres de usuarios
                    const recetasConUsuarios = recetasFiltradas.map(recipe => {
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
            mostrarRecetasFiltradas(recetasConUsuarios);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al obtener las recetas.');
        });

    function mostrarRecetasFiltradas(recipes) {
        const recetasContainer = $('#recipesContainer');
        recetasContainer.empty();

        recipes.forEach(recipe => {
            const recipeHtml = `
            <div class="recetasContenedor">
                <img class="imagenBack" src="../imagenes/recetasback.jpg" alt="">
                <h2>${recipe.nombre_receta}</h2>
                <p><strong>Categoría:</strong> ${recipe.categorias}</p>
                <p class="usuarioReceta"><strong>Usuario:</strong> ${recipe.userName}</p> <!-- Agregar el nombre de usuario -->
            </div>
            `;
            recetasContainer.append(recipeHtml);
        });
    }
});

$(document).ready(function () {
    $('.backButton').on('click', function () {
        window.location.href = 'index.html'; // Cambia a la ruta correcta si es necesario
    });
});