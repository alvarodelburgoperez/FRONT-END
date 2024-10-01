const express = require('express');
const router = express.Router();

// Página de juegos
router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;