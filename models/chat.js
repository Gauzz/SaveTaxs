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
        type: String
    },
    sender:{
        type: String
    },
    sender_id:{
        type: String
    },
    timestamp:{
        type: String
    },

});
module.exports = mongoose.model('chat', chatSchema);
