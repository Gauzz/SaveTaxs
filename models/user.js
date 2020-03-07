var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
   
    firstname: {
        type: String,
        required: true,

    },
    secondname: {
        type: String,
        required: true,

    },
   
    email: {
        type: String,
        unique: true,
        required: true,
    
    },
   
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    }


});


var User = mongoose.model('User', UserSchema);
module.exports = User;