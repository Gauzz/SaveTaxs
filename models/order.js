var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: {
        type: Number
    },
    order_id: {
       type: Number 
    }, 
    order_name:{
        type: String
    },
    order_status:{
        type: String
    },
    user_id:{
        type: Number
    },
    package_amount:{
        type: Number
    },
    date:{
        type:Date
    },
    documents:{
        type: String
    },
    partner_name:{
        type: String
    },
    varification_status:{
        type: String
    },
    document_id:{
        type: Number
    },
    payment_status:{
        type: String
    },
    time:{
        type: Date
    }
});
module.exports = mongoose.model('order', orderSchema);
