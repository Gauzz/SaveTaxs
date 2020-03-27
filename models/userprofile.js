var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userprofileSchema = new Schema({
    id: {
        type: Number
    },
    type: {
       type: String 
    }, 
    firstName: {
        type: String 
     }, 
    lastName: {
        type: String 
     }, 
    gender: {
        type: String 
     }, 
    age:{
        type: Number
    },
    contact: {
        type: Number 
     }, 
    email: {
        type: String 
     }, 
    facebook: {
        type: String 
     }, 
     skype: {
        type: String 
     }, 
     instagram: {
        type: String 
     }, 
     dob: {
        type: Date
     },
     address: {
        type: String 
     }, 
     city: {
        type: String 
     },  
     about: {
        type: String 
     }, 
     occupation: {
      type: String
   }, 
   document: {
      type: String
   }, 
   status: {
      type: String
   }, 
   orders: {
      type: String
   }, 
   varification: {
      type: String
   }, 
   remember_token: {
      type: String
   }, 
   authentication_token: {
      type: String
   }, 
   profile_image: {
      type: String
   }, 
     rating: {
        type: String
     }
});
module.exports = mongoose.model('userprofile', userprofileSchema);