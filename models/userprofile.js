var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userprofileSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String 
     }, 
    
    age:{
        type: Number
    },
    phone: {
        type: Number 
     }, 
    email: {
        type: String 
     }, 
     address: {
        type: String 
     }, 
     country: {
        type: String 
     },  
     about: {
        type: String 
     }, 
     occupation: {
      type: String
   }, 
   district: {
      type: String
   }, 
    
   imagprofile: {
      type: String
   }, 
   
   location: {
      type: String
   }, 
     gender: {
        type: String
     }
});
module.exports = mongoose.model('userprofile', userprofileSchema);