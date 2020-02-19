var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    id: {
        type: Number
    },
    name: {
       type: String 
    }, 
    parent_id:{
        type: Number
    } 
});
module.exports = mongoose.model('categories', categorySchema);
