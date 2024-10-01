const express = require('express');
const router = express.Router();

// Página de juegos
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;