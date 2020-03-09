const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database').default; 
const bcrypt = require('bcryptjs'); 
const flash = require('connect-flash');






module.exports = function(passport){
    //local stratgy
passport.use(new LocalStrategy
  (function(email, password, done){
// match user
let query = {email:email};
User.findOne(query, function(err, user){
if (err) throw err;
if(!user){
    return done(null, false, {message: 'Nouser found'});
}
//match password
bcrypt.compare(password, user.password, function(err, isMatch){
  if (err) throw err;
  if (isMatch) {
      return done(null, user);
  }else{
      return done(null, false, {message: 'wrong password'});

  }
});

});
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

