var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: {
        type: Number
    },
    OrderId: {
       type: Number 
    }, 
    Quantity:{
        type: Number
    },
    Date:{
        type: Date
    },
    Time:{
        type: Time
    }
});
module.exports = mongoose.model('order', orderSchema);
