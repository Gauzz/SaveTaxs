const express = require('express');
const stringify = require('json-stringify-safe')
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');
var bodyParser = require('body-parser');
const crypto = require("crypto");





let User  = require('../models/user');
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(router);

<<<<<<< HEAD
router.get('/login', (_req, res) =>{
 res.render('login.hbs');
  });

router.get('/registration', (_req, res) => {
res.render('registration.hbs');
 });
=======
router.get('/', function(req, res){
    console.log(req.user);
    console.log(req.isAuthenticated())
    res.render('index.hbs');
});



router.get('/login', (_req, res) => res.render('login.hbs'));
>>>>>>> aad54b3cc811a2702be3578561d877747bd7d0aa



router.post('/registration', (req, res)  =>{
    const{firstname, secondname, email, password, password2 } = req.body;
    let errors = [];
     
    //check require field
    if (!firstname || !secondname || !email  || !password || !password2){
        errors.push({msg: 'fill in all field'});

    }
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }

<<<<<<< HEAD
     // if (password.length < 6) {
      //  errors.push({ msg: 'Password must be at least 6 characters' });
      //}

=======
     
>>>>>>> aad54b3cc811a2702be3578561d877747bd7d0aa
    if(errors.length>0){
        res.render('registration.hbs', {
            errors,
            firstname,
            secondname,
            email,
            password,
            password2

        });

    }
    //validation passed
    else{
    User.findOne({email:email})
    .then(user =>{
    if(user){
        //user exists
        errors.push({ msg: 'user exist'});
        res.render('registration.hbs', {
            errors,
            firstname,
            secondname,
            email,
            password,
            password2

        });
    }else{
        const newUser = new User({
            firstname,
        secondname,
        email,
        password,
        password2

        });
    

//hash password
bcrypt.genSalt(10, (_err, salt) => 
bcrypt.hash(newUser.password, salt, (err, hash ) => {
if(err) throw err;
//set pass hash
newUser.password = hash;
//save user
newUser.save()
.then(_user => {
    req.flash('sucess', 'you are now register ');
    res.redirect('/user/login');
})
.catch(err => console.log(err));

}))
    }
} );

    }

});
    




//login
router.post('/login',  (req, res, next)=>{
    passport.authenticate('local',{
<<<<<<< HEAD
        successRedirect: '/userprofile',
=======
        successRedirect: '/',
>>>>>>> aad54b3cc811a2702be3578561d877747bd7d0aa
        failureRedirect:'/user/login',
        failureFlash: 'wrong user or password'
    })(req, res, next);
});



module.exports = router;
