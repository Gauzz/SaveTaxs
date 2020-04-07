var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var digisignatureSchema = new Schema({
    id:{
        type:Number
    },
    database_name :{
        type: String
    },
    
    document_type:{
        type: String,
        required: true
    },
    document_URL:{
        type:String,
        required:true
    },
    
    date_upload:{
        type: Date
    } ,
    date_update: {
       type: Date 
    } ,
    service_id :{
        type : Number
    },
    chat_id :{
        type:Number
    }
    
});
module.exports = mongoose.model('digisignature', digisignatureSchema);
