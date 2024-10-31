let db;

// Inicializa la base de datos
export const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
        document.addEventListener("deviceready", function() {
            db = window.sqlitePlugin.openDatabase({ name: 'myDatabase.db', location: 'default' });

            db.transaction(function(tx) {
                // Crear tabla de usuarios
                tx.executeSql(`CREATE TABLE IF NOT EXISTS usuario (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    email TEXT,
                    foto_perfil TEXT
                )`);

                // Crear tabla de recetas
                tx.executeSql(`CREATE TABLE IF NOT EXISTS recetas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    descripcion TEXT,
                    categoria TEXT,
                    usuario_id INTEGER,
                    FOREIGN KEY(usuario_id) REFERENCES usuario(id)
                )`);

                // Insertar datos de ejemplo
                tx.executeSql('INSERT INTO usuario (nombre, email, foto_perfil) VALUES (?, ?, ?)', ['Ana Gomez', 'ana@example.com', 'mvc/imagenes/default.jpg']);
                tx.executeSql('INSERT INTO usuario (nombre, email, foto_perfil) VALUES (?, ?, ?)', ['Carlos Ruiz', 'carlos@example.com', 'mvc/imagenes/default.jpg']);
                
                tx.executeSql('INSERT INTO recetas (nombre, descripcion, categoria, usuario_id) VALUES (?, ?, ?, ?)', ['Tarta de frutilla', 'Postre con fresas', 'Ensaladas', 1]);
                tx.executeSql('INSERT INTO recetas (nombre, descripcion, categoria, usuario_id) VALUES (?, ?, ?, ?)', ['Pizza de champiñones', 'Pizza vegetariana', 'Carbohidratos', 2]);
                tx.executeSql('INSERT INTO recetas (nombre, descripcion, categoria, usuario_id) VALUES (?, ?, ?, ?)', ['Bife a la parrilla', 'Carne a la parrilla', 'Carnes', 1]);

            }, function(error) {
                console.error("Error al crear tablas o insertar datos iniciales: " + error.message);
                reject(error);
            }, function() {
                console.log("Base de datos y tablas creadas con datos iniciales.");
                resolve(db);
            });
        });
    });
};

// Exportar la función para obtener la instancia de la base de datos
export const getDatabase = () => db;
