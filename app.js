const express = require('express');
const app = express();
const path = require('path');
const characterController = require('./controllers/characterController');
const gameController = require('./controllers/gameController'); 

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const indexRoute = require('./routes/index_route');
const gamesRoute = require('./routes/games_route');
const contactRoute = require('./routes/contact_route');
const flapyRoute = require('./routes/flapy_owl_route');
const game2Route = require('./routes/game2_route');  // Ruta del juego
const charactersRoute = require('./routes/characters_route');  // Ruta de personajes

app.use(indexRoute);
app.use(gamesRoute);
app.use(contactRoute);
app.use(flapyRoute);
app.use(game2Route);  // Rutas del juego
app.use(charactersRoute);  // Rutas para los personajes

// Configurar puerto
app.listen(9000, () => {
    console.log('Servidor corriendo en el puerto http://localhost:9000');
});
