const express = require('express');
const router = express.Router();

//welcome page
router.get('/', (req, res) => res.send('welcome'));


module.exports = router;