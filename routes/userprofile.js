const express = require('express');
const router = express.Router();
const config = require('../config/passport')
const ObjectID = require('mongodb').ObjectID;




router.get('/', (req, res, next) => {
    if (!req.isAuthenticated()){
    res.render('user/login');
}
const users = req.app.locals.users;
const _id = ObjectID(req.session.passport.user);

users.findOne({ _id }, (err, results) => {
if (err) {

    throw err;
}
res.render('customerpage', { ...results});
});
});


router.get('/email', (req, res, next) =>{
const users = req.app.locals.users;
const email = req.params.email;

users.findOne({ email }, (err, results) =>{
if(err || !results){ 
res.render('publicprofile', {message: {error: ['User not found']}});
 }
 res.render('publicprofile', { ...results, email });
});
});

router.post('/',  (req, res, next) => {
if (!req.isAuthenticated()){ 
    res.redirect(  '/user/login');
} 

const users = req.app.locals.users;
const { imagprofile, name, phone, email, about, age, occupation, address, location, country, district, gender } = req.body;
const _id = ObjectID(req.session.passport.users);

users.updateOne({ _id }, { $set: {imagprofile, name,  phone, email, about, age, occupation, address, location, country, district, gender }},
    (err) =>{ 
if (err){ 
    throw err;
}
res.redirect('/usersprofile');

});
});



module.exports = router;