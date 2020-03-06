const express = require('express');
const stringify = require('json-stringify-safe')
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');

let User = require('../models/user');
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/login', (req, res) => res.send('login'));
router.get('/registration', (req, res) => res.send('registration'));


// router.get('/dashboard/category' , function(req,res){
//     categories.find({parent_id} , function(err , docs){
//       if(err) res.json(err);
//       else res.render('category',{categories:docs})
//     });
//   });


router.post('/registration', function(req,res){
    res.send(req.body.firstname);
    // const secondname = req.body.secondname;
    // const email = req.body.email;
    // const password = req.body.password;
    // const password2 = req.body.password2;

    // req.checkBody('firstname', 'First Name is require').notEmpty();
    // req.checkBody('secondname', 'Second Name is require').notEmpty();
    // req.checkBody('email', 'Email is require').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'Password is require').notEmpty();
    // req.checkBody('passwor2', 'Password is not match').equals(req.body.password);

    // let errors = req.validationErrors();

    // if(errors){
    //   res.render('/regitration',{
    //       errors:errors
    //   });
    // }else{

    //     let newuser = new user({
    //         firstname:firstname,
    //         secondname:secondname,
    //         email:email,
    //         password:password

    //     });
    //     bcrypt.genSalt(10, function(){
    //         bcrypt.hash(newuser.password, salt, function(err, hash){
    //             if(error){
    //                 console.log(error);
    //             }
    //             newuser.password = hash;
    //             newuser.save(function(err){
    //                 if(error){
    //                     console.log(err);
    //                     return;

    //                 }else{
    //                     req.flash('sucess', 'you are register and you can login ');
    //                     req.redirect('/login');
    //                 }

    //             }
    //             );

    //         });
 //       });
   // }

    


})


module.exports = router;