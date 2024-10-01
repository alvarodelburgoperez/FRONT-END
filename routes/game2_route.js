const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rutas del juego
router.get('/game2', gameController.view); // Mostrar la vista del juego con el personaje seleccionado
router.get('/game2/select', gameController.select); // Mostrar la página para seleccionar un personaje
router.post('/game2/select', gameController.chooseCharacter); // Manejar la selección de personaje
router.put('/game2/update', gameController.updateEnergy); // Actualizar el nivel de energía del personaje
module.exports = router;
