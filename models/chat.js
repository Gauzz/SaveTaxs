var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    id: {
        type: Number
    },
    message: {
       type: String 
    }, 
    reciever:{
        type: String
    },
    reciever_id:{
        type: Number
    },
    sender:{
        type: String
    },
    sender_id:{
        type:Number
    },
    timestamp:{
        type:Datetime
    }

});
module.exports = mongoose.model('chat', chatSchema);
