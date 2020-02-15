var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var categories = require('./model/category.js');

// connect mongoose
var db = "mongodb://localhost:27017/savetax";

mongoose.connect(db, {useNewUrlParser: true} , function(){
    console.log('mongodb connected');
});

categories.createCollection();


var port = 9000;
app.listen(port , function(){
    console.log('start at port '+port);
});