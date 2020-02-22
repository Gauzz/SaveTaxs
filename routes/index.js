const express = require('express');
const router = express.Router();

//welcome page
router.get('/', (req, res) => res.render('index.html'));


module.exports = router;