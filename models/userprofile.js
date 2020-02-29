var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userprofileSchema = new Schema({
    id: {
        type: Number
    },
    Type: {
       type: String 
    }, 
    FirstName: {
        type: String 
     }, 
    LastName: {
        type: String 
     }, 
    Gender: {
        type: String 
     }, 
    Age:{
        type: Number
    },
    Phone: {
        type: Number 
     }, 
    Email: {
        type: String 
     }, 
    Facebook: {
        type: String 
     }, 
     skype: {
        type: String 
     }, 
     Instagram: {
        type: String 
     }, 
     DOB: {
        type: Date
     },
     Address: {
        type: String 
     }, 
     City: {
        type: String 
     },  
     About: {
        type: String 
     }, 
     ProfileImage: {
        type: String
     }, 
     Rating: {
        type: String
     }
});
module.exports = mongoose.model('userprofile', userprofileSchema);