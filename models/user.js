var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
   
    firstname: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    secondname: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
   
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
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