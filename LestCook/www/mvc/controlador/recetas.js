import { initializeDatabase, getDatabase } from '../modelo/database.js';

// Objeto para manejar el estado de las categorías cargadas
const categoriasCargadas = {};

// Inicializa la base de datos
document.addEventListener("deviceready", () => {
    initializeDatabase().then(() => {
        console.log('Base de datos inicializada y lista para usar.');

        // Agrega los event listeners a los divs de categorías
        const secciones = document.querySelectorAll('.secciones');
        secciones.forEach(seccion => {
            seccion.addEventListener('click', function() {
                const categoria = this.getAttribute('data-category');
                cargarRecetas(categoria);
            });
        });
    }).catch(error => {
        console.error('Error al inicializar la base de datos: ', error);
    });
});

// Función para cargar recetas de una categoría
export function cargarRecetas(categoria) {
    const db = getDatabase();

    // Verifica si la categoría ya ha sido cargada
    if (categoriasCargadas[categoria]) {
        console.log(`Las recetas de ${categoria} ya han sido cargadas.`);
        return; // Si ya se cargaron, no hacemos nada
    }

    console.log(`Cargando recetas de la categoría: ${categoria}`);

    // Aquí iría tu lógica para acceder a la base de datos y cargar las recetas
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM recetas WHERE categoria = ?', [categoria], function(tx, results) {
            const recetas = results.rows;
            mostrarRecetas(recetas);
            // Marcar la categoría como cargada
            categoriasCargadas[categoria] = true;
        }, function(tx, error) {
            console.log('Error al ejecutar la consulta: ', error);
        });
    });
}

// Función para mostrar las recetas en la UI
function mostrarRecetas(recetas) {
    const contenedor = document.getElementById('contenedor-recetas');
    contenedor.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas recetas

    if (recetas.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.innerText = 'No hay recetas para mostrar en esta categoría.';
        contenedor.appendChild(mensaje);
        return; // No hay recetas para mostrar
    }

    for (let i = 0; i < recetas.length; i++) {
        const receta = recetas.item(i); // Cambié 'recetas[i]' por 'recetas.item(i)'
        const divReceta = document.createElement('div');
        divReceta.innerText = receta.nombre; // Ajusta esto según tu estructura de datos
        contenedor.appendChild(divReceta);
    }
}
