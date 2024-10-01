const express = require('express');
const router = express.Router();

// Página de juegos
router.get('/games', (req, res) => {
    res.render('games');
});

module.exports = router;