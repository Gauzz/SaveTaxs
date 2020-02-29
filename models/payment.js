var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    id: {
        type: Number
    },
    transcation_Id: {
       type: Number 
    }, 
    
    price:{
        type: Number
    },
    total_price:{
        type: Number
    }
});
module.exports = mongoose.model('payment', paymentSchema);
