var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    id: {
        type: Number
    }, 
    reciever_id:{
        type: Number
    },
    sender_id:{
        type:Number
    },
    message: {
        type: String 
     },
     message_id: {
        type: Number
     },
    timestamp:{
        type:Date
    }

});
module.exports = mongoose.model('chat', chatSchema);
