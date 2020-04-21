const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema =  new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique:false
    },
    secondname: {
        type: String,
        required: true,
        unique:false
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

 



