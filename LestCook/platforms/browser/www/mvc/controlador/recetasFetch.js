async function loadRecipes() {
    try {
        const response = await fetch('http://localhost:5000/api/recipes'); // Cambia localhost por tu dominio en producción
        if (!response.ok) {
            throw new Error('Error al cargar las recetas');
        }
        const recipes = await response.json();
        console.log(recipes); // Aquí puedes ver la respuesta

        // Aquí podrías llamar a otra función para mostrar las recetas en el frontend
        displayRecipes(recipes);
    } catch (error) {
        console.error(error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container'); // Asegúrate de tener un contenedor en tu HTML

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h2>${recipe.nombre_receta}</h2>
            <img src="${recipe.foto_receta}" alt="${recipe.nombre_receta}" />
            <p>${recipe.descripcion}</p>
            <p>Categoría: ${recipe.categorias}</p>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

// Llama a loadRecipes cuando se cargue el documento
document.addEventListener('DOMContentLoaded', loadRecipes);