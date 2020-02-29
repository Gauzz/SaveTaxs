var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentHistorySchema = new Schema({
    id: {
        type: Number
    },
    
    date:{
        type: Date
    },
    time:{
        type:Date
    },
    month: {
        type: String 
     }, 
     year:{
         type: String
     }
});
module.exports = mongoose.model('paymentHistory', paymentHistorySchema);
