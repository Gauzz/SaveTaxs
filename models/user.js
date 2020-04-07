const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema =  new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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


module.exports = mongoose.model('User', UserSchema);

 



