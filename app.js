var http = require('http');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const flash = require('connect-flash');
// const session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fs = require('fs')

var app = express();

var categories = require('./models/category.js');

// connect mongoose
var db = "mongodb://localhost:27017/savetax";

// mongoose.connect(db, {useNewUrlParser: true} , function(err){
//     if (err) throw err;
//     else console.log('mongodb connected');
// });

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

categories.createCollection();

// app.get('/views' , function(req,res){
//   categories.find({} , function(err , docs){
//     if(err) res.json(err);
//     else res.render('category.html',{categories:docs})

//   });
// });


// login and registration
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

// admin dashboard // routes

app.use(express.static(path.join(__dirname, 'views/dashboard/admin')));
app.set('views', path.join(__dirname, 'views/dashboard/admin'));

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/dashboard', function(req, res) {
    res.render('index2.html'); // or res.render('index.ejs');
});
app.get('/login', function(req, res) {
    res.render('login.html'); // or res.render('index.ejs');
});

// app.get('/dashboard', function (req, res) {
//   res.render('index2'); // or res.render('index.ejs');
// });

//fetch data from db into category.ejs

app.get('/dashboard/category', function(req, res) {
    categories.find({}, function(err, docs) {
        if (err) res.json(err);
        else res.render('category', { categories: docs })
    });
});


app.get('/blog', function(req, res) {
    res.render('editblog.html'); // or res.render('index.ejs');
});


var port = 9000;
app.listen(port, function() {
    console.log('start at port ' + port);
});