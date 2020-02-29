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
        type: Number
    },
    Time:{
        type: Number
    }
});
module.exports = mongoose.model('order', orderSchema);
