const express = require('express');
const router = express.Router();

//welcome page


router.get('/', (req, res) => res.render('index.hbs',
 { title: "SaveTaxs" 
}));

router.get('/dashboard', (req, res) => res.render('index.hbs',
 { title: "SaveTaxs" ,name: req.user.firstname + "_"+ req.user.secondname
}));
module.exports = router;