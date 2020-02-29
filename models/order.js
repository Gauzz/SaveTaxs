var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
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
        type:Date
    },
    time:{
        type: Date
    }
});
module.exports = mongoose.model('order', orderSchema);
