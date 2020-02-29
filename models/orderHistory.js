var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderHistorySchema = new Schema({
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
    month:{
        type: String
    },
    year:{
        type: String
    }
});
module.exports = mongoose.model('orderHistory', orderHistorySchema);
