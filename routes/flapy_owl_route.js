const express = require('express');
const router = express.Router();

// Página de juegos
router.get('/flapy_owl', (req, res) => {
    res.render('flapy_owl');
});

module.exports = router;