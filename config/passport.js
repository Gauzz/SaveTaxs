const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('../config/database'); 
const bcrypt = require('bcryptjs'); 
const flash = require('connect-flash');


module.exports = function(passport){
    //local stratgy
passport.use(
  new LocalStrategy({usernameField: 'email'}, (email, password, done)=> {
//match user
User.findOne({email: email})
.then(user => {
  if(!user) {
    return done(null, false, {
      message: 'that email is not register' });
    }
// match password

bcrypt.compare(password, user.password, (err, isMatch) =>{
  if(err) throw err;
  if(isMatch){
    return done(null, user);
  }else{
    return done(null, false, { message:'password incorrect'});
  }
});
})
.catch(err => Console.log(err));
  })
  );


  passport.serializeUser((user, done) =>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
      done(err, user);
    } );
  });
}


