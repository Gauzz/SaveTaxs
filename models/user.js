const Joi = require('@hapi/joi');

const mongoose = require('mongoose');
 
const UserSchema =  new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    secondname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    password2: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});
 
function validateUser(user) {
    const schema = {
        firstname: Joi.string().min(5).max(50).required(),
        secondname: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        password2: Joi.string().min(5).max(255).required()

    };
    return Joi.validate(user, schema);
}
 

module.exports = mongoose.model('User', UserSchema);
 exports.validate = validateUser;



