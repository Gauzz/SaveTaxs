const express = require('express');
const router = express.Router();

//welcome page

router.get('/',  (req, res) =>{
    if (req.isAuthenticated()){
        return res.render('index.hbs', {name: req.user.firstname + "_"+ req.user.secondname});
    }
    else{
        return res.render('index.hbs');
    }

});


router.get('/dashboard', (req, res) => res.render('index.hbs',
 { title: "SaveTaxs" ,name: req.user.firstname + "_"+ req.user.secondname
}));



   
module.exports = router;