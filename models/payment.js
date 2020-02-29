var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    id: {
        type: Number
    },
    order_Id: {
       type: Number 
    }, 
    quantity:{
        type: Number
    },
    date:{
        type: Date
    },
    time:{
        type: Time
    }
});
module.exports = mongoose.model('payment', paymentSchema);
