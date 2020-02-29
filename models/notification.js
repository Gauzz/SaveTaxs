var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    id: {
        type: Number
    },
    user_id: {
       type: Number
    }, 
    message:{
        type: String
    },
    timestamp:{
        type: Datetime
    },

});
module.exports = mongoose.model('Notification', notificationSchema);
