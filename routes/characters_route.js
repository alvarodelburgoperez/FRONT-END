const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Rutas para manejar los personajes
router.get('/characters', characterController.index2); // Ver todos los personajes
router.get('/characters/new', characterController.create); // Mostrar el formulario para crear personajes
router.post('/characters', characterController.store); // Guardar un nuevo personaje
router.get('/characters/:id/edit', characterController.edit); // Mostrar el formulario para editar un personaje
router.post('/characters/:id/update', characterController.update); // Actualizar un personaje existente
router.post('/characters/:id/delete', characterController.delete); // Eliminar un personaje

module.exports = router;
