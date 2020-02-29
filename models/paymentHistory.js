var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentHistorySchema = new Schema({
    id: {
        type: Number
    },
    
    Date:{
        type: Number
    },
    Time:{
        type: Number
    },
    Month: {
        type: Number 
     }, 
     Year:{
         type: Number
     }
});
module.exports = mongoose.model('paymentHistory', paymentHistorySchema);
