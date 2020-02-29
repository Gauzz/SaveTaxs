const express = require('express');
const router = express.Router();

//welcome page


router.get('/', (req, res) => res.render('index.hbs',
 { title: "SaveTaxs" 
}));
module.exports = router;