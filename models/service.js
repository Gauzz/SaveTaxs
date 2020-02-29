var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    service_id: {
        type: Number
    },
    service_name: {
       type: String 
    }, 
    service_type:{
        type: String
    }
});
module.exports = mongoose.model('service', serviceSchema);
