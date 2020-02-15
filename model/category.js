var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    id: Number,
    name: String, 
    parent_id: Number
});

module.exports = mongoose.model('categories', categorySchema);
