const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
const passport = require('passport');
const crypto = require("crypto");
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const stringify = require('json-stringify-safe')


let User  = require('../models/userprofile');
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(router);


router.get('/', (req, res, next) => {
    if (!req.isAuthenticated()){
    res.redirect('user/login');
}
 const userprofiles = req.app.locals.userprofiles;
 const _id = ObjectID(req.session.passport.user);

 userprofiles.findOne({ _id }, (err, results) => {
 if (err) {

     throw err;
 }
 console.log('error');
 res.render('./dashboard/customer/customerpage.hbs', { ...results});
 });
});


router.get('/:email', (req, res) =>{
const userprofiles = req.app.locals.userprofiles;
const email = req.params.email;

 users.findOne({ email:email })
.then(user => { 
    if(!user){ 
        return done(null, false, { 
            message: 'that email is not register' });
         }

 res.render('./dashboard/customer/customerpage.hbs', {message: {error: ['User not found']}});
    })
 res.render('./dashboard/customer/customerpage.hbs', { ...results, email })
 });


router.post('/dashboard/customerpage',  (req, res, next) => {
if (!req.isAuthenticated()){ 
    res.redirect(  '/user/login');
} 
const userprofiles = req.app.locals.userprofiles;
const { Imagprofile, name, phone, email, about, age, occupation, address, location, country, district, gender } = req.body;
const id = ObjectID(req.session.passport.userprofiles);

userprofiles.updateOne({ id }, { $set: {Imagprofile, name,  phone, email, about, age, occupation, address, location, country, district, gender }},
    (err) =>{ 
if (err){ 
    throw err;
}

res.render('./dashboard/customer/customerpage.hbs');

});
});


// let User  = require('../models/userprofile');
// var jsonParser = bodyParser.json()

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
// var app = express();
// app.use(jsonParser);
// app.use(urlencodedParser);
// app.use(router);

// router.get('/customerpage', (req, res) => res.send('./dashboard/customer/customerpage.hbs'));


// router.post('/dashboard/customerpage', (req, res)  =>{
//     console.log('tittle');
//     const{name, about, email, gender, address, country, location, occupation, Imagprofile, phone, district, age } = req.body;
//  res.render('./dashboard/customer/customerpage.hbs');

// });



module.exports = router;