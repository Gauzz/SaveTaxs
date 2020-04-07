const express = require('express');
const router = express.Router();

router.get('/ngo', (req, res) => res.send('ngo'));
module.exports = router;
    