const express = require('express');
const router = express.Router();

//welcome page

router.get('/',  (req, res) =>{
    if (req.isAuthenticated()){
        return res.render('index.hbs', {name: req.user.firstname + "_"+ req.user.secondname});
    }
    else{
        return res.render('index.hbs', {title:"Savetaxs"});
    }

});


router.get('/dashboard', (req, res) => res.render('index.hbs',
 { title: "SaveTaxs"
}));



// Logout
router.get('/logout',(req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });

   
module.exports = router;